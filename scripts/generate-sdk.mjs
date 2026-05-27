#!/usr/bin/env node

import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const openapiPath = readFlag("--openapi");

if (!openapiPath) {
  fail("Usage: npm run generate:sdk -- --openapi <path-to-openapi.json>");
}

const spec = JSON.parse(await readFile(openapiPath, "utf8"));
const schemas = spec.components?.schemas ?? {};
const operations = collectOperations(spec);

const EXPECTED_OPERATION_COUNT = 37;
if (operations.length !== EXPECTED_OPERATION_COUNT) {
  fail(`Expected ${EXPECTED_OPERATION_COUNT} public operations, found ${operations.length}.`);
}

const manifest = buildManifest();
for (const operation of operations) {
  if (!manifest[operation.operationId]) {
    fail(`Missing SDK resource mapping for operationId: ${operation.operationId}`);
  }
}

const generatedDirs = [
  "src/funcs",
  "src/sdk",
  "src/models/operations",
  "docs/models",
  "docs/sdks",
  "src/generated",
];

for (const dir of generatedDirs) {
  await rm(path.resolve(dir), { recursive: true, force: true });
  await mkdir(path.resolve(dir), { recursive: true });
}

await cleanGeneratedModelFiles();

const inlineSchemas = collectInlineResponseSchemas(operations);
const runtimeSchemas = {
  Security: {
    type: "object",
    additionalProperties: false,
    properties: {
      accessKey: { type: "string" },
      secretKey: { type: "string" },
    },
  },
};
const allSchemas = { ...runtimeSchemas, ...schemas, ...inlineSchemas };
const schemaNames = Object.keys(allSchemas).sort();

for (const name of schemaNames) {
  await writeFile(
    path.resolve("src/models", `${kebab(name)}.ts`),
    generateModelFile(name, allSchemas[name], allSchemas),
  );
  await writeFile(
    path.resolve("docs/models", `${kebab(name)}.md`),
    generateModelDoc(name, allSchemas[name]),
  );
}

await writeFile(path.resolve("src/models/index.ts"), generateModelsIndex(schemaNames));

for (const operation of operations) {
  await writeFile(
    path.resolve("src/models/operations", `${kebab(operation.operationId)}.ts`),
    generateOperationModel(operation, allSchemas),
  );
  await writeFile(
    path.resolve("src/funcs", `${kebab(operation.operationId)}.ts`),
    generateFunction(operation, manifest[operation.operationId], allSchemas),
  );
}

await writeFile(
  path.resolve("src/models/operations/index.ts"),
  generateOperationsIndex(operations),
);
await writeFile(path.resolve("src/funcs/common.ts"), generateFunctionCommon());
await writeFile(path.resolve("src/sdk/sdk.ts"), generateRootSdk(manifest));
for (const resource of resources(manifest)) {
  await writeFile(
    path.resolve("src/sdk", `${resource.file}.ts`),
    generateResource(resource, operations, manifest),
  );
  await mkdir(path.resolve("docs/sdks", resource.docDir), { recursive: true });
  await writeFile(
    path.resolve("docs/sdks", resource.docDir, "README.md"),
    generateResourceDoc(resource, operations, manifest),
  );
}
await writeFile(path.resolve("src/sdk/index.ts"), generateSdkIndex(resources(manifest)));

console.log(`Generated ${schemaNames.length} schemas and ${operations.length} operations from ${openapiPath}`);

function collectOperations(openapi) {
  const out = [];
  for (const [route, pathItem] of Object.entries(openapi.paths ?? {})) {
    for (const method of ["get", "post", "patch", "put", "delete"]) {
      const operation = pathItem?.[method];
      if (!operation) continue;
      if (!operation.operationId) {
        fail(`${method.toUpperCase()} ${route} is missing operationId`);
      }
      const requestBodySchema = operation.requestBody?.content?.["application/json"]?.schema;
      const requestBodyType = refName(requestBodySchema);
      if (operation.requestBody?.required && !requestBodyType) {
        fail(`${operation.operationId} has a required request body without a component schema`);
      }
      const responses = collectResponses(operation);
      if (!responses.length) {
        fail(`${operation.operationId} is missing a success response`);
      }
      out.push({
        route,
        method: method.toUpperCase(),
        operationId: operation.operationId,
        summary: operation.summary ?? operation.operationId,
        description: operation.description ?? operation.summary ?? "",
        parameters: operation.parameters ?? [],
        pathParams: (operation.parameters ?? []).filter((p) => p.in === "path"),
        queryParams: (operation.parameters ?? []).filter((p) => p.in === "query"),
        headerParams: (operation.parameters ?? []).filter((p) => p.in === "header"),
        requestBodyRequired: Boolean(operation.requestBody?.required),
        requestBodySchema,
        requestBodyType,
        responses,
      });
    }
  }
  return out.sort((a, b) => a.operationId.localeCompare(b.operationId));
}

function collectResponses(operation) {
  return Object.entries(operation.responses ?? {})
    .filter(([status]) => /^[23]\d\d$/.test(status))
    .map(([status, response]) => {
      const schema = response?.content?.["application/json"]?.schema;
      return {
        status: Number(status),
        schema,
        type: refName(schema),
      };
    })
    .sort((a, b) => a.status - b.status);
}

function collectInlineResponseSchemas(ops) {
  const inline = {};
  for (const operation of ops) {
    for (const response of operation.responses) {
      if (response.schema && !response.type) {
        const name = `${pascal(operation.operationId)}Response`;
        inline[name] = response.schema;
        response.type = name;
      }
    }
  }
  return inline;
}

function buildManifest() {
  const entries = [
    ["searchCompanies", "companies", "Companies", "companies", "Companies", "search", ["body", "idempotencyKey", "options"]],
    ["searchPeople", "people", "People", "people", "People", "search", ["body", "idempotencyKey", "options"]],
    ["startDeepResearch", "deepResearch", "DeepResearch", "deep-research", "Deep Research", "start", ["body", "idempotencyKey", "options"]],
    ["submitEnrichment", "enrichments", "Enrichments", "enrichments", "Enrichments", "submit", ["body", "idempotencyKey", "options"]],
    ["getEnrichment", "enrichments", "Enrichments", "enrichments", "Enrichments", "get", ["id", "options"]],
    ["getOperation", "operations", "Operations", "operations", "Operations", "get", ["id", "options"]],
    ["listMonitors", "monitors", "Monitors", "monitors", "Monitors", "list", ["query", "options"]],
    ["createMonitor", "monitors", "Monitors", "monitors", "Monitors", "create", ["body", "idempotencyKey", "options"]],
    ["getMonitor", "monitors", "Monitors", "monitors", "Monitors", "get", ["id", "options"]],
    ["updateMonitor", "monitors", "Monitors", "monitors", "Monitors", "update", ["id", "body", "idempotencyKey", "options"]],
    ["deleteMonitor", "monitors", "Monitors", "monitors", "Monitors", "delete", ["id", "options"]],
    ["runMonitorNow", "monitors", "Monitors", "monitors", "Monitors", "runNow", ["id", "bodyOptional", "options"]],
    ["listMonitorEvents", "monitors", "Monitors", "monitors", "Monitors", "listEvents", ["id", "query", "options"]],
    ["listSearches", "search", "Search", "search", "Search", "list", ["query", "options"]],
    ["submitSearch", "search", "Search", "search", "Search", "submit", ["body", "sync", "idempotencyKey", "options"]],
    ["getSearchResult", "search", "Search", "search", "Search", "getResult", ["id", "options"]],
    ["findLinkedInCompanies", "linkedin", "LinkedInScrapers", "linkedin", "LinkedIn Scrapers", "findCompanies", ["body", "idempotencyKey", "options"], "scrapers"],
    ["getLinkedInProfile", "linkedin", "LinkedInScrapers", "linkedin", "LinkedIn Scrapers", "getProfile", ["body", "idempotencyKey", "options"], "scrapers"],
    ["getLinkedInCompany", "linkedin", "LinkedInScrapers", "linkedin", "LinkedIn Scrapers", "getCompany", ["body", "idempotencyKey", "options"], "scrapers"],
    ["listLinkedInCompanyPosts", "linkedin", "LinkedInScrapers", "linkedin", "LinkedIn Scrapers", "listCompanyPosts", ["body", "idempotencyKey", "options"], "scrapers"],
    ["listLinkedInProfilePosts", "linkedin", "LinkedInScrapers", "linkedin", "LinkedIn Scrapers", "listProfilePosts", ["body", "idempotencyKey", "options"], "scrapers"],
    ["searchLinkedInKeywordPosts", "linkedin", "LinkedInScrapers", "linkedin", "LinkedIn Scrapers", "searchKeywordPosts", ["body", "idempotencyKey", "options"], "scrapers"],
    ["listLinkedInPostReactions", "linkedin", "LinkedInScrapers", "linkedin", "LinkedIn Scrapers", "listPostReactions", ["body", "idempotencyKey", "options"], "scrapers"],
    ["listLinkedInPostComments", "linkedin", "LinkedInScrapers", "linkedin", "LinkedIn Scrapers", "listPostComments", ["body", "idempotencyKey", "options"], "scrapers"],
    ["listLinkedInProfileReactions", "linkedin", "LinkedInScrapers", "linkedin", "LinkedIn Scrapers", "listProfileReactions", ["body", "idempotencyKey", "options"], "scrapers"],
    ["listLinkedInProfileComments", "linkedin", "LinkedInScrapers", "linkedin", "LinkedIn Scrapers", "listProfileComments", ["body", "idempotencyKey", "options"], "scrapers"],
    ["getInstagramProfile", "instagram", "InstagramScrapers", "instagram", "Instagram Scrapers", "getProfile", ["body", "idempotencyKey", "options"], "scrapers"],
    ["listInstagramPosts", "instagram", "InstagramScrapers", "instagram", "Instagram Scrapers", "listPosts", ["body", "idempotencyKey", "options"], "scrapers"],
    ["getInstagramPost", "instagram", "InstagramScrapers", "instagram", "Instagram Scrapers", "getPost", ["body", "idempotencyKey", "options"], "scrapers"],
    ["listInstagramPostComments", "instagram", "InstagramScrapers", "instagram", "Instagram Scrapers", "listPostComments", ["body", "idempotencyKey", "options"], "scrapers"],
    ["listInstagramFollowers", "instagram", "InstagramScrapers", "instagram", "Instagram Scrapers", "listFollowers", ["body", "idempotencyKey", "options"], "scrapers"],
    ["listInstagramFollowing", "instagram", "InstagramScrapers", "instagram", "Instagram Scrapers", "listFollowing", ["body", "idempotencyKey", "options"], "scrapers"],
    ["getTikTokProfile", "tiktok", "TikTokScrapers", "tiktok", "TikTok Scrapers", "getProfile", ["body", "idempotencyKey", "options"], "scrapers"],
    ["searchWeb", "web", "WebScrapers", "web", "Web Scrapers", "search", ["body", "idempotencyKey", "options"], "scrapers"],
    ["crawlWebSite", "web", "WebScrapers", "web", "Web Scrapers", "crawl", ["body", "idempotencyKey", "options"], "scrapers"],
    ["scrapeWebPage", "web", "WebScrapers", "web", "Web Scrapers", "scrape", ["body", "idempotencyKey", "options"], "scrapers"],
    ["batchScrapeWebPages", "web", "WebScrapers", "web", "Web Scrapers", "batchScrape", ["body", "idempotencyKey", "options"], "scrapers"],
  ];
  return Object.fromEntries(entries.map(([operationId, key, className, file, title, method, args, parent]) => [
    operationId,
    { operationId, key, className, file, title, method, args, parent, docDir: file },
  ]));
}

async function cleanGeneratedModelFiles() {
  await mkdir(path.resolve("src/models"), { recursive: true });
  for (const entry of await readdir(path.resolve("src/models"), { withFileTypes: true })) {
    if (entry.name === "errors") continue;
    if (entry.isFile() && entry.name.endsWith(".ts")) {
      await rm(path.resolve("src/models", entry.name));
    }
  }
}

function generateModelFile(name, schema, allSchemas) {
  const refs = [...collectRefs(schema)].filter((ref) => ref !== name).sort();
  const importLines = refs.flatMap((ref) => [
    `import type { ${ref} } from "./${kebab(ref)}.js";`,
    `import { ${ref}$inboundSchema, ${ref}$outboundSchema } from "./${kebab(ref)}.js";`,
  ]);
  const lines = [
    generatedHeader(),
    'import * as z from "zod/v4";',
    ...importLines,
    "",
    `export type ${name} = ${schemaToType(schema, allSchemas)};`,
    `export type ${name}$Outbound = ${name};`,
    "",
    `export const ${name}$inboundSchema = (${schemaToZod(schema, "inbound")}) as z.ZodType<${name}>;`,
    `export const ${name}$outboundSchema = (${schemaToZod(schema, "outbound")}) as z.ZodType<${name}$Outbound>;`,
    "",
    `export function ${camel(name)}FromJSON(jsonString: string): ${name} {`,
    `  return ${name}$inboundSchema.parse(JSON.parse(jsonString)) as ${name};`,
    "}",
    "",
    `export function ${camel(name)}ToJSON(value: ${name}): string {`,
    `  return JSON.stringify(${name}$outboundSchema.parse(value));`,
    "}",
  ];
  return `${lines.join("\n")}\n`;
}

function generateModelsIndex(names) {
  return `${generatedHeader()}${names.map((name) => `export * from "./${kebab(name)}.js";`).join("\n")}\n`;
}

