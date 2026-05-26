# SubmitSearchRequest

## Example Usage

```typescript
import { SubmitSearchRequest } from "@the-hog/sdk/models/operations";

let value: SubmitSearchRequest = {
  body: {
    type: "web_search",
    query: "AI startup funding 2026",
    matchAny: [
      "AI startup",
      "machine learning funding",
    ],
    matchAll: [
      "Series A",
      "2026",
    ],
    exclude: [
      "crypto",
      "blockchain",
    ],
    site: "techcrunch.com",
    hashtag: "productanalytics",
    subreddit: "startups",
  },
};
```

## Fields

| Field                                                                                                     | Type                                                                                                      | Required                                                                                                  | Description                                                                                               |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `sync`                                                                                                    | *boolean*                                                                                                 | :heavy_minus_sign:                                                                                        | Set to true to wait briefly for a completed result instead of immediately returning an operation to poll. |
| `idempotencyKey`                                                                                          | *string*                                                                                                  | :heavy_minus_sign:                                                                                        | Prevents duplicate work if you retry the same request with the same key.                                  |
| `body`                                                                                                    | [models.PostSearchDto](../../models/post-search-dto.md)                                                   | :heavy_check_mark:                                                                                        | N/A                                                                                                       |