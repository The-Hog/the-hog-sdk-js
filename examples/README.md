# @the-hog/sdk Examples

This directory contains example scripts demonstrating how to use The Hog's
TypeScript SDK.

## Prerequisites

- Node.js 18 or newer
- npm
- The Hog API credentials

## Setup

1. Copy `.env.template` to `.env`:
   ```bash
   cp .env.template .env
   ```

2. Edit `.env` and add both required credentials:
   ```bash
   THE_HOG_ACCESS_KEY=<access-key>
   THE_HOG_SECRET_KEY=<secret-key>
   ```

## Running the Examples

Install and build from the repository root, then run an example from this
directory:

```bash
npm run build
cd examples
npm install
npx tsx companiesSearch.example.ts
```

## Creating new examples

Duplicate an existing example file, they won't be overwritten by the generation process.

