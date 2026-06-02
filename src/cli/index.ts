#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import process from "node:process";
import { TheHog } from "../sdk/sdk.js";

type FlagValue = boolean | string;

type ParsedArgs = {
  command: string[];
  flags: Map<string, FlagValue>;
};

class CliError extends Error {
  constructor(message: string, readonly exitCode = 1) {
    super(message);
    this.name = "CliError";
  }
}

const helpText = `the-hog

Usage:
  the-hog auth status
  the-hog companies search --query "AI companies"
  the-hog people search --query "VP Engineering" --include-contacts
  the-hog deep-research start --body '{"prompt":"...","schema":{"type":"object"}}'
  the-hog enrichments submit --body-file enrichment.json
  the-hog operations get <id>
  the-hog operations wait <id> --interval-ms 2000 --timeout-ms 120000

Auth:
  Set THE_HOG_ACCESS_KEY and THE_HOG_SECRET_KEY.
  Optionally set THE_HOG_SERVER_URL for local or staging API targets.

Common flags:
  --body <json>              JSON request body
  --body-file <path>         Read JSON request body from a file
  --idempotency-key <key>    Send an idempotency key for write operations
  --limit <number>           Search result limit
  --include-contacts         Include contact details for people search
  --include-signals          Include signal fields when supported
  --interval-ms <number>     operations wait poll interval
  --timeout-ms <number>      operations wait timeout
  --server-url <url>         Override THE_HOG_SERVER_URL
`;

async function main(args: string[]): Promise<void> {
  const parsed = parseArgs(args);

  if (parsed.command.length === 0 || hasFlag(parsed, "help") || hasFlag(parsed, "h")) {
    process.stdout.write(helpText);
    return;
  }

  const [resource, action] = parsed.command;

  if (resource === "auth" && action === "status") {
    writeJson({
      accessKey: Boolean(process.env["THE_HOG_ACCESS_KEY"]),
      secretKey: Boolean(process.env["THE_HOG_SECRET_KEY"]),
      serverURL: getStringFlag(parsed, "server-url") ?? process.env["THE_HOG_SERVER_URL"]
        ?? "https://developer.thehog.ai",
    });
    return;
  }

  const client = createClient(parsed);
  const idempotencyKey = getStringFlag(parsed, "idempotency-key");

  if (resource === "companies" && action === "search") {
    writeJson(await client.companies.search(await bodyOrSearchRequest(parsed), idempotencyKey));
    return;
  }

  if (resource === "people" && action === "search") {
    writeJson(await client.people.search(await bodyOrSearchRequest(parsed), idempotencyKey));
    return;
  }

  if (resource === "deep-research" && action === "start") {
    writeJson(await client.deepResearch.start(await requiredBody(parsed), idempotencyKey));
    return;
  }

  if (resource === "enrichments" && action === "submit") {
    writeJson(await client.enrichments.submit(await requiredBody(parsed), idempotencyKey));
    return;
  }

  if (resource === "operations" && action === "get") {
    writeJson(await client.operations.get(requiredId(parsed)));
    return;
  }

  if (resource === "operations" && action === "wait") {
    const waitOptions: { intervalMs?: number; timeoutMs?: number } = {};
    const intervalMs = getNumberFlag(parsed, "interval-ms");
    const timeoutMs = getNumberFlag(parsed, "timeout-ms");
    if (intervalMs != null) {
      waitOptions.intervalMs = intervalMs;
    }
    if (timeoutMs != null) {
      waitOptions.timeoutMs = timeoutMs;
    }
    writeJson(await client.operations.wait(requiredId(parsed), waitOptions));
    return;
  }

  throw new CliError(`Unknown command: ${parsed.command.join(" ")}\n\n${helpText}`);
}

