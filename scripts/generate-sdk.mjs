#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const openapiPath = readFlag("--openapi");

if (!openapiPath) {
  fail("Usage: npm run generate:sdk -- --openapi <path-to-openapi.json>");
}

const spec = JSON.parse(await readFile(openapiPath, "utf8"));
const outDir = path.resolve("src/generated");
await mkdir(outDir, { recursive: true });

const operations = collectOperations(spec);
const schemas = spec.components?.schemas ?? {};
const schemaNames = Object.keys(schemas);

await writeFile(path.join(outDir, "types.ts"), generateTypes(schemaNames, schemas));
await writeFile(path.join(outDir, "sdk.ts"), generateSdk(operations));

console.log(`Generated ${schemaNames.length} schemas and ${operations.length} operations from ${openapiPath}`);

function collectOperations(openapi) {
  const out = [];
  for (const [route, pathItem] of Object.entries(openapi.paths ?? {})) {
    for (const method of ["get", "post", "patch", "put", "delete"]) {
      const operation = pathItem?.[method];
      if (!operation?.operationId) {
        continue;
      }
      out.push({
        route,
        method: method.toUpperCase(),
        operationId: operation.operationId,
        requestBodyType: refName(operation.requestBody?.content?.["application/json"]?.schema),
        responseType: responseType(operation.responses ?? {}),
        parameters: operation.parameters ?? [],
      });
    }
  }
  return out.sort((a, b) => a.operationId.localeCompare(b.operationId));
}

