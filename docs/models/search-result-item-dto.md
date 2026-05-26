# SearchResultItemDto

## Example Usage

```typescript
import { SearchResultItemDto } from "@the-hog/sdk/models";

let value: SearchResultItemDto = {
  url: "https://nervous-charlatan.name",
  title: "<value>",
};
```

## Fields

| Field                                                       | Type                                                        | Required                                                    | Description                                                 |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `url`                                                       | *string*                                                    | :heavy_check_mark:                                          | Result URL                                                  |
| `title`                                                     | *string*                                                    | :heavy_check_mark:                                          | Result title                                                |
| `content`                                                   | *string*                                                    | :heavy_minus_sign:                                          | Content snippet or post text                                |
| `publishedAt`                                               | *string*                                                    | :heavy_minus_sign:                                          | Published date (ISO)                                        |
| `authorName`                                                | *string*                                                    | :heavy_minus_sign:                                          | Author name (LinkedIn)                                      |
| `authorHeadline`                                            | *string*                                                    | :heavy_minus_sign:                                          | Author headline (LinkedIn)                                  |
| `id`                                                        | *string*                                                    | :heavy_minus_sign:                                          | Source-native stable entity ID, when available              |
| `platformVideoId`                                           | *string*                                                    | :heavy_minus_sign:                                          | Source-native stable post/video/activity ID, when available |
| `postUrl`                                                   | *string*                                                    | :heavy_minus_sign:                                          | Source-native canonical post URL, when available            |
| `authorUsername`                                            | *string*                                                    | :heavy_minus_sign:                                          | Author handle or username, when available                   |