---
title: Dispatch
tagline: Bug reports from Discord, straight to GitHub.
order: 1
featured: true
year: 2026
platform: Serverless Discord app
stack: [TypeScript, Hono, Cloudflare Workers, D1, R2, Astro, Vitest]
repo: dispatch
live: https://dispatch.jakemackie.workers.dev/
points:
  - Runs on Workers with no gateway connection and no always-on process, so it is usually free to host.
  - Admins link a repository by signing in with GitHub, and Dispatch checks they can push to it before accepting the link.
  - Versioned SQL migrations, Vitest tests, and separate beta and production environments.
images:
  - src: ../../assets/projects/dispatch-og.png
    alt: The Dispatch social card, showing the product name and its tagline.
---

Communities find bugs long before maintainers do, but most of those reports die in a Discord channel because nobody in the conversation wants to open a GitHub issue. Dispatch closes that gap. A member runs `/report`, fills in a short form, and a well-structured issue lands in the linked repository. They never have to touch GitHub.

## How it works

Slash commands, buttons and modals arrive at the Worker as signed HTTP requests. A GitHub App files the issue using a short-lived installation token scoped to the one linked repository. App webhooks then flow back the other way, keeping each report's status in sync, relaying maintainer comments and granting reward roles when an issue is closed as completed.

## The parts around the issue

Filing an issue is the easy bit. Most of the product is what keeps a community reporting:

- An optional **triage queue**, where each report gets a staff thread and approve, reject or request-info buttons.
- **Upvotes** on reports, so staff can see what is affecting the most people.
- **Reporter reputation**, which fast-tracks trusted reporters past triage and lets admins mute spammers.
- **Automatic fix notifications** by DM, and reward roles after a set number of fixed reports. Reopening an issue takes the credit back.

Uploads are copied to R2, so screenshots in issues keep working after Discord's CDN links expire.
