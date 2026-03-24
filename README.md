# TayLabs Mail

A lightweight, self-hosted transactional email service for the TayLabs platform. It exposes a single authenticated HTTP endpoint that accepts a message payload and delivers it via [Mailtrap](https://mailtrap.io/), making it easy to swap the delivery provider without touching upstream services.

## Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Quick Start with Docker](#quick-start-with-docker)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Development Setup](#development-setup)

---

## Features

- **Single-endpoint mail delivery** — one `POST /api/v1/send` route handles all outbound email
- **API key authentication** — requests are authenticated via [TayLabs/Keys](https://github.com/TayLabs/Keys), so only authorised services can send mail
- **Mailtrap integration** — delivers email through the Mailtrap API; supports both sandbox (testing) and live sending modes
- **HTML and plain-text support** — accepts both `html` and `text` fields for rich and fallback email bodies
- **Docker-first deployment** — single `Dockerfile` for production; designed to run alongside the rest of the TayLabs stack

---

## Architecture Overview

TayLabs Mail is a thin Node.js/Express wrapper around the Mailtrap sending API. It sits between upstream services (such as TayLabs Auth) and the email provider, so the rest of the platform never needs a direct Mailtrap dependency.

```
TayLabs Auth  ──POST /api/v1/send──▶  TayLabs Mail  ──▶  Mailtrap API  ──▶  Inbox
```

Incoming requests are authenticated by validating the `x-api-key` header against the [TayLabs/Keys](https://github.com/TayLabs/Keys) service. The key must have the `mail.send` permission scope.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) (v2+)
- A running instance of [TayLabs/Keys](https://github.com/TayLabs/Keys) — the Mail service delegates API key validation to it
- A [Mailtrap](https://mailtrap.io/) account and API key

---

## Quick Start with Docker

### Build the image

```bash
# Clone the repository
git clone https://github.com/TayLabs/Mail.git
cd Mail

# Build the Docker image
pnpm docker:build
# or: docker build -t taylabs-mail .
```

### Run standalone

```bash
docker run -d \
  --name taylabs-mail \
  -p 4313:7414 \
  -e KEY_SERVICE_BASE_URL=http://your-keys-service:7212 \
  -e MAILTRAP_API_KEY=your_mailtrap_api_key \
  taylabs-mail
```

### Run as part of the TayLabs stack

The Mail service is included in the TayLabs Auth `docker-compose.yml`. From the Auth repo:

```bash
# Ensure the taylabs-mail image is built first (see above), then:
docker compose --profile production up -d
```

The Mail service will be available inside the Docker network at `taylabs-auth-mail:7414` and exposed on the host at port `4313`.

---

## Configuration

| Variable | Required | Description |
|---|---|---|
| `KEY_SERVICE_BASE_URL` | ✅ | Base URL of the TayLabs/Keys service used to validate API keys, e.g. `http://localhost:7212` |
| `MAILTRAP_API_KEY` | ✅ | Your Mailtrap API key for sending emails |
| `PORT` | | Port the server listens on (default: `7414`) |
| `NODE_ENV` | | `development` or `production` (default: `production`) |
| `SERVICE_NAME` | | Service name used when checking key permissions (default: `mail`) |

---

## API Reference

All endpoints are prefixed with `/api/v1`.

Authentication is required on all routes. Include your API key in the request header:

```
x-api-key: your_api_key
```

The key must have the `mail.send` permission scope, registered via [TayLabs/Keys](https://github.com/TayLabs/Keys).

---

### Send Email

**`POST /api/v1/send`**

Delivers a transactional email to a single recipient.

**Request body**

```json
{
  "to": {
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "subject": "Welcome to TayLabs",
  "text": "Plain-text fallback content",
  "html": "<h1>Welcome!</h1><p>Thanks for signing up.</p>"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `to.email` | string | ✅ | Recipient email address |
| `to.name` | string | | Recipient display name |
| `subject` | string | ✅ | Email subject line |
| `text` | string | ✅ | Plain-text fallback body |
| `html` | string | ✅ | HTML body |

**Response `200 OK`**

```json
{
  "success": true,
  "data": {
    "message": "Email sent",
    "mailId": ["abc123"]
  }
}
```

---

## Development Setup

### Requirements

- Node.js
- A running [TayLabs/Keys](https://github.com/TayLabs/Keys) instance (or the full TayLabs dev stack via Auth's `docker compose --profile development up -d`)

### Steps

```bash
# 1. Install dependencies
pnpm install

# 2. Set environment variables (no .env template — set them directly or create a .env file)
export KEY_SERVICE_BASE_URL=http://localhost:7212
export MAILTRAP_API_KEY=your_mailtrap_api_key

# 3. Start the dev server
pnpm dev

# 4. Or with file-watching
pnpm watch
```

The service will be available at `http://localhost:7414`.

### Available scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the server once in development mode |
| `pnpm watch` | Start with file-watching and auto-restart |
| `pnpm build` | Compile TypeScript to `dist/` |
| `pnpm start` | Run the compiled build |
| `pnpm docker:build` | Build the `taylabs-mail` Docker image |

---

## License

This project is licensed under the **GNU Affero General Public License v3.0**. See [LICENSE](./LICENSE) for details.

In short: if you run a modified version of this software on a network server, you must make the source code of your modifications available to users of that service.
