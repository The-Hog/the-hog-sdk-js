# PlatformWebScrapeDto

## Example Usage

```typescript
import { PlatformWebScrapeDto } from "@the-hog/sdk/models";

let value: PlatformWebScrapeDto = {
  url: "https://example.com/page",
};
```

## Fields

| Field                                                                                                         | Type                                                                                                          | Required                                                                                                      | Description                                                                                                   | Example                                                                                                       |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `url`                                                                                                         | *string*                                                                                                      | :heavy_check_mark:                                                                                            | URL to scrape                                                                                                 | https://example.com/page                                                                                      |
| `renderJs`                                                                                                    | *boolean*                                                                                                     | :heavy_minus_sign:                                                                                            | Render JavaScript before scraping                                                                             |                                                                                                               |
| `maxAgeMs`                                                                                                    | *number*                                                                                                      | :heavy_minus_sign:                                                                                            | Maximum accepted cache age in milliseconds. Use 0 or omit to force a fresh scrape.                            |                                                                                                               |
| `maxAgeDays`                                                                                                  | *number*                                                                                                      | :heavy_minus_sign:                                                                                            | Maximum accepted cache age in days. Use 0 or omit to force a fresh scrape. Ignored when maxAgeMs is provided. |                                                                                                               |