# DriftLoom — QA / TestFlight harness

Adopted from [`ocoee-studios/rn-qa-template`](https://github.com/ocoee-studios/rn-qa-template). Drives the
`openclaw-qa-1` iOS QA worker (clone → deps → test → build → e2e).

| Layer | Command | What it does |
|---|---|---|
| Logic gate | `npm test` | vitest over pure helpers (`lib/*.test.js`) |
| Local build | `npm run build:ios:local` | `eas build --platform ios --local --profile preview` (Simulator `.app`) |
| Smoke e2e | `npm run e2e:smoke` | Maestro `.maestro/smoke.yaml` on a booted Simulator |
| Run locally | `npm run ios` | `expo run:ios` (build + launch on the Simulator, no EAS project needed) |
| TestFlight | `npm run submit:ios` | `eas submit` (needs the ASC API key + `eas.json` `ascAppId`/`appleTeamId`) |

## Smoke flow
`.maestro/smoke.yaml`: launch (clearState) → assert `driftloom-root` (app mounted) → assert `home-hero`
(landed on Home). Selectors are by **testID** (→ iOS `accessibilityIdentifier`), never visible text.

## Remaining owner steps (before the worker can build/e2e)
- **Link the EAS project:** `app.json` has no `extra.eas.projectId`. Run `eas init` (under the Expo account
  that should own DriftLoom's EAS project) so `build:ios:local` resolves the project non-interactively.
- **TestFlight:** fill `eas.json` `submit.production.ios.ascAppId` + `appleTeamId` and stage the ASC API key.
