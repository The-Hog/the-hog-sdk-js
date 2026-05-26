# PlatformWebCrawlDto

## Example Usage

```typescript
import { PlatformWebCrawlDto } from "@the-hog/sdk/models";

let value: PlatformWebCrawlDto = {
  url: "https://example.com",
};
```

## Fields

| Field                               | Type                                | Required                            | Description                         | Example                             |
| ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- |
| `url`                               | *string*                            | :heavy_check_mark:                  | Domain or URL to crawl              | https://example.com                 |
| `limit`                             | *number*                            | :heavy_minus_sign:                  | N/A                                 |                                     |
| `instructions`                      | *string*                            | :heavy_minus_sign:                  | Instructions for content extraction |                                     |