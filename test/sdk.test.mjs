import assert from "node:assert/strict";
import { execFile } from "node:child_process";
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
  const payloads = [
    postCompanySearchDtoToJSON({ query: "AI companies", projectId: "proj_1" }),
    postPeopleSearchDtoToJSON({ query: "VP Engineering", projectId: "proj_1" }),
    postEnrichmentDtoToJSON({
      fields: ["contact.email"],
      projectId: "proj_1",
    }),
    deepResearchRequestDtoToJSON({
      prompt: "Research AI CRM competitors",
      schema: { type: "object" },
      projectId: "proj_1",
    }),
    postSearchDtoToJSON({
      type: "web_search",
      query: "AI startup funding",
      projectId: "proj_1",
    }),
  ];

  for (const payload of payloads) {
    assert.equal(JSON.parse(payload).projectId, undefined);
    assert.equal(JSON.parse(payload).project_id, undefined);
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

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
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
