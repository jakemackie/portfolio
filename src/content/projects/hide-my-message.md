---
title: Hide My Message
tagline: Encrypted messages that only the recipient can read.
description: An installable web app for sending encrypted messages. AES-GCM runs in the browser, and the key stays in the URL fragment, away from the server.
order: 4
featured: false
year: 2025
platform: Progressive web app
stack: [Vue, TypeScript, Vite, Tailwind CSS, Web Crypto API]
repo: hidemymessage
live: https://hidemymessage.com
points:
  - Messages are encrypted in the browser with AES-GCM through the Web Crypto API.
  - The key lives in the URL fragment, which browsers do not send to the server.
  - Installable as a PWA, with internationalisation built in.
images:
  - src: ../../assets/projects/hide-my-message-typed.jpg
    alt: Hide My Message with a message typed into the box and the Share Message button ready to use.
  - src: ../../assets/projects/hide-my-message-home.jpg
    alt: The Hide My Message home page, with an empty message box and a note that the key never leaves your device.
---

A small tool that does one thing: send a message that the server hosting it cannot read. Encryption happens on the client with a fresh 256-bit AES-GCM key, and the key travels in the fragment of the link you share.