function createClient(parsed: ParsedArgs): TheHog {
  const accessKey = getStringFlag(parsed, "access-key") ?? process.env["THE_HOG_ACCESS_KEY"];
  const secretKey = getStringFlag(parsed, "secret-key") ?? process.env["THE_HOG_SECRET_KEY"];
  const serverURL = getStringFlag(parsed, "server-url") ?? process.env["THE_HOG_SERVER_URL"];

  if (!accessKey || !secretKey) {
    throw new CliError("Missing auth. Set THE_HOG_ACCESS_KEY and THE_HOG_SECRET_KEY.", 2);
  }

  return new TheHog({ accessKey, secretKey, serverURL });
}

async function bodyOrSearchRequest(parsed: ParsedArgs): Promise<any> {
  const body = await optionalBody(parsed);
  if (body != null) {
    return body;
  }

  const query = getStringFlag(parsed, "query");
  if (!query) {
    throw new CliError("Missing --query or --body for search command.", 2);
  }

  const request: Record<string, unknown> = { query };
  const limit = getNumberFlag(parsed, "limit");
  if (limit != null) {
    request["limit"] = limit;
  }
  if (hasFlag(parsed, "include-contacts")) {
    request["includeContacts"] = true;
  }
  if (hasFlag(parsed, "include-signals")) {
    request["includeSignals"] = true;
  }

  return request;
}

async function requiredBody(parsed: ParsedArgs): Promise<any> {
  const body = await optionalBody(parsed);
  if (body == null) {
    throw new CliError("Missing --body or --body-file.", 2);
  }
  return body;
}

async function optionalBody(parsed: ParsedArgs): Promise<any | undefined> {
  const bodyFile = getStringFlag(parsed, "body-file");
  const body = getStringFlag(parsed, "body");

  if (bodyFile && body) {
    throw new CliError("Use only one of --body or --body-file.", 2);
  }

  if (bodyFile) {
    return JSON.parse(await readFile(bodyFile, "utf8"));
  }

  if (body) {
    return JSON.parse(body);
  }

  return undefined;
}

function requiredId(parsed: ParsedArgs): string {
  const id = getStringFlag(parsed, "id") ?? parsed.command[2];
  if (!id) {
    throw new CliError("Missing operation id.", 2);
  }
  return id;
}

function parseArgs(args: string[]): ParsedArgs {
  const command: string[] = [];
  const flags = new Map<string, FlagValue>();

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg == null) {
      continue;
    }

    if (!arg.startsWith("-")) {
      command.push(arg);
      continue;
    }

    const normalized = arg.replace(/^-+/, "");
    const equalsIndex = normalized.indexOf("=");
    if (equalsIndex !== -1) {
      flags.set(normalized.slice(0, equalsIndex), normalized.slice(equalsIndex + 1));
      continue;
    }

    const next = args[i + 1];
    if (next != null && !next.startsWith("-")) {
      flags.set(normalized, next);
      i += 1;
      continue;
    }

    flags.set(normalized, true);
  }

  return { command, flags };
}

function hasFlag(parsed: ParsedArgs, name: string): boolean {
  return parsed.flags.has(name);
}

function getStringFlag(parsed: ParsedArgs, name: string): string | undefined {
  const value = parsed.flags.get(name);
  return typeof value === "string" ? value : undefined;
}

function getNumberFlag(parsed: ParsedArgs, name: string): number | undefined {
  const value = getStringFlag(parsed, name);
  if (value == null) {
    return undefined;
  }

  const parsedValue = Number(value);
  if (!Number.isFinite(parsedValue)) {
    throw new CliError(`Expected --${name} to be a number.`, 2);
  }
  return parsedValue;
}

function writeJson(value: unknown): void {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

function formatError(error: unknown): string {
  if (error instanceof CliError) {
    process.exitCode = error.exitCode;
    return `${error.message}\n`;
  }

  if (error instanceof Error) {
    return `${error.message}\n`;
  }

  return `${String(error)}\n`;
}

main(process.argv.slice(2)).catch((error: unknown) => {
  process.stderr.write(formatError(error));
  if (process.exitCode == null) {
    process.exitCode = 1;
  }
});