function generateTypes(names, components) {
  const lines = [
    generatedHeader(),
    "export type JsonValue =",
    "  | string",
    "  | number",
    "  | boolean",
    "  | null",
    "  | JsonValue[]",
    "  | { [key: string]: JsonValue };",
    "",
  ];

  for (const name of names) {
    lines.push(`export type ${name} = ${schemaToType(components[name], components, 0)};`);
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

function generateSdk(operations) {
  const byId = Object.fromEntries(operations.map((operation) => [operation.operationId, operation]));
  const requireOp = (operationId) => {
    const operation = byId[operationId];
    if (!operation) {
      fail(`Missing expected operationId in OpenAPI: ${operationId}`);
    }
    return operation;
  };

  const lines = [
    generatedHeader(),
    'import { HTTPClient } from "../lib/http.js";',
    'import * as T from "./types.js";',
    "",
    "export type TheHogOptions = {",
    "  accessKey?: string | undefined;",
    "  secretKey?: string | undefined;",
    "  security?: { accessKey?: string | undefined; secretKey?: string | undefined } | undefined;",
    "  serverURL?: string | undefined;",
    "  httpClient?: HTTPClient | undefined;",
    "  timeoutMs?: number | undefined;",
    "};",
    "",
    "export type RequestOptions = {",
    "  timeoutMs?: number | undefined;",
    "  signal?: AbortSignal | undefined;",
    "  headers?: HeadersInit | undefined;",
    "  serverURL?: string | undefined;",
    "};",
    "",
    "export type OperationWaitTarget =",
    "  | string",
    "  | { id?: string; operationId?: string; pollUrl?: string };",
    "",
    "export type OperationWaitOptions = RequestOptions & {",
    "  intervalMs?: number | undefined;",
    "  timeoutMs?: number | undefined;",
    "};",
    "",
    "type RequestConfig = {",
    "  method: string;",
    "  path: string;",
    "  query?: Record<string, unknown> | undefined;",
    "  body?: unknown | undefined;",
    "  idempotencyKey?: string | undefined;",
    "};",
    "",
    "const DEFAULT_SERVER_URL = \"https://developer.thehog.ai\";",
    "const DEFAULT_WAIT_INTERVAL_MS = 2000;",
    "const DEFAULT_WAIT_TIMEOUT_MS = 300000;",
    "const SUCCESS_STATUSES = new Set([\"succeeded\", \"partial_success\"]);",
    "const FAILURE_STATUSES = new Set([\"failed\", \"cancelled\"]);",
    "",
    "export class TheHogAPIError extends Error {",
    "  constructor(",
    "    message: string,",
    "    readonly status: number,",
    "    readonly response: Response,",
    "    readonly body: unknown,",
    "    readonly requestId?: string,",
    "  ) {",
    "    super(message);",
    "    this.name = \"TheHogAPIError\";",
    "  }",
    "}",
    "",
    "export class TheHog {",
    "  readonly #accessKey: string | undefined;",
    "  readonly #secretKey: string | undefined;",
    "  readonly #serverURL: string;",
    "  readonly #httpClient: HTTPClient;",
    "  readonly #timeoutMs: number | undefined;",
    "",
    "  readonly companies = new Companies(this);",
    "  readonly people = new People(this);",
    "  readonly deepResearch = new DeepResearch(this);",
    "  readonly enrichments = new Enrichments(this);",
    "  readonly operations = new Operations(this);",
    "  readonly monitors = new Monitors(this);",
    "  readonly search = new Search(this);",
    "  readonly scrapers = new Scrapers(this);",
    "",
    "  constructor(options: TheHogOptions = {}) {",
    "    this.#accessKey = options.accessKey ?? options.security?.accessKey;",
    "    this.#secretKey = options.secretKey ?? options.security?.secretKey;",
    "    this.#serverURL = options.serverURL ?? DEFAULT_SERVER_URL;",
    "    this.#httpClient = options.httpClient ?? new HTTPClient();",
    "    this.#timeoutMs = options.timeoutMs;",
    "  }",
    "",
    "  async request<TResponse>(config: RequestConfig, options: RequestOptions = {}): Promise<TResponse> {",
    "    const url = buildURL(options.serverURL ?? this.#serverURL, config.path, config.query);",
    "    const headers = new Headers(options.headers);",
    "    headers.set(\"Accept\", \"application/json\");",
    "    if (this.#accessKey) headers.set(\"X-Access-Key\", this.#accessKey);",
    "    if (this.#secretKey) headers.set(\"X-Secret-Key\", this.#secretKey);",
    "    if (config.idempotencyKey) headers.set(\"Idempotency-Key\", config.idempotencyKey);",
    "",
    "    let body: string | undefined;",
    "    if (config.body !== undefined) {",
    "      headers.set(\"Content-Type\", \"application/json\");",
    "      body = JSON.stringify(config.body);",
    "    }",
    "",
    "    const controller = options.signal ? undefined : new AbortController();",
    "    const timeoutMs = options.timeoutMs ?? this.#timeoutMs;",
    "    const timeout = controller && timeoutMs != null",
    "      ? setTimeout(() => controller.abort(), timeoutMs)",
    "      : undefined;",
    "",
    "    try {",
    "      const init: RequestInit = { method: config.method, headers };",
    "      if (body !== undefined) init.body = body;",
    "      const signal = options.signal ?? controller?.signal;",
    "      if (signal) init.signal = signal;",
    "      const response = await this.#httpClient.request(new Request(url, init));",
    "      const responseBody = await readResponse(response);",
    "      if (!response.ok) {",
    "        const requestId = response.headers.get(\"x-request-id\") ?? undefined;",
    "        throw new TheHogAPIError(`The Hog API request failed with status ${response.status}`, response.status, response, responseBody, requestId);",
    "      }",
    "      return responseBody as TResponse;",
    "    } finally {",
    "      if (timeout) clearTimeout(timeout);",
    "    }",
    "  }",
    "}",
    "",
    "export class Companies {",
    "  constructor(private readonly client: TheHog) {}",
    method(requireOp("searchCompanies"), "search", ["body", "idempotencyKey", "options"]),
    "}",
    "",
    "export class People {",
    "  constructor(private readonly client: TheHog) {}",
    method(requireOp("searchPeople"), "search", ["body", "idempotencyKey", "options"]),
    "}",
    "",
    "export class DeepResearch {",
    "  constructor(private readonly client: TheHog) {}",
    method(requireOp("startDeepResearch"), "start", ["body", "idempotencyKey", "options"]),
    "}",
    "",
    "export class Enrichments {",
    "  constructor(private readonly client: TheHog) {}",
    method(requireOp("submitEnrichment"), "submit", ["body", "idempotencyKey", "options"]),
    method(requireOp("getEnrichment"), "get", ["id", "options"]),
    "}",
    "",
    "export class Operations {",
    "  constructor(private readonly client: TheHog) {}",
    method(requireOp("getOperation"), "get", ["id", "options"]),
    "  async wait(operation: OperationWaitTarget, options: OperationWaitOptions = {}): Promise<T.OperationResponseDto> {",
    "    const operationId = getOperationId(operation);",
    "    const startedAt = Date.now();",
    "    const intervalMs = options.intervalMs ?? DEFAULT_WAIT_INTERVAL_MS;",
    "    const timeoutMs = options.timeoutMs ?? DEFAULT_WAIT_TIMEOUT_MS;",
    "    const { intervalMs: _intervalMs, timeoutMs: _timeoutMs, ...requestOptions } = options;",
    "    void _intervalMs;",
    "    void _timeoutMs;",
    "    for (;;) {",
    "      const result = await this.get(operationId, requestOptions);",
    "      const status = String(result.status);",
    "      if (SUCCESS_STATUSES.has(status)) return result;",
    "      if (FAILURE_STATUSES.has(status)) throw new Error(`Operation ${operationId} ended with status ${status}`);",
    "      if (Date.now() - startedAt >= timeoutMs) throw new Error(`Timed out waiting for operation ${operationId}`);",
    "      await sleep(intervalMs);",
    "    }",
    "  }",
    "}",
    "",
    "export class Monitors {",
    "  constructor(private readonly client: TheHog) {}",
    method(requireOp("createMonitor"), "create", ["body", "idempotencyKey", "options"]),
    method(requireOp("listMonitors"), "list", ["query", "options"]),
    method(requireOp("updateMonitor"), "update", ["id", "body", "idempotencyKey", "options"]),
    method(requireOp("deleteMonitor"), "delete", ["id", "options"]),
    method(requireOp("getMonitor"), "get", ["id", "options"]),
    method(requireOp("runMonitorNow"), "runNow", ["id", "bodyOptional", "idempotencyKey", "options"]),
    method(requireOp("listMonitorEvents"), "listEvents", ["id", "query", "options"]),
    "}",
    "",
    "export class Search {",
    "  constructor(private readonly client: TheHog) {}",
    method(requireOp("submitSearch"), "submit", ["body", "sync", "idempotencyKey", "options"]),
    method(requireOp("listSearches"), "list", ["query", "options"]),
    method(requireOp("getSearchResult"), "getResult", ["id", "options"]),
    "}",
    "",
    "export class Scrapers {",
    "  readonly linkedin = new LinkedInScrapers(this.client);",
    "  readonly instagram = new InstagramScrapers(this.client);",
    "  readonly tiktok = new TikTokScrapers(this.client);",
    "  readonly web = new WebScrapers(this.client);",
    "  constructor(private readonly client: TheHog) {}",
    "}",
    "",
    "export class LinkedInScrapers {",
    "  constructor(private readonly client: TheHog) {}",
    method(requireOp("findLinkedInCompanies"), "findCompanies", ["body", "idempotencyKey", "options"]),
    method(requireOp("getLinkedInProfile"), "getProfile", ["body", "idempotencyKey", "options"]),
    method(requireOp("getLinkedInCompany"), "getCompany", ["body", "idempotencyKey", "options"]),
    method(requireOp("listLinkedInCompanyPosts"), "listCompanyPosts", ["body", "idempotencyKey", "options"]),
    method(requireOp("listLinkedInProfilePosts"), "listProfilePosts", ["body", "idempotencyKey", "options"]),
    method(requireOp("searchLinkedInKeywordPosts"), "searchKeywordPosts", ["body", "idempotencyKey", "options"]),
    method(requireOp("listLinkedInPostReactions"), "listPostReactions", ["body", "idempotencyKey", "options"]),
    method(requireOp("listLinkedInPostComments"), "listPostComments", ["body", "idempotencyKey", "options"]),
    method(requireOp("listLinkedInProfileReactions"), "listProfileReactions", ["body", "idempotencyKey", "options"]),
    method(requireOp("listLinkedInProfileComments"), "listProfileComments", ["body", "idempotencyKey", "options"]),
    "}",
    "",
    "export class InstagramScrapers {",
    "  constructor(private readonly client: TheHog) {}",
    method(requireOp("getInstagramProfile"), "getProfile", ["body", "idempotencyKey", "options"]),
    method(requireOp("listInstagramPosts"), "listPosts", ["body", "idempotencyKey", "options"]),
    method(requireOp("getInstagramPost"), "getPost", ["body", "idempotencyKey", "options"]),
    method(requireOp("listInstagramPostComments"), "listPostComments", ["body", "idempotencyKey", "options"]),
    method(requireOp("listInstagramFollowers"), "listFollowers", ["body", "idempotencyKey", "options"]),
    method(requireOp("listInstagramFollowing"), "listFollowing", ["body", "idempotencyKey", "options"]),
    "}",
    "",
    "export class TikTokScrapers {",
    "  constructor(private readonly client: TheHog) {}",
    method(requireOp("getTikTokProfile"), "getProfile", ["body", "idempotencyKey", "options"]),
    "}",
    "",
    "export class WebScrapers {",
    "  constructor(private readonly client: TheHog) {}",
    method(requireOp("searchWeb"), "search", ["body", "idempotencyKey", "options"]),
    method(requireOp("crawlWebSite"), "crawl", ["body", "idempotencyKey", "options"]),
    method(requireOp("scrapeWebPage"), "scrape", ["body", "idempotencyKey", "options"]),
    "}",
    "",
    helperFunctions(),
  ];

  return `${lines.join("\n")}\n`;
}

function method(operation, methodName, shape) {
  const bodyType = operation.requestBodyType ? `T.${operation.requestBodyType}` : "Record<string, unknown>";
  const responseType = operation.responseType ? `T.${operation.responseType}` : "unknown";
  const path = JSON.stringify(operation.route);
  const httpMethod = JSON.stringify(operation.method);

  const params = [];
  const args = ["method: " + httpMethod, "path: " + path];
  if (shape.includes("id")) {
    params.push("id: string");
    args[1] = `path: ${path}.replace("{id}", encodeURIComponent(id))`;
  }
  if (shape.includes("body")) {
    params.push(`body: ${bodyType}`);
    args.push("body");
  }
  if (shape.includes("bodyOptional")) {
    params.push(`body?: ${bodyType}`);
    args.push("body");
  }
  if (shape.includes("sync")) {
    params.push("sync?: boolean");
    args.push("query: { sync }");
  }
  if (shape.includes("query")) {
    params.push("query: Record<string, unknown> = {}");
    args.push("query");
  }
  if (shape.includes("idempotencyKey")) {
    params.push("idempotencyKey?: string | undefined");
    args.push("idempotencyKey");
  }
  params.push("options?: RequestOptions");

  return [
    `  async ${methodName}(${params.join(", ")}): Promise<${responseType}> {`,
    `    return this.client.request<${responseType}>({ ${args.join(", ")} }, options);`,
    "  }",
  ].join("\n");
}

function helperFunctions() {
  return [
    "function buildURL(serverURL: string, route: string, query: Record<string, unknown> = {}): URL {",
    "  const base = serverURL.endsWith(\"/\") ? serverURL : `${serverURL}/`;",
    "  const url = new URL(route.replace(/^\\//, \"\"), base);",
    "  for (const [key, value] of Object.entries(query)) {",
    "    if (value == null) continue;",
    "    if (Array.isArray(value)) {",
    "      for (const item of value) url.searchParams.append(key, String(item));",
    "    } else {",
    "      url.searchParams.set(key, String(value));",
    "    }",
    "  }",
    "  return url;",
    "}",
    "",
    "async function readResponse(response: Response): Promise<unknown> {",
    "  if (response.status === 204) return undefined;",
    "  const text = await response.text();",
    "  if (!text) return undefined;",
    "  const contentType = response.headers.get(\"content-type\") ?? \"\";",
    "  if (contentType.includes(\"application/json\")) return JSON.parse(text);",
    "  return text;",
    "}",
    "",
    "function getOperationId(operation: OperationWaitTarget): string {",
    "  if (typeof operation === \"string\") return operation;",
    "  const id = operation.operationId ?? operation.id ?? idFromPollUrl(operation.pollUrl);",
    "  if (!id) throw new Error(\"Expected an operation id or pollUrl.\");",
    "  return id;",
    "}",
    "",
    "function idFromPollUrl(pollUrl: string | undefined): string | undefined {",
    "  if (!pollUrl) return undefined;",
    "  const path = pollUrl.startsWith(\"http\") ? new URL(pollUrl).pathname : pollUrl.split(\"?\")[0] ?? pollUrl;",
    "  const id = path.split(\"/\").filter(Boolean).at(-1);",
    "  return id ? decodeURIComponent(id) : undefined;",
    "}",
    "",
    "function sleep(ms: number): Promise<void> {",
    "  return new Promise((resolve) => setTimeout(resolve, ms));",
    "}",
  ].join("\n");
}

function responseType(responses) {
  for (const [status, response] of Object.entries(responses)) {
    if (!status.startsWith("2")) {
      continue;
    }
    const schema = response?.content?.["application/json"]?.schema;
    return refName(schema) ?? inlineResponseName(schema);
  }
  return undefined;
}

function inlineResponseName(schema) {
  if (!schema) {
    return undefined;
  }
  return undefined;
}

function schemaToType(schema, components, depth) {
  if (!schema || depth > 20) {
    return "unknown";
  }
  if (schema.$ref) {
    return refName(schema) ?? "unknown";
  }
  if (schema.oneOf || schema.anyOf) {
    return (schema.oneOf ?? schema.anyOf).map((item) => schemaToType(item, components, depth + 1)).join(" | ");
  }
  if (schema.allOf) {
    return schema.allOf.map((item) => schemaToType(item, components, depth + 1)).join(" & ");
  }
  if (schema.nullable) {
    return `${schemaToType({ ...schema, nullable: false }, components, depth + 1)} | null`;
  }
  if (schema.enum) {
    return schema.enum.map((value) => JSON.stringify(value)).join(" | ");
  }
  if (schema.const !== undefined) {
    return JSON.stringify(schema.const);
  }
  if (schema.type === "array") {
    return `${schemaToType(schema.items, components, depth + 1)}[]`;
  }
  if (schema.type === "integer" || schema.type === "number") {
    return "number";
  }
  if (schema.type === "string") {
    return "string";
  }
  if (schema.type === "boolean") {
    return "boolean";
  }
  if (schema.type === "object" || schema.properties || schema.additionalProperties) {
    return objectToType(schema, components, depth);
  }
  return "unknown";
}

function objectToType(schema, components, depth) {
  const props = schema.properties ?? {};
  const required = new Set(schema.required ?? []);
  const entries = Object.entries(props);
  const additional = schema.additionalProperties;
  const fields = entries.map(([key, value]) => {
    const optional = required.has(key) ? "" : "?";
    return `  ${JSON.stringify(key)}${optional}: ${schemaToType(value, components, depth + 1)};`;
  });

  if (additional) {
    const valueType = additional === true ? "unknown" : schemaToType(additional, components, depth + 1);
    fields.push(`  [key: string]: ${valueType};`);
  }

  if (!fields.length) {
    return "Record<string, unknown>";
  }

  return `{\n${fields.join("\n")}\n}`;
}

function refName(schema) {
  const ref = schema?.$ref;
  return typeof ref === "string" ? ref.split("/").at(-1) : undefined;
}

function generatedHeader() {
  return [
    "/*",
    " * Code generated by scripts/generate-sdk.mjs. DO NOT EDIT.",
    " */",
    "",
  ].join("\n");
}

function readFlag(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) {
    return undefined;
  }
  return process.argv[index + 1];
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