function generateOperationModel(operation, allSchemas) {
  const requestName = `${pascal(operation.operationId)}Request`;
  const responseName = `${pascal(operation.operationId)}Response`;
  const fields = operationRequestFields(operation);
  const typeFields = fields.map((field) => {
    const optional = field.required ? "" : "?";
    return `  ${field.name}${optional}: ${field.type}${field.required ? "" : " | undefined"};`;
  });
  const zodFields = fields.map((field) => {
    const schema = field.required ? field.zod : `z.optional(${field.zod})`;
    return `  ${field.name}: ${schema},`;
  });
  const responseType = responseTypeFor(operation);
  const responseSchemas = operation.responses
    .filter((response) => response.type)
    .map((response) => `  ${response.status}: models.${response.type}$inboundSchema,`);
  const usesModels = fields.some((field) => field.type.includes("models.")) || responseType.includes("models.") || responseSchemas.length > 0;
  return [
    generatedHeader(),
    'import * as z from "zod/v4";',
    usesModels ? 'import * as models from "../index.js";' : "",
    "",
    `export type ${requestName} = {`,
    typeFields.join("\n"),
    "};",
    "",
    `export const ${requestName}$outboundSchema = z.object({`,
    zodFields.join("\n"),
    "});",
    "",
    `export type ${responseName} = ${responseType};`,
    `export const ${responseName}$inboundSchemas = {`,
    responseSchemas.join("\n"),
    "};",
  ].filter((line) => line !== "").join("\n") + "\n";
}

function generateOperationsIndex(ops) {
  return `${generatedHeader()}${ops.map((op) => `export * from "./${kebab(op.operationId)}.js";`).join("\n")}\n`;
}

function generateFunction(operation, mapping) {
  const functionName = camel(operation.operationId);
  const requestName = `${pascal(operation.operationId)}Request`;
  const responseName = `${pascal(operation.operationId)}Response`;
  const signature = functionSignature(operation, mapping);
  const inputObject = inputObjectFor(mapping.args);
  const pathParams = `{ ${operation.pathParams.map((p) => `${safeProp(p.name)}: input.${safeProp(p.name)}`).join(", ")} }`;
  const query = queryObjectFor(operation, mapping.args);
  const bodyValue = operation.requestBodyType ? "input.body" : "undefined";
  const idempotency = hasIdempotency(operation) ? "input.idempotencyKey" : "undefined";
  const responseSchemas = operation.responses
    .filter((response) => response.type)
    .map((response) => `    { status: ${response.status}, schema: operations.${responseName}$inboundSchemas[${response.status}] },`)
    .join("\n");

  return [
    generatedHeader(),
    'import { pathToFunc } from "../lib/url.js";',
    'import { ClientSDK, RequestOptions } from "../lib/sdks.js";',
    operation.requestBodyType ? 'import * as models from "../models/index.js";' : "",
    'import * as operations from "../models/operations/index.js";',
    'import { parseInput, sendJson } from "./common.js";',
    "",
    `export async function ${functionName}(`,
    signature,
    `): Promise<operations.${responseName}> {`,
    `  const input = parseInput(operations.${requestName}$outboundSchema, ${inputObject}, "${operation.operationId} input");`,
    "  return sendJson(client, {",
    `    operationId: "${operation.operationId}",`,
    `    method: "${operation.method}",`,
    `    path: pathToFunc(${JSON.stringify(operation.route)})(${pathParams}),`,
    `    query: ${query},`,
    `    body: ${bodyValue},`,
    `    idempotencyKey: ${idempotency},`,
    "    responseSchemas: [",
    responseSchemas,
    "    ],",
    "  }, options);",
    "}",
  ].filter((line) => line !== "").join("\n") + "\n";
}

