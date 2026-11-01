---
title: ReSkate Trainer Updater
tagline: One-click installs and updates for a game mod, with nothing left half-finished.
description: A Windows desktop app in C# and .NET that installs and updates a game mod in one click, with signed manifests, SHA-256 checks and automatic rollback.
order: 2
featured: true
year: 2026
platform: Windows desktop app
stack: ["C#", .NET, GitHub Actions]
repo: reskatetrainerupdater
points:
  - Every download is checked against a signed manifest and its SHA-256 hash before anything is installed.
  - Automatic backups and rollback, so a failed update puts the original files back.
  - Ships through a GitHub Actions pipeline as an installer, a portable build and a Scoop package.
images:
  - src: ../../assets/projects/reskate-update-available.jpg
    alt: The updater showing that a newer Trainer version is available, with an update button and a large Play tile.
  - src: ../../assets/projects/reskate-ready-to-play.jpg
    alt: The updater after an update, showing All set, a large Play tile, and buttons to open the backup or restore the old version.
---

Installing a game mod by hand means finding the right folder, unpacking the right zip and hoping nothing was left open. This app reduces that to one tile: it finds your ReSkate folder, shows what is new, installs the update and starts the game.

## Trust, for an unsigned app

The app has no code-signing certificate, so it earns trust in other ways. The update list is digitally signed, and the app ignores any copy that was not signed with the key built into it. The size and SHA-256 of every download must match that list exactly, or the file is deleted. It then reads the version out of the DLL itself and compares it with what was published.

## Failing safely

Before changing anything it checks that no file is in use, so an open game leaves your files untouched. Every replaced file is copied to a dated backup, and the newest three are kept. If something fails part-way the originals go back, so you never end up half-updated. It only closes the game if you press the button and say yes.
