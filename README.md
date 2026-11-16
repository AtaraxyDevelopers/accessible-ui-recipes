<p><a href="https://ataraxydevelopers.com"><img src="public/ataraxy-developers-logo.png" alt="Ataraxy Developers — Turning Digital Visions Into Reality" width="520"></a></p>

# Accessible UI Recipes

[![CI](https://github.com/AtaraxyDevelopers/accessible-ui-recipes/actions/workflows/ci.yml/badge.svg)](https://github.com/AtaraxyDevelopers/accessible-ui-recipes/actions/workflows/ci.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Five framework-free UI patterns with keyboard and automated accessibility tests.

An open-source project from [Ataraxy Developers](https://github.com/AtaraxyDevelopers).

![Local demo](docs/preview.png)

## Quick start

Install [Node.js](https://nodejs.org/en/download) 22 or 24 (npm is included). Check
`node --version` and `npm --version` in your terminal. The commands below run from
this repository's root folder, the one containing `package.json`.

**With Git:**

```sh
git clone https://github.com/AtaraxyDevelopers/accessible-ui-recipes.git
cd accessible-ui-recipes
npm ci
npm test
```

**Without Git:** choose **Code → Download ZIP** on GitHub, extract the archive,
and open a terminal in the extracted `accessible-ui-recipes-main` folder (release archives may
include the version in the folder name). Run `npm ci` and `npm test` there.
Use the **source-code ZIP**, not an npm `.tgz` package, to follow this developer walkthrough.
The install step may need internet access; the examples run locally afterward.

On Windows PowerShell, if `npm.ps1` is blocked by execution policy, use `npm.cmd`
in place of `npm` in these commands. No execution-policy change is required.

```sh
npm start
```

Open **http://127.0.0.1:4330**. Leave that terminal open; press **Ctrl+C** to stop it. The examples use plain HTML, CSS, and JavaScript,
with no runtime dependencies. Copy the markup and the relevant initialization block
from `public/app.js` into your application, retaining labels and unique IDs.

## Patterns

| Pattern      | Keyboard and semantics                                             |
| ------------ | ------------------------------------------------------------------ |
| Form         | Persistent labels, linked errors, first-error focus, polite result |
| Dialog       | Native modal dialog, Escape to close, focus returned to opener     |
| Action menu  | Arrow keys, Home/End, Enter, Escape, and Tab dismissal             |
| Tabs         | Automatic activation, Left/Right, Home/End, roving tabindex        |
| Notification | Persistent polite live region, explicit dismissal, no timeout      |

## Browser verification

```sh
npm run browser:install
npm run test:browser
```

The browser suite starts and stops its own server on **port 4331**, so the demo
on port 4330 can stay open. The browser-install step downloads Chromium and needs
internet access. On Linux systems missing browser libraries, use
`npx playwright install --with-deps chromium` (system-package installation may need
your operating system's administrator privileges).

The browser suite uses Chromium, Playwright, and axe-core. CI runs it on Linux and
also runs the HTTP server test on Windows, macOS, and Linux with Node 22 and 24.
Automated tests cover keyboard actions, focus restoration, visible panels, form
errors, notifications, and a 390-pixel mobile viewport.

## Manual review checklist

- Traverse all controls with Tab and Shift+Tab; focus must stay visible.
- Open the dialog and verify background controls cannot receive focus.
- With a screen reader, confirm labels, errors, tab selection, and status updates.
- Zoom to 200% and 400%; check that content remains readable and controls reachable.
- Repeat with your target browsers, assistive technologies, and real content.

## Scope and limitations

Passing axe checks is not accessibility certification. These examples have automated
Chromium coverage; screen-reader usability and other browsers require manual review.
The email check is a demonstration, not authoritative address validation. Menu actions
only demonstrate selection. The form and notification send and store no information.
The server binds to local IPv4 only.

References: [WAI-ARIA tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/),
[menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/),
and [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing).

## Expected first run

`npm start` prints the local URL and keeps running. The page shows five interactive patterns. `npm test` checks the server; the separate browser command checks keyboard behavior and accessibility.

## Contributing and support

See [CONTRIBUTING.md](CONTRIBUTING.md), [community expectations](CODE_OF_CONDUCT.md),
and [SECURITY.md](SECURITY.md). Open an issue with a minimal synthetic reproduction.
This project is maintained on a best-effort basis. No paid service or account is
required to run the local examples.

## License

[MIT](LICENSE). You may use, adapt, and redistribute this project under its license.