function generateFunctionCommon() {
  return [
    generatedHeader(),
    'import * as z from "zod/v4";',
    'import { matchStatusCode } from "../lib/http.js";',
    'import { ClientSDK, RequestOptions } from "../lib/sdks.js";',
    'import { extractSecurity, resolveGlobalSecurity } from "../lib/security.js";',
    'import { ResponseValidationError } from "../models/errors/response-validation-error.js";',
    'import { SDKValidationError } from "../models/errors/sdk-validation-error.js";',
    'import { TheHogAPIError } from "../models/errors/the-hog-api-error.js";',
    "",
    "type ResponseSchema = { status: number; schema: z.ZodType };",
    "",
    "type SendJsonConfig = {",
    "  operationId: string;",
    "  method: string;",
    "  path: string;",
    "  query?: Record<string, unknown> | undefined;",
    "  body?: unknown | undefined;",
    "  idempotencyKey?: string | undefined;",
    "  responseSchemas: ResponseSchema[];",
    "};",
    "",
    "export function parseInput<T extends z.ZodType>(schema: T, value: unknown, label: string): z.infer<T> {",
    "  try {",
    "    return schema.parse(value);",
    "  } catch (cause) {",
    "    throw new SDKValidationError(`Failed to validate ${label}`, cause, value);",
    "  }",
    "}",
    "",
    "export async function sendJson<T>(client: ClientSDK, config: SendJsonConfig, options?: RequestOptions): Promise<T> {",
    "  const query = encodeQuery(config.query ?? {});",
    "  const headers = new Headers({ Accept: \"application/json\" });",
    "  let body: string | undefined;",
    "  if (config.body !== undefined) {",
    "    headers.set(\"Content-Type\", \"application/json\");",
    "    body = JSON.stringify(config.body);",
    "  }",
    "  if (config.idempotencyKey) {",
    "    headers.set(\"Idempotency-Key\", config.idempotencyKey);",
    "  }",
    "",
    "  const securityInput = await extractSecurity(client._options.security);",
    "  const requestSecurity = resolveGlobalSecurity(securityInput);",
    "  const context = {",
    "    options: client._options,",
    "    baseURL: options?.serverURL ?? client._baseURL ?? \"\",",
    "    operationID: config.operationId,",
    "    oAuth2Scopes: null,",
    "    resolvedSecurity: requestSecurity,",
    "    securitySource: client._options.security,",
    "    retryConfig: options?.retries || client._options.retryConfig || {",
    "      strategy: \"backoff\" as const,",
    "      backoff: { initialInterval: 500, maxInterval: 30000, exponent: 1.5, maxElapsedTime: 120000 },",
    "      retryConnectionErrors: true,",
    "    },",
    "    retryCodes: options?.retryCodes || [\"408\", \"429\", \"5XX\"],",
    "  };",
    "",
    "  const requestResult = client._createRequest(context, {",
    "    security: requestSecurity,",
    "    method: config.method,",
    "    baseURL: options?.serverURL,",
    "    path: config.path,",
    "    query,",
    "    headers,",
    "    body,",
    "    userAgent: client._options.userAgent,",
    "    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,",
    "  }, options);",
    "  if (!requestResult.ok) {",
    "    throw requestResult.error;",
    "  }",
    "  const request = requestResult.value;",
    "",
    "  const responseResult = await client._do(request, {",
    "    context,",
    "    isErrorStatusCode: (statusCode: number) => matchStatusCode({ status: statusCode } as Response, [\"4XX\", \"5XX\"]),",
    "    retryConfig: context.retryConfig,",
    "    retryCodes: context.retryCodes,",
    "  });",
    "  if (!responseResult.ok) {",
    "    throw responseResult.error;",
    "  }",
    "",
    "  const response = responseResult.value;",
    "  const text = await response.text();",
    "  const payload = parsePayload(text, response.headers.get(\"content-type\"));",
    "  if (!response.ok) {",
    "    throw new TheHogAPIError(`The Hog API request failed with status ${response.status}`, response.status, response, payload, response.headers.get(\"x-request-id\") ?? undefined);",
    "  }",
    "",
    "  const responseSchema = config.responseSchemas.find((entry) => entry.status === response.status)?.schema;",
    "  if (!responseSchema) {",
    "    return payload as T;",
    "  }",
    "  try {",
    "    return responseSchema.parse(payload) as T;",
    "  } catch (cause) {",
    "    throw new ResponseValidationError(\"Response validation failed\", {",
    "      response,",
    "      request,",
    "      body: text,",
    "      cause,",
    "      rawValue: payload,",
    "      rawMessage: \"Response validation failed\",",
    "    });",
    "  }",
    "}",
    "",
    "function encodeQuery(query: Record<string, unknown>): string {",
    "  const params = new URLSearchParams();",
    "  for (const [key, value] of Object.entries(query)) {",
    "    if (value == null) continue;",
    "    if (Array.isArray(value)) {",
    "      for (const item of value) params.append(key, String(item));",
    "    } else {",
    "      params.set(key, String(value));",
    "    }",
    "  }",
    "  return params.toString();",
    "}",
    "",
    "function parsePayload(text: string, contentType: string | null): unknown {",
    "  if (!text) return undefined;",
    "  if ((contentType ?? \"\").includes(\"application/json\")) {",
    "    return JSON.parse(text);",
    "  }",
    "  return text;",
    "}",
  ].join("\n") + "\n";
}

function generateRootSdk(manifest) {
  const top = resources(manifest).filter((resource) => !resource.parent);
  const imports = top.map((resource) => `import { ${resource.className} } from "./${resource.file}.js";`);
  return [
    generatedHeader(),
    'import { TheHogCore } from "../core.js";',
    ...imports,
    "",
    "export class TheHog extends TheHogCore {",
    ...top.map((resource) => [
      `  private _${resource.key}?: ${resource.className};`,
      `  get ${resource.key}(): ${resource.className} {`,
      `    return (this._${resource.key} ??= new ${resource.className}(this._options));`,
      "  }",
      "",
    ].join("\n")),
    "}",
  ].join("\n");
}

function generateResource(resource, ops, manifest) {
  if (resource.key === "scrapers") {
    return generateScrapersResource(manifest);
  }
  const resourceOps = ops.filter((op) => manifest[op.operationId].key === resource.key);
  const imports = resourceOps.map((op) =>
    `import { ${camel(op.operationId)} } from "../funcs/${kebab(op.operationId)}.js";`
  );
  return [
    generatedHeader(),
    ...imports,
    'import { ClientSDK, RequestOptions } from "../lib/sdks.js";',
    'import * as models from "../models/index.js";',
    'import * as operations from "../models/operations/index.js";',
    "",
    `export class ${resource.className} extends ClientSDK {`,
    ...resourceOps.map((op) => resourceMethod(op, manifest[op.operationId])),
    resource.key === "operations" ? operationWaitMethod() : "",
    "}",
    resource.key === "operations" ? operationWaitSupport() : "",
  ].filter(Boolean).join("\n") + "\n";
}

function generateScrapersResource(manifest) {
  return [
    generatedHeader(),
    'import { ClientSDK } from "../lib/sdks.js";',
    'import { InstagramScrapers } from "./instagram.js";',
    'import { LinkedInScrapers } from "./linkedin.js";',
    'import { TikTokScrapers } from "./tiktok.js";',
    'import { WebScrapers } from "./web.js";',
    "",
    "export class Scrapers extends ClientSDK {",
    "  private _linkedin?: LinkedInScrapers;",
    "  get linkedin(): LinkedInScrapers {",
    "    return (this._linkedin ??= new LinkedInScrapers(this._options));",
    "  }",
    "",
    "  private _instagram?: InstagramScrapers;",
    "  get instagram(): InstagramScrapers {",
    "    return (this._instagram ??= new InstagramScrapers(this._options));",
    "  }",
    "",
    "  private _tiktok?: TikTokScrapers;",
    "  get tiktok(): TikTokScrapers {",
    "    return (this._tiktok ??= new TikTokScrapers(this._options));",
    "  }",
    "",
    "  private _web?: WebScrapers;",
    "  get web(): WebScrapers {",
    "    return (this._web ??= new WebScrapers(this._options));",
    "  }",
    "}",
  ].join("\n") + "\n";
}

function resourceMethod(operation, mapping) {
  const args = methodSignature(operation, mapping);
  const callArgs = callArgsFor(mapping.args);
  const responseType = `operations.${pascal(operation.operationId)}Response`;
  const jsdoc = [
    "  /**",
    `   * ${operation.summary}`,
    "   */",
  ].join("\n");
  return [
    jsdoc,
    `  async ${mapping.method}(${args}): Promise<${responseType}> {`,
    `    return ${camel(operation.operationId)}(${callArgs});`,
    "  }",
  ].join("\n");
}

function operationWaitMethod() {
  return [
    "  /**",
    "   * Wait for an operation to complete.",
    "   */",
    "  async wait(operation: OperationWaitTarget, options: OperationWaitOptions = {}): Promise<models.OperationResponseDto> {",
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
  ].join("\n");
}

function operationWaitSupport() {
  return [
    "",
    "export type OperationWaitTarget = string | { id?: string | undefined; operationId?: string | undefined; pollUrl?: string | undefined };",
    "export type OperationWaitOptions = RequestOptions & { intervalMs?: number | undefined; timeoutMs?: number | undefined };",
    "",
    "const DEFAULT_WAIT_INTERVAL_MS = 2000;",
    "const DEFAULT_WAIT_TIMEOUT_MS = 300000;",
    "const SUCCESS_STATUSES = new Set([\"succeeded\", \"partial_success\"]);",
    "const FAILURE_STATUSES = new Set([\"failed\", \"cancelled\"]);",
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

function generateSdkIndex(resourceList) {
  return `${generatedHeader()}export * from "./sdk.js";\n${resourceList.map((resource) => `export * from "./${resource.file}.js";`).join("\n")}\n`;
}

function generateModelDoc(name, schema) {
  return [`# ${name}`, "", "Generated from the public OpenAPI contract.", "", "```ts", `import type { ${name} } from "@the-hog/sdk/models";`, "```", ""].join("\n");
}

function generateResourceDoc(resource, ops, manifest) {
  const resourceOps = ops.filter((op) => manifest[op.operationId].key === resource.key);
  return [
    `# ${resource.title}`,
    "",
    "Generated SDK reference for this resource.",
    "",
    ...resourceOps.map((op) => `- \`${manifest[op.operationId].method}(...)\` calls \`${op.operationId}\`.`),
    "",
  ].join("\n");
}

function resources(manifest) {
  const byKey = new Map();
  byKey.set("scrapers", { key: "scrapers", className: "Scrapers", file: "scrapers", title: "Scrapers", docDir: "scrapers" });
  for (const mapping of Object.values(manifest)) {
    if (!byKey.has(mapping.key)) {
      byKey.set(mapping.key, {
        key: mapping.key,
        className: mapping.className,
        file: mapping.file,
        title: mapping.title,
        parent: mapping.parent,
        docDir: mapping.docDir,
      });
    }
  }
  return [...byKey.values()].sort((a, b) => {
    const order = ["companies", "people", "deepResearch", "enrichments", "operations", "monitors", "search", "scrapers", "linkedin", "instagram", "tiktok", "web"];
    return order.indexOf(a.key) - order.indexOf(b.key);
  });
}

function operationRequestFields(operation) {
  const fields = [];
  for (const param of operation.pathParams) {
    fields.push({ name: safeProp(param.name), type: schemaToType(param.schema ?? {}, schemas), zod: schemaToZod(param.schema ?? { type: "string" }, "outbound"), required: true });
  }
  for (const param of operation.queryParams) {
    fields.push({ name: safeProp(param.name), type: schemaToType(param.schema ?? {}, schemas), zod: schemaToZod(param.schema ?? {}, "outbound"), required: Boolean(param.required) });
  }
  if (operation.requestBodyType) {
    fields.push({ name: "body", type: `models.${operation.requestBodyType}`, zod: `models.${operation.requestBodyType}$outboundSchema`, required: operation.requestBodyRequired });
  }
  if (hasIdempotency(operation)) {
    fields.push({ name: "idempotencyKey", type: "string", zod: "z.string()", required: false });
  }
  return fields;
}

function functionSignature(operation, mapping) {
  const params = ["  client: ClientSDK"];
  for (const arg of mapping.args) {
    appendArg(params, arg, operation);
  }
  return `${params.join(",\n")},\n`;
}

function methodSignature(operation, mapping) {
  const params = [];
  for (const arg of mapping.args) {
    appendArg(params, arg, operation);
  }
  return params.join(", ");
}

function appendArg(params, arg, operation) {
  if (arg === "id") params.push("id: string");
  if (arg === "body") params.push(`body: models.${operation.requestBodyType}`);
  if (arg === "bodyOptional") params.push(`body?: models.${operation.requestBodyType} | undefined`);
  if (arg === "sync") params.push("sync?: boolean | undefined");
  if (arg === "query") params.push(`query: Partial<operations.${pascal(operation.operationId)}Request> = {}`);
  if (arg === "idempotencyKey") params.push("idempotencyKey?: string | undefined");
  if (arg === "options") params.push("options?: RequestOptions");
}

function inputObjectFor(args) {
  const entries = [];
  if (args.includes("id")) entries.push("id");
  if (args.includes("body") || args.includes("bodyOptional")) entries.push("body");
  if (args.includes("sync")) entries.push("sync");
  if (args.includes("query")) entries.push("...query");
  if (args.includes("idempotencyKey")) entries.push("idempotencyKey");
  return `{ ${entries.join(", ")} }`;
}

function callArgsFor(args) {
  return ["this", ...args.map((arg) => {
    if (arg === "body" || arg === "bodyOptional") return "body";
    return arg;
  })].join(", ");
}

function queryObjectFor(operation) {
  if (!operation.queryParams.length) return "{}";
  const entries = operation.queryParams.map((param) => `${JSON.stringify(param.name)}: input.${safeProp(param.name)}`);
  return `{ ${entries.join(", ")} }`;
}

function responseTypeFor(operation) {
  const types = operation.responses.map((response) => response.type).filter(Boolean);
  if (!types.length) return "void";
  return [...new Set(types)].map((type) => `models.${type}`).join(" | ");
}

function hasIdempotency(operation) {
  return operation.headerParams.some((param) => param.name.toLowerCase() === "idempotency-key");
}

function schemaToType(schema, allSchemas, depth = 0) {
  if (!schema || depth > 30) return "unknown";
  if (schema.$ref) return refName(schema) ?? "unknown";
  if (schema.oneOf || schema.anyOf) return (schema.oneOf ?? schema.anyOf).map((item) => schemaToType(item, allSchemas, depth + 1)).join(" | ") || "unknown";
  if (schema.allOf) return schema.allOf.map((item) => `(${schemaToType(item, allSchemas, depth + 1)})`).join(" & ") || "unknown";
  if (schema.nullable) return `${schemaToType({ ...schema, nullable: false }, allSchemas, depth + 1)} | null`;
  if (schema.enum) return schema.enum.map((value) => JSON.stringify(value)).join(" | ") || "unknown";
  if (schema.const !== undefined) return JSON.stringify(schema.const);
  if (Array.isArray(schema.type)) return schema.type.map((type) => schemaToType({ ...schema, type }, allSchemas, depth + 1)).join(" | ");
  if (schema.type === "array") return `${schemaToType(schema.items, allSchemas, depth + 1)}[]`;
  if (schema.type === "integer" || schema.type === "number") return "number";
  if (schema.type === "string") return "string";
  if (schema.type === "boolean") return "boolean";
  if (schema.type === "object" || schema.properties || schema.additionalProperties !== undefined) {
    const props = Object.entries(schema.properties ?? {});
    const required = new Set(schema.required ?? []);
    const fields = props.map(([key, value]) => `  ${JSON.stringify(key)}${required.has(key) ? "" : "?"}: ${schemaToType(value, allSchemas, depth + 1)};`);
    if (schema.additionalProperties === true) fields.push("  [key: string]: unknown;");
    if (typeof schema.additionalProperties === "object") fields.push(`  [key: string]: ${schemaToType(schema.additionalProperties, allSchemas, depth + 1)};`);
    return fields.length ? `{\n${fields.join("\n")}\n}` : "Record<string, unknown>";
  }
  return "unknown";
}

function schemaToZod(schema, direction, depth = 0) {
  if (!schema || depth > 30) return "z.unknown()";
  if (schema.$ref) return `z.lazy(() => ${refName(schema)}$${direction}Schema)`;
  if (schema.oneOf || schema.anyOf) {
    const items = (schema.oneOf ?? schema.anyOf).map((item) => schemaToZod(item, direction, depth + 1));
    if (items.length === 0) return "z.unknown()";
    if (items.length === 1) return items[0];
    return `z.union([${items.join(", ")}])`;
  }
  if (schema.allOf) {
    const items = schema.allOf.map((item) => schemaToZod(item, direction, depth + 1));
    if (items.length === 0) return "z.unknown()";
    return items.reduce((acc, item) => `z.intersection(${acc}, ${item})`);
  }
  if (schema.nullable) return `z.nullable(${schemaToZod({ ...schema, nullable: false }, direction, depth + 1)})`;
  if (schema.enum) {
    if (schema.enum.every((value) => typeof value === "string") && schema.enum.length > 0) {
      return `z.enum(${JSON.stringify(schema.enum)})`;
    }
    const literals = schema.enum.map((value) => `z.literal(${JSON.stringify(value)})`);
    if (literals.length === 1) return literals[0];
    return `z.union([${literals.join(", ")}])`;
  }
  if (schema.const !== undefined) return `z.literal(${JSON.stringify(schema.const)})`;
  if (Array.isArray(schema.type)) {
    const items = schema.type.map((type) => schemaToZod({ ...schema, type }, direction, depth + 1));
    if (items.length === 1) return items[0];
    return `z.union([${items.join(", ")}])`;
  }
  if (schema.type === "array") return `z.array(${schemaToZod(schema.items, direction, depth + 1)})`;
  if (schema.type === "integer") return "z.number().int()";
  if (schema.type === "number") return "z.number()";
  if (schema.type === "string") return "z.string()";
  if (schema.type === "boolean") return "z.boolean()";
  if (schema.type === "object" || schema.properties || schema.additionalProperties !== undefined) {
    const props = Object.entries(schema.properties ?? {});
    if (!props.length && schema.additionalProperties) {
      const valueSchema = schema.additionalProperties === true ? "z.unknown()" : schemaToZod(schema.additionalProperties, direction, depth + 1);
      return `z.record(z.string(), ${valueSchema})`;
    }
    const required = new Set(schema.required ?? []);
    const fields = props.map(([key, value]) => {
      const propSchema = schemaToZod(value, direction, depth + 1);
      return `  ${JSON.stringify(key)}: ${required.has(key) ? propSchema : `z.optional(${propSchema})`},`;
    });
    let objectSchema = `z.object({\n${fields.join("\n")}\n})`;
    if (schema.additionalProperties === true) objectSchema += ".catchall(z.unknown())";
    if (typeof schema.additionalProperties === "object") objectSchema += `.catchall(${schemaToZod(schema.additionalProperties, direction, depth + 1)})`;
    return objectSchema;
  }
  return "z.unknown()";
}

function collectRefs(schema, refs = new Set()) {
  if (!schema || typeof schema !== "object") return refs;
  if (schema.$ref) refs.add(refName(schema));
  for (const value of Object.values(schema)) {
    if (Array.isArray(value)) value.forEach((item) => collectRefs(item, refs));
    else if (value && typeof value === "object") collectRefs(value, refs);
  }
  return refs;
}

function refName(schema) {
  const ref = schema?.$ref;
  return typeof ref === "string" ? ref.split("/").at(-1) : undefined;
}

function safeProp(name) {
  return /^[a-zA-Z_$][\w$]*$/.test(name) ? name : JSON.stringify(name);
}

function pascal(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function camel(value) {
  const p = pascal(value);
  return p.charAt(0).toLowerCase() + p.slice(1);
}

function kebab(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function generatedHeader() {
  return [
    "/*",
    " * Code generated by The Hog SDK generator. DO NOT EDIT.",
    " */",
    "",
  ].join("\n");
}

function readFlag(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
