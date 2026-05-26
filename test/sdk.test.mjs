import assert from "node:assert/strict";
import test from "node:test";
import { HTTPClient, TheHog } from "../dist/esm/index.js";
import {
  deepResearchRequestDtoToJSON,
  postCompanySearchDtoToJSON,
  postEnrichmentDtoToJSON,
  postPeopleSearchDtoToJSON,
  postSearchDtoToJSON,
} from "../dist/esm/models/index.js";

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
