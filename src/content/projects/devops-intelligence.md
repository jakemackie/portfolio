---
title: DevOps Intelligence Layer
tagline: A reusable pull request pipeline for WordPress teams, with a dashboard on top.
order: 3
featured: false
year: 2026
platform: GitHub Action and web dashboard
stack: [GitHub Actions, JavaScript, TypeScript, Next.js, Chart.js, OpenAI API]
repo: devops-intelligence-action
extraRepos: [pr-dashboard]
live: https://pr-dashboard-red.vercel.app
points:
  - Event-driven, starting from a pull request event in the calling repository.
  - Runs WordPress Coding Standards linting, AI review and AI-generated PHPUnit tests on the changed code.
  - Writes run summaries that feed a Next.js dashboard for trends across pull requests.
---

A reusable GitHub Actions workflow that any repository can call. Each pull request event fetches the diff, lints changed PHP against WordPress Coding Standards, runs an AI review and generates PHPUnit tests.

The results go back to the people who need them: a report comment on the pull request, and tasks and subtasks in ClickUp that are updated in place when the same pull request runs again, rather than duplicated. Each run also leaves evidence artefacts behind, which a separate Next.js dashboard turns into charts.
