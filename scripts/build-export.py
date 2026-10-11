"""Rebuild the native export and approved images without changing original MP4s."""
from __future__ import annotations

import argparse
import base64
import binascii
import hashlib
import re
import sys
from pathlib import Path

IMAGE_ASSETS = {
    "594fdd13d4231387a79314a8dd113ccde1cd0cd902443a6f1adfe91a81332dfa": "cendovari-logo.svg",
    "85af13d302b6999858a8240d174f0633e74868796c16eb3db0fe885af649e0de": "plattsattning-poster.jpg",
    "ab44a5b08aaf9fb8131e6c5c714f2ae4f6fc141f30192492a4da2977a983498b": "bilverkstad-poster.jpg",
    "5d25abac0858c40197e8363ce569e9b7fdfe9316ed948eb9381b91617a3fb81f": "gppe-startsida.webp",
    "f341e13a210aa1c5cbe8a18902a4372daa04eb00095dfae8140f4710fc7c5fa6": "gppe-logo.webp",
    "4d323bfe9a22aa951c745dcca7a248929a12ab34bc66aa18c23725909b9441b5": "cendovari-showreel-poster.jpg",
}
PREVIEW_VIDEOS = {
    "199901b271fcc2abc3d9092f4344c6bc95d775bdfdd90a7fed48639220a29a74": "plattsattning-10s.mp4",
    "cc4304a9d9a334cb970905d07650cf3e23bd96d94c6931a38e3d66a29bf4b3e2": "bilverkstad-10s.mp4",
    "bb6669391d164cb8856ad26815b9a09a564cc222a422f5dbfaa7d9b24da49c8c": "cendovari-showreel-10s.mp4",
}
ORIGINAL_VIDEOS = {
    "plattsattning-10s.mp4": "9c17dd8f2752a753afbe73febfd3a41dfb5b672326bc45d4aeae9f7df685ff14",
    "bilverkstad-10s.mp4": "bd9c5edcac28bfa2f17e6b72473700e7d4659f3f17d0facdcbf909519a09623e",
    "cendovari-showreel-10s.mp4": "d922ae051f24d92e0fbc2916eb2149942ee88dc3e6e68d6cbb8408ac5392cd83",
}
_IMAGE_URI = re.compile(r"data:image/[^;\s]+;base64,[A-Za-z0-9+/=]+")
_VIDEO_URI = re.compile(r"data:video/mp4;base64,[A-Za-z0-9+/=]+")


def _sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _decode(uri: str) -> bytes:
    try:
        return base64.b64decode(uri.split(",", 1)[1], validate=True)
    except (binascii.Error, IndexError) as exc:
        raise ValueError("invalid embedded asset encoding") from exc


def externalize_resources(fragment: str, asset_root: Path) -> tuple[str, dict[str, bytes]]:
    """Return transformed markup and images; never write or transcode videos."""
    images: dict[str, bytes] = {}
    for uri in dict.fromkeys(_IMAGE_URI.findall(fragment)):
        data = _decode(uri)
        name = IMAGE_ASSETS.get(_sha(data))
        if name is None:
            raise ValueError("unrecognized embedded image; update the approved allowlist first")
        relative = "assets/images/" + name
        images[relative] = data
        fragment = fragment.replace(uri, relative)
    if re.search(r"data:image/", fragment, re.I):
        raise ValueError("the standalone fragment cannot retain embedded image data")
    clips = list(dict.fromkeys(_VIDEO_URI.findall(fragment)))
    if len(clips) > 3:
        raise ValueError("at most three approved compact preview videos are allowed")
    for uri in clips:
        name = PREVIEW_VIDEOS.get(_sha(_decode(uri)))
        if name is None:
            raise ValueError("unrecognized preview video; use an approved original video path")
        fragment = fragment.replace(uri, "assets/video/" + name)
    if re.search(r"data:video/", fragment, re.I):
        raise ValueError("the standalone document cannot retain embedded video data")
    for relative in set(re.findall(r"assets/video/[A-Za-z0-9_.-]+", fragment)):
        expected = ORIGINAL_VIDEOS.get(relative.removeprefix("assets/video/"))
        video = asset_root / relative
        if expected is None:
            raise ValueError(f"unapproved video path: {relative}")
        if video.is_symlink() or not video.is_file() or _sha(video.read_bytes()) != expected:
            raise ValueError(f"missing or modified full-length original video: {relative}")
    return fragment, images


def write_images(directory: Path, images: dict[str, bytes]) -> None:
    for relative, data in images.items():
        target = directory / relative
        if target.is_symlink() or any(parent.is_symlink() for parent in (target.parent, target.parent.parent)):
            raise ValueError("asset destination cannot be a symbolic link")
        target.parent.mkdir(parents=True, exist_ok=True)
        if not target.exists() or target.read_bytes() != data:
            target.write_bytes(data)


def main(argv: list[str] | None = None) -> int:
    # The renderer owns the document policy and both CLIs share its export path.
    # Prevent an extra __pycache__ directory in an otherwise reproducible build.
    sys.dont_write_bytecode = True
    from render import export_html

    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=root / "preview-source.html")
    parser.add_argument("--output", type=Path, default=root / "index.html")
    parser.add_argument("--title")
    args = parser.parse_args(argv)
    try:
        export_html(args.source, args.output, title=args.title, force=True)
    except (OSError, UnicodeError, ValueError) as exc:
        parser.error(str(exc))
    print(f"{args.output}: approved images externalized; full-length original videos retained")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
