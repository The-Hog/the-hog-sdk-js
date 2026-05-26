# TikTokProfileScrapeResponseDto

## Example Usage

```typescript
import { TikTokProfileScrapeResponseDto } from "@the-hog/sdk/models";

let value: TikTokProfileScrapeResponseDto = {
  profile: null,
  videos: [],
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `profile`                                                                  | [models.Profile](../models/profile.md)                                     | :heavy_check_mark:                                                         | N/A                                                                        |
| `videos`                                                                   | [models.TikTokVideoResponseDto](../models/tik-tok-video-response-dto.md)[] | :heavy_check_mark:                                                         | N/A                                                                        |