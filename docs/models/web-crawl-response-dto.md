# WebCrawlResponseDto

## Example Usage

```typescript
import { WebCrawlResponseDto } from "@the-hog/sdk/models";

let value: WebCrawlResponseDto = {
  domain: "cheap-barge.com",
  pages: [],
  combinedContent: "<value>",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `domain`                                                                     | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `pages`                                                                      | [models.WebCrawlPageResponseDto](../models/web-crawl-page-response-dto.md)[] | :heavy_check_mark:                                                           | N/A                                                                          |
| `combinedContent`                                                            | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |