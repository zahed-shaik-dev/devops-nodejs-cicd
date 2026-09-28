# Node.js CI/CD with GitHub Actions, Docker & AWS EC2

A portfolio-grade DevOps project demonstrating automated CI/CD for a Node.js/Express API.

## Architecture

GitHub → GitHub Actions → Lint/Security/Tests → Docker Build → Docker Hub → SSH → AWS EC2 → Docker Container → `/health`

## Pipeline behavior

- Pull request to `main`: lint, dependency vulnerability scan and unit tests.
- Push to `main`: runs all validation, builds a production Docker image, publishes a SHA-tagged image and `latest`, then deploys to EC2.
- Deployment verifies `/health` before completing and prunes unused Docker resources older than 7 days.

## Image tagging

Each production build receives `sha-<12-character-commit-sha>` plus `latest`.

## Required GitHub Secrets

| Secret | Purpose |
|---|---|
| `DOCKERHUB_USERNAME` | Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token |
| `EC2_HOST` | EC2 public DNS or IP |
| `EC2_USERNAME` | SSH user, e.g. `ubuntu` |
| `EC2_SSH_PRIVATE_KEY` | Private SSH key for EC2 |
| `EC2_SSH_PORT` | SSH port, normally `22` |

Create a GitHub Environment named `production` and put deployment secrets there if you want deployment-specific protection/approval rules.

## Local commands

```bash
npm install
npm run lint
npm test
npm start
```

Open `http://localhost:3000/health`.
