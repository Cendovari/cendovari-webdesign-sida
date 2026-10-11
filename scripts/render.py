from __future__ import annotations

import argparse
import re
import sys
from html import escape
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

_MAX_FRAGMENT_BYTES = 1_000_000
_DOCUMENT_MARKUP = re.compile(r"<!doctype\s|<\s*(?:html|head|body)(?:\s|>)", re.I)
_HOST_API_REFERENCE = re.compile(r"\b(?:window|globalThis)\.openai\b")
_CSP = "; ".join((
    "default-src 'none'",
    "script-src 'self' 'unsafe-inline' https://unpkg.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.bunny.net",
    "img-src 'self' data: blob:",
    "font-src https://fonts.gstatic.com https://fonts.bunny.net data:",
    "media-src 'self'",
    "connect-src 'none'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
))
_BASE_STYLE = ":root{--foreground:#1d212a;--muted-foreground:#4b5160;--border:#a2a7b54d}html,body{margin:0;padding:0;background:#e6e7ef;color-scheme:light}body{min-width:0}*,*::before,*::after{box-sizing:border-box}.cursor-interaction{cursor:pointer}button,input,select,textarea{font:inherit}[hidden]{display:none!important}"
_ICON_BOOT = """<script id="cendovari-lucide" async src="https://unpkg.com/lucide@1.17.0/dist/umd/lucide.js"></script>
<script>
(() => {
  const initialize = () => globalThis.lucide?.createIcons({attrs:{width:16,height:16}});
  if (globalThis.lucide) initialize();
  else document.getElementById('cendovari-lucide').addEventListener('load',initialize,{once:true});
})();
</script>"""


def _read_fragment(source: Path) -> str:
    if source.is_symlink() or not source.is_file():
        raise ValueError(f"source must be a regular file: {source}")
    if source.stat().st_size > _MAX_FRAGMENT_BYTES:
        raise ValueError("source fragment exceeds the 1 MB size limit")
    fragment = source.read_text(encoding="utf-8")
    if _DOCUMENT_MARKUP.search(fragment):
        raise ValueError("source must be an HTML fragment, not a complete document")
    if _HOST_API_REFERENCE.search(fragment):
        raise ValueError("the published document must not depend on a preview host API")
    if re.search(r"<iframe\b|data:video/", fragment, re.I):
        raise ValueError("use native document content and separate original video assets")
    return fragment


def _default_title(source: Path) -> str:
    return "Cendovari Webdesign Sida — Förhandsvisning"


def _render_document(fragment: str, title: str) -> str:
    # The approved fragment owns the layout and controllers. The wrapper only
    # supplies document defaults, resource policy and the existing icon library.
    logo = re.search(r'<img src="(data:image/svg\+xml;base64,[^"]+)"', fragment)
    favicon = f'<link rel="icon" type="image/svg+xml" href="{logo.group(1)}">' if logo else ''
    return f"""<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content">
<meta name="robots" content="noindex,nofollow">
<meta name="referrer" content="no-referrer">
{favicon}
<meta http-equiv="Content-Security-Policy" content="{escape(_CSP, quote=True)}">
<title>{escape(title)}</title>
<style>{_BASE_STYLE}</style>
</head>
<body>
{fragment}
{_ICON_BOOT}
<noscript><p style="padding:1rem;font:16px system-ui">Förhandsvisningen behöver JavaScript för navigation och filmkontroller.</p></noscript>
</body>
</html>
"""


def render(fragment_path: Path, title: str | None = None) -> str:
    return _render_document(_read_fragment(fragment_path), title or _default_title(fragment_path))


def export_html(source: Path, destination: Path, *, title: str | None = None, force: bool = False) -> None:
    if destination.is_symlink():
        raise ValueError("destination cannot be a symbolic link")
    if source.resolve() == destination.resolve() or (destination.exists() and source.samefile(destination)):
        raise ValueError("source and destination must be different files")
    document = render(source, title)
    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("w" if force else "x", encoding="utf-8", newline="\n") as output:
        output.write(document)


def serve(document: str, port: int, directory: Path) -> None:
    encoded = document.encode("utf-8")

    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(directory), **kwargs)

        def do_GET(self):
            path = unquote(urlsplit(self.path).path)
            if path in ("/", "/index.html"):
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(encoded)))
                self.end_headers()
                self.wfile.write(encoded)
            elif path.startswith("/assets/video/") and ".." not in path.split("/"):
                super().do_GET()
            else:
                self.send_error(404)

        def log_message(self, format, *args):
            pass

    server = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print(f"http://127.0.0.1:{server.server_port}/", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Export the Cendovari fragment as a native-scroll document.")
    parser.add_argument("fragment", type=Path)
    parser.add_argument("destination", type=Path, nargs="?")
    parser.add_argument("--title")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--serve", action="store_true")
    parser.add_argument("--port", type=int, default=0)
    args = parser.parse_args(argv)
    if args.serve and args.destination:
        parser.error("destination cannot be used with --serve")
    if args.destination and args.destination.exists() and not args.force:
        parser.error("destination already exists; pass --force to replace it")
    try:
        if args.destination:
            export_html(args.fragment, args.destination, title=args.title, force=args.force)
            print(args.destination)
        elif args.serve:
            serve(render(args.fragment, args.title), args.port, args.fragment.resolve().parent)
        else:
            sys.stdout.write(render(args.fragment, args.title))
    except (OSError, UnicodeError, ValueError) as exc:
        parser.error(str(exc))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
