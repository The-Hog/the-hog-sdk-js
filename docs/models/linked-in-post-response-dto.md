# LinkedInPostResponseDto

## Example Usage

```typescript
import { LinkedInPostResponseDto } from "@the-hog/sdk/models";

let value: LinkedInPostResponseDto = {
  activityId: "<id>",
  text: "<value>",
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `activityId`                                  | *string*                                      | :heavy_check_mark:                            | N/A                                           |
| `postUrl`                                     | *string*                                      | :heavy_minus_sign:                            | N/A                                           |
| `text`                                        | *string*                                      | :heavy_check_mark:                            | N/A                                           |
| `postedAt`                                    | *string*                                      | :heavy_minus_sign:                            | N/A                                           |
| `authorName`                                  | *string*                                      | :heavy_minus_sign:                            | N/A                                           |
| `authorHeadline`                              | *string*                                      | :heavy_minus_sign:                            | N/A                                           |
| `authorProfileUrl`                            | *string*                                      | :heavy_minus_sign:                            | N/A                                           |
| `authorProfileUsername`                       | *string*                                      | :heavy_minus_sign:                            | N/A                                           |
| `totalReactions`                              | *number*                                      | :heavy_minus_sign:                            | N/A                                           |
| `commentsCount`                               | *number*                                      | :heavy_minus_sign:                            | N/A                                           |
| `repostsCount`                                | *number*                                      | :heavy_minus_sign:                            | N/A                                           |
| `isReshare`                                   | *boolean*                                     | :heavy_minus_sign:                            | N/A                                           |
| `repostedBy`                                  | [models.RepostedBy](../models/reposted-by.md) | :heavy_minus_sign:                            | N/A                                           |
| `contentType`                                 | *string*                                      | :heavy_minus_sign:                            | N/A                                           |
| `contentData`                                 | Record<string, *any*>                         | :heavy_minus_sign:                            | N/A                                           |
| `hashtags`                                    | *string*[]                                    | :heavy_minus_sign:                            | N/A                                           |