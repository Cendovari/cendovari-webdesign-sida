from __future__ import annotations

import argparse
import importlib.util
import re
import sys
from html import escape
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

sys.dont_write_bytecode = True

_MAX_FRAGMENT_BYTES = 2_000_000
_DOCUMENT_MARKUP = re.compile(r"<!doctype\s|<\s*(?:html|head|body)(?:\s|>)", re.I)
_HOST_API_REFERENCE = re.compile(r"\b(?:window|globalThis)\.openai\b")
_resource_spec = importlib.util.spec_from_file_location("cendovari_export_resources", Path(__file__).with_name("build-export.py"))
if _resource_spec is None or _resource_spec.loader is None:
    raise RuntimeError("cannot load the approved export resource helper")
_resources = importlib.util.module_from_spec(_resource_spec)
_resource_spec.loader.exec_module(_resources)
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


def _read_fragment(source: Path) -> str:
    if source.is_symlink() or not source.is_file():
        raise ValueError(f"source must be a regular file: {source}")
    if source.stat().st_size > _MAX_FRAGMENT_BYTES:
        raise ValueError("source fragment exceeds the 2 MB size limit")
    fragment = source.read_text(encoding="utf-8")
    if _DOCUMENT_MARKUP.search(fragment):
        raise ValueError("source must be an HTML fragment, not a complete document")
    if _HOST_API_REFERENCE.search(fragment):
        raise ValueError("the published document must not depend on a preview host API")
    if re.search(r"<iframe\b", fragment, re.I):
        raise ValueError("use native document content without an iframe")
    return fragment


def _default_title(source: Path) -> str:
    return "Cendovari Webdesign Sida — Förhandsvisning"


def _render_document(fragment: str, title: str) -> str:
    # The approved fragment owns the layout and controllers. The wrapper only
    # supplies document defaults, resource policy and the existing icon library.
    shell = Path(__file__).with_name("export-shell.html").read_text(encoding="utf-8")
    values = {
        "<!--EXPORT_CSP-->": escape(_CSP, quote=True),
        "<!--EXPORT_TITLE-->": escape(title),
        "<!--APPROVED_FRAGMENT-->": fragment,
    }
    for marker in values:
        if shell.count(marker) != 1:
            raise ValueError(f"export shell must contain exactly one {marker}")
    for marker, value in values.items():
        shell = shell.replace(marker, value)
    return shell


def prepare_export(source: Path, title: str | None = None) -> tuple[str, dict[str, bytes]]:
    fragment, images = _resources.externalize_resources(_read_fragment(source), source.resolve().parent)
    return _render_document(fragment, title or _default_title(source)), images


def render(fragment_path: Path, title: str | None = None) -> str:
    return prepare_export(fragment_path, title)[0]


def export_html(source: Path, destination: Path, *, title: str | None = None, force: bool = False) -> None:
    if destination.is_symlink():
        raise ValueError("destination cannot be a symbolic link")
    if source.resolve() == destination.resolve() or (destination.exists() and source.samefile(destination)):
        raise ValueError("source and destination must be different files")
    if destination.exists() and not force:
        raise FileExistsError("destination already exists; pass --force to replace it")
    document, images = prepare_export(source, title)
    destination.parent.mkdir(parents=True, exist_ok=True)
    _resources.write_images(destination.parent, images)
    with destination.open("w" if force else "x", encoding="utf-8", newline="\n") as output:
        output.write(document)


def serve(document: str, port: int, directory: Path, images: dict[str, bytes] | None = None) -> None:
    encoded = document.encode("utf-8")
    image_data = images or {}

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
            elif path.lstrip("/") in image_data:
                data = image_data[path.lstrip("/")]
                self.send_response(200)
                self.send_header("Content-Type", self.guess_type(path))
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)
            elif path.startswith(("/assets/video/", "/assets/images/")) and ".." not in path.split("/"):
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
            document, images = prepare_export(args.fragment, args.title)
            serve(document, args.port, args.fragment.resolve().parent, images)
        else:
            sys.stdout.write(render(args.fragment, args.title))
    except (OSError, UnicodeError, ValueError) as exc:
        parser.error(str(exc))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
