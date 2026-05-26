# CrawlWebSiteResponseBody

Successful response.

## Example Usage

```typescript
import { CrawlWebSiteResponseBody } from "@the-hog/sdk/models/operations";

let value: CrawlWebSiteResponseBody = {
  data: {
    domain: "obedient-account.net",
    pages: [
      {
        url: "https://crooked-government.org/",
        content: "<value>",
      },
    ],
    combinedContent: "<value>",
  },
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `data`                                                                   | [models.WebCrawlResponseDto](../../models/web-crawl-response-dto.md)     | :heavy_check_mark:                                                       | N/A                                                                      |
| `meta`                                                                   | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md) | :heavy_check_mark:                                                       | N/A                                                                      |