import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readdirSync } from "node:fs";
import { createServer } from "node:http";
import test from "node:test";
import { promisify } from "node:util";
import { HTTPClient, TheHog } from "../dist/esm/index.js";
import {
  deepResearchRequestDtoToJSON,
  postCompanySearchDtoToJSON,
  postEnrichmentDtoToJSON,
  postPeopleSearchDtoToJSON,
  postSearchDtoToJSON,
} from "../dist/esm/models/index.js";

const execFileAsync = promisify(execFile);

test("generated SDK covers every public OpenAPI operation", () => {
  const operationIds = [
    "batchScrapeWebPages",
    "createMonitor",
    "crawlWebSite",
    "deleteMonitor",
    "findLinkedInCompanies",
    "getEnrichment",
    "getInstagramPost",
    "getInstagramProfile",
    "getLinkedInCompany",
    "getLinkedInProfile",
    "getMonitor",
    "getOperation",
    "getSearchResult",
    "getTikTokProfile",
    "listInstagramFollowers",
    "listInstagramFollowing",
    "listInstagramPostComments",
    "listInstagramPosts",
    "listLinkedInCompanyPosts",
    "listLinkedInPostComments",
    "listLinkedInPostReactions",
    "listLinkedInProfileComments",
    "listLinkedInProfilePosts",
    "listLinkedInProfileReactions",
    "listMonitorEvents",
    "listMonitors",
    "listSearches",
    "runMonitorNow",
    "scrapeWebPage",
    "searchCompanies",
    "searchLinkedInKeywordPosts",
    "searchPeople",
    "searchWeb",
    "startDeepResearch",
    "submitEnrichment",
    "submitSearch",
    "updateMonitor",
  ];

  const functionFiles = new Set(
    readdirSync(new URL("../src/funcs", import.meta.url))
      .filter((file) => file.endsWith(".ts") && file !== "common.ts")
      .map((file) => file.replace(/\.ts$/, "")),
  );

  assert.equal(operationIds.length, 37);
  assert.equal(functionFiles.size, 37);
  for (const operationId of operationIds) {
    assert.equal(functionFiles.has(kebab(operationId)), true, operationId);
  }
});

test("curated resource methods exist", () => {
  const client = new TheHog();

  assert.equal(typeof client.companies.search, "function");
  assert.equal(typeof client.people.search, "function");
  assert.equal(typeof client.deepResearch.start, "function");
  assert.equal(typeof client.operations.wait, "function");
  assert.equal(typeof client.scrapers.web.batchScrape, "function");
});

test("supports top-level accessKey and secretKey constructor options", async () => {
  const requests = [];
  const client = new TheHog({
    accessKey: "ak_test",
    secretKey: "sk_test",
    httpClient: createMockHttpClient(async (request) => {
      requests.push(request);
      return jsonResponse({
        id: "search_123",
        operationId: "op_123",
        status: "queued",
        pollUrl: "/api/operations/op_123",
      }, 202);
    }),
  });

  await client.companies.search({ query: "AI companies" });

  assert.equal(requests.length, 1);
  assert.equal(requests[0].headers.get("X-Access-Key"), "ak_test");
  assert.equal(requests[0].headers.get("X-Secret-Key"), "sk_test");
  assert.equal(new URL(requests[0].url).pathname, "/api/v1/companies/search");
});

test("sends idempotency keys on write operations", async () => {
  const requests = [];
  const client = new TheHog({
    accessKey: "ak_test",
    secretKey: "sk_test",
    httpClient: createMockHttpClient(async (request) => {
      requests.push(request);
      return jsonResponse({
        id: "search_123",
        operationId: "op_123",
        status: "queued",
        pollUrl: "/api/operations/op_123",
      }, 202);
    }),
  });

  await client.companies.search({ query: "AI companies" }, "idem_123");

  assert.equal(requests[0].headers.get("Idempotency-Key"), "idem_123");
});

test("serializes array query params", async () => {
  const requests = [];
  const client = new TheHog({
    accessKey: "ak_test",
    secretKey: "sk_test",
    httpClient: createMockHttpClient(async (request) => {
      requests.push(request);
      return jsonResponse({ data: [], next_cursor: null });
    }),
  });

  await client.monitors.list({ status: ["active", "paused"], limit: 2 });

  const url = new URL(requests[0].url);
  assert.deepEqual(url.searchParams.getAll("status"), ["active", "paused"]);
  assert.equal(url.searchParams.get("limit"), "2");
});

test("request validation rejects invalid SDK input before HTTP calls", async () => {
  let calls = 0;
  const client = new TheHog({
    accessKey: "ak_test",
    secretKey: "sk_test",
    httpClient: createMockHttpClient(async () => {
      calls += 1;
      return jsonResponse({});
    }),
  });

  await assert.rejects(
    () => client.companies.search({}),
    /Failed to validate searchCompanies input/,
  );
  assert.equal(calls, 0);
});

test("response validation rejects invalid API responses", async () => {
  const client = new TheHog({
    accessKey: "ak_test",
    secretKey: "sk_test",
    httpClient: createMockHttpClient(async () => jsonResponse({}, 202)),
  });

  await assert.rejects(
    () => client.companies.search({ query: "AI companies" }),
    /Response validation failed/,
  );
});

test("API errors expose status, body, response, and request ID", async () => {
  const client = new TheHog({
    accessKey: "ak_test",
    secretKey: "sk_test",
    httpClient: createMockHttpClient(async () =>
      jsonResponse({ message: "nope" }, 401, { "x-request-id": "req_123" })
    ),
  });

  await assert.rejects(
    async () => {
      await client.companies.search({ query: "AI companies" });
    },
    (error) => {
      assert.equal(error.status, 401);
      assert.equal(error.requestId, "req_123");
      assert.deepEqual(error.body, { message: "nope" });
      assert.equal(error.response.status, 401);
      return true;
    },
  );
});

test("operations.wait polls until success", async () => {
  const statuses = ["queued", "processing", "succeeded"];
  const client = new TheHog({
    accessKey: "ak_test",
    secretKey: "sk_test",
    httpClient: createMockHttpClient(async () =>
      jsonResponse({
        id: "op_123",
        status: statuses.shift(),
        result: statuses.length === 0 ? { companies: [] } : null,
      })
    ),
  });

  const operation = await client.operations.wait("op_123", {
    intervalMs: 0,
    timeoutMs: 1000,
  });

  assert.equal(operation.id, "op_123");
  assert.equal(operation.status, "succeeded");
  assert.deepEqual(operation.result, { companies: [] });
});

test("operations.wait accepts queued operation objects with pollUrl", async () => {
  const requests = [];
  const client = new TheHog({
    accessKey: "ak_test",
    secretKey: "sk_test",
    httpClient: createMockHttpClient(async (request) => {
      requests.push(request);
      return jsonResponse({ id: "op_from_poll_url", status: "succeeded" });
    }),
  });

  const operation = await client.operations.wait({
    pollUrl: "https://developer.thehog.ai/api/operations/op_from_poll_url",
  });

  assert.equal(operation.id, "op_from_poll_url");
  assert.equal(new URL(requests[0].url).pathname, "/api/operations/op_from_poll_url");
});

test("operations.wait rejects failed operations", async () => {
  const client = new TheHog({
    accessKey: "ak_test",
    secretKey: "sk_test",
    httpClient: createMockHttpClient(async () =>
      jsonResponse({ id: "op_failed", status: "failed" })
    ),
  });

  await assert.rejects(
    () => client.operations.wait("op_failed", { intervalMs: 0 }),
    /Operation op_failed ended with status failed/,
  );
});

test("request serializers do not emit legacy project body fields", () => {
  const legacyCamel = ["project", "Id"].join("");
  const legacySnake = ["project", "id"].join("_");
  const payloads = [
    postCompanySearchDtoToJSON({ query: "AI companies", [legacyCamel]: "proj_1" }),
    postPeopleSearchDtoToJSON({ query: "VP Engineering", [legacyCamel]: "proj_1" }),
    postEnrichmentDtoToJSON({
      fields: ["contact.email"],
      [legacyCamel]: "proj_1",
    }),
    deepResearchRequestDtoToJSON({
      prompt: "Research AI CRM competitors",
      schema: { type: "object" },
      [legacyCamel]: "proj_1",
    }),
    postSearchDtoToJSON({
      type: "web_search",
      query: "AI startup funding",
      [legacyCamel]: "proj_1",
    }),
  ];

  for (const payload of payloads) {
    assert.equal(JSON.parse(payload)[legacyCamel], undefined);
    assert.equal(JSON.parse(payload)[legacySnake], undefined);
  }
});

test("cli prints help", async () => {
  const { stdout } = await execCli(["--help"]);

  assert.match(stdout, /the-hog/);
  assert.match(stdout, /operations wait/);
});

test("cli auth status reports configured environment", async () => {
  const { stdout } = await execCli(["auth", "status"], {
    THE_HOG_ACCESS_KEY: "ak_test",
    THE_HOG_SECRET_KEY: "sk_test",
    THE_HOG_SERVER_URL: "http://127.0.0.1:9999",
  });

  assert.deepEqual(JSON.parse(stdout), {
    accessKey: true,
    secretKey: true,
    serverURL: "http://127.0.0.1:9999",
  });
});

test("cli operations wait polls mocked API until success", async () => {
  let attempts = 0;
  const server = createServer((request, response) => {
    attempts += 1;
    assert.equal(request.headers["x-access-key"], "ak_test");
    assert.equal(request.headers["x-secret-key"], "sk_test");
    assert.equal(request.url, "/api/operations/op_cli");

    response.setHeader("content-type", "application/json");
    response.end(JSON.stringify({
      id: "op_cli",
      status: attempts === 1 ? "queued" : "succeeded",
      result: attempts === 1 ? null : { ok: true },
    }));
  });

  const serverURL = await listen(server);
  try {
    const { stdout } = await execCli([
      "operations",
      "wait",
      "op_cli",
      "--interval-ms",
      "0",
      "--timeout-ms",
      "1000",
    ], {
      THE_HOG_ACCESS_KEY: "ak_test",
      THE_HOG_SECRET_KEY: "sk_test",
      THE_HOG_SERVER_URL: serverURL,
    });

    assert.equal(attempts, 2);
    assert.deepEqual(JSON.parse(stdout), {
      id: "op_cli",
      status: "succeeded",
      result: { ok: true },
    });
  } finally {
    await close(server);
  }
});

function createMockHttpClient(handler) {
  return new HTTPClient({
    fetcher: async (input) => handler(input instanceof Request ? input : new Request(input)),
  });
}

function jsonResponse(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

async function execCli(args, env = {}) {
  return execFileAsync(process.execPath, ["dist/esm/cli/index.js", ...args], {
    env: {
      ...process.env,
      ...env,
    },
    cwd: new URL("..", import.meta.url),
  });
}

async function listen(server) {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.equal(typeof address, "object");
  assert.notEqual(address, null);
  return `http://127.0.0.1:${address.port}`;
}

async function close(server) {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function kebab(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}
