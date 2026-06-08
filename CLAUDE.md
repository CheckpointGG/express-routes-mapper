# CLAUDE.md

## Bumping Node

The Node runtime version lives in `.nvmrc` at the repo root. To bump:

1. Update `.nvmrc` to the new major.
2. Update `engines.node` in package.json to match (e.g. `^11.0.0`).
3. Update any `FROM node:<version>` lines in Dockerfile(s) / the serverless `runtime:` if you are also moving the deployed runtime. (This repo has neither.)
4. CI reads `.nvmrc` via `actions/setup-node`'s `node-version-file`, so no workflow edits are needed. (This repo currently has no GitHub Actions setup-node step; if you add one, point it at `node-version-file: '.nvmrc'`.)
5. Reinstall locally on the new version to refresh the lockfile if needed.
