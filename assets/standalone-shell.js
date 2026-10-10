(() => {
  const frame = document.getElementById("codex-visualization");
  if (!(frame instanceof HTMLIFrameElement)) {
    return;
  }
  const viewport = globalThis.visualViewport;
  let viewportFrame = 0;
  let settleFrame = 0;
  let reportedHeight = null;
  let resizing = false;
  let measurePort = null;
  const mobileShell = matchMedia('(max-width:820px), (max-width:1024px) and (max-height:500px)');
  const visibleHeight = () => Math.floor(viewport?.height || globalThis.innerHeight);
  const availableHeight = () => {
    const bodyStyle = getComputedStyle(document.body);
    const padding = (Number.parseFloat(bodyStyle.paddingTop) || 0) +
      (Number.parseFloat(bodyStyle.paddingBottom) || 0);
    return Math.max(0, Math.floor(visibleHeight() - padding));
  };
  const fitFrame = (available) => {
    if (reportedHeight == null) {
      frame.style.removeProperty('height');
      return;
    }
    if (available == null) available = availableHeight();
    frame.style.height = Math.min(Math.ceil(reportedHeight), available) + 'px';
  };
  const updateVisibleHeight = () => {
    viewportFrame = 0;
    document.documentElement.style.setProperty('--cv-visible-height', visibleHeight() + 'px');
    fitFrame();
    if (resizing) {
      settleFrame = requestAnimationFrame(() => {
        settleFrame = 0;
        resizing = false;
        measurePort?.postMessage({ type: 'measure' });
      });
    }
  };
  const queueVisibleHeight = () => { if (!viewportFrame) viewportFrame = requestAnimationFrame(updateVisibleHeight); };
  const resetVisibleHeight = () => {
    if (settleFrame) cancelAnimationFrame(settleFrame);
    settleFrame = 0;
    resizing = true;
    reportedHeight = null;
    document.documentElement.style.setProperty('--cv-visible-height', visibleHeight() + 'px');
    frame.style.removeProperty('height');
    queueVisibleHeight();
  };
  updateVisibleHeight();
  viewport?.addEventListener('resize', resetVisibleHeight, {passive:true});
  globalThis.addEventListener('resize', resetVisibleHeight, {passive:true});
  globalThis.addEventListener('pagehide', () => {
    if (viewportFrame) cancelAnimationFrame(viewportFrame);
    if (settleFrame) cancelAnimationFrame(settleFrame);
    viewportFrame = 0;
    settleFrame = 0;
  });
  globalThis.addEventListener('pageshow', resetVisibleHeight);
  const storageKey = `codex:visualization-widget-state-v2:${JSON.stringify([
    globalThis.location.pathname,
    globalThis.location.search,
  ])}`;
  const parseState = (serializedState) => {
    if (
      typeof serializedState !== "string" ||
      new TextEncoder().encode(serializedState).length > 16 * 1024
    ) {
      throw new TypeError(
        "Widget state must be a JSON object of at most 16 KiB",
      );
    }
    /** @type {unknown} */
    const state = JSON.parse(serializedState);
    if (
      state == null ||
      typeof state !== "object" ||
      Array.isArray(state) ||
      ("imageIds" in state &&
        (!Array.isArray(state.imageIds) || state.imageIds.length > 0))
    ) {
      throw new TypeError("Widget state must be a JSON object");
    }
    const storedState = { modelContent: null, privateContent: null, ...state };
    const canonicalState = JSON.stringify(
      storedState,
      (_key, /** @type {unknown} */ value) => {
        if (typeof value === "number" && !Number.isFinite(value)) {
          throw new TypeError("Widget state must contain finite numbers");
        }
        return value;
      },
    );
    if (new TextEncoder().encode(canonicalState).length > 16 * 1024) {
      throw new TypeError(
        "Widget state must be a JSON object of at most 16 KiB",
      );
    }
    return storedState;
  };
  let storage = null;
  let state = null;
  try {
    const localStorage = globalThis.localStorage;
    const probeKey = `${storageKey}:probe`;
    localStorage.setItem(probeKey, "1");
    localStorage.removeItem(probeKey);
    storage = localStorage;
    const savedState = storage.getItem(storageKey);
    if (savedState != null) {
      try {
        state = parseState(savedState);
      } catch {
        // Invalid saved state does not disable future writes.
      }
    }
  } catch {
    storage = null;
  }
  const initialGlobals = {
    widgetState: state,
    statePersistence: storage == null ? "none" : "local",
  };

  const channel = new MessageChannel();
  measurePort = channel.port1;
  channel.port1.addEventListener("message", (event) => {
    const data = event.data;
    if (typeof data !== "object" || data == null) {
      return;
    }
    if (data.type === "widget-state-write") {
      if (!Number.isSafeInteger(data.id) || data.id <= 0) {
        return;
      }
      let ok = false;
      try {
        if (storage != null) {
          const state = parseState(data.state);
          storage.setItem(storageKey, JSON.stringify(state));
          ok = true;
        }
      } catch {
        // Storage denial, quota limits, and invalid state return a failed receipt.
      }
      channel.port1.postMessage({
        type: "widget-state-result",
        id: data.id,
        ok,
      });
      return;
    }
    if (data.type === "height") {
      const height = data.height;
      if (
        typeof height === "number" &&
        Number.isFinite(height) &&
        height >= 0 &&
        height <= 10_000
      ) {
        if (resizing) return;
        const available = availableHeight();
        // This demo's desktop content is a 700 px scroller plus its 56 px bar.
        // Reject a late height from the previous compact viewport after rotation.
        if (!mobileShell.matches && height < Math.min(756, available)) return;
        reportedHeight = height;
        fitFrame(available);
      }
      return;
    }
    if (data.type === "scroll-to") {
      const top = data.top;
      if (
        typeof top === "number" &&
        Number.isFinite(top) &&
        top >= 0 &&
        globalThis.navigator.userActivation?.isActive === true
      ) {
        globalThis.scrollTo({
          top: Math.ceil(
            globalThis.scrollY + frame.getBoundingClientRect().top + top,
          ),
        });
      }
      return;
    }
    if (data.type === "open-external") {
      const rawHref = data.href;
      if (typeof rawHref !== "string") {
        return;
      }
      let href;
      try {
        const url = new URL(rawHref, document.baseURI);
        if (url.protocol !== "https:") {
          return;
        }
        href = url.href;
      } catch {
        return;
      }
      if (globalThis.navigator.userActivation?.isActive === true) {
        const anchor = document.createElement("a");
        anchor.href = href;
        anchor.rel = "noopener noreferrer";
        anchor.target = "_blank";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      }
      return;
    }
    if (data.type === "follow-up") {
      const prompt = data.prompt;
      if (
        typeof prompt !== "string" ||
        globalThis.navigator.userActivation?.isActive !== true
      ) {
        return;
      }
      const title = data.title;
      globalThis.prompt(typeof title === "string" ? title : prompt, prompt);
    }
  });
  channel.port1.start();
  const srcdoc = frame.dataset.srcdoc;
  if (srcdoc == null) {
    return;
  }
  frame.addEventListener(
    "load",
    () => {
      frame.contentWindow?.postMessage(
        { type: "codex-visualization-initialize" },
        "*",
        [channel.port2],
      );
    },
    { once: true },
  );
  // Match the trusted bootstrap element, not the same text in an authored title.
  frame.srcdoc = srcdoc.replace(
    '<script type="application/json" id="codex-visualization-widget-state">__CODEX_VISUALIZATION_WIDGET_STATE__</script>',
    () =>
      '<script type="application/json" id="codex-visualization-widget-state">' +
      JSON.stringify(initialGlobals).replaceAll("<", "\\u003c") +
      "</script>",
  );
  delete frame.dataset.srcdoc;
})();

