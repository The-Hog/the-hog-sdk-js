# ScrapeWebPageResponseBody

Scraped web page content.

## Example Usage

```typescript
import { ScrapeWebPageResponseBody } from "@the-hog/sdk/models/operations";

let value: ScrapeWebPageResponseBody = {
  data: {
    url: "https://uncommon-co-producer.biz",
    text: "<value>",
  },
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `data`                                                                   | [models.WebScrapeResponseDto](../../models/web-scrape-response-dto.md)   | :heavy_check_mark:                                                       | N/A                                                                      |
| `meta`                                                                   | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md) | :heavy_check_mark:                                                       | N/A                                                                      |