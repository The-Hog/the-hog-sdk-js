# GetTikTokProfileResponseBody

TikTok profile and video data.

## Example Usage

```typescript
import { GetTikTokProfileResponseBody } from "@the-hog/sdk/models/operations";

let value: GetTikTokProfileResponseBody = {
  data: {
    profile: {
      username: "Jaeden45",
    },
    videos: [],
  },
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `data`                                                                                       | [models.TikTokProfileScrapeResponseDto](../../models/tik-tok-profile-scrape-response-dto.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `meta`                                                                                       | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)                     | :heavy_check_mark:                                                                           | N/A                                                                                          |