# LinkedInProfileCommentResponseDto

## Example Usage

```typescript
import { LinkedInProfileCommentResponseDto } from "@the-hog/sdk/models";

let value: LinkedInProfileCommentResponseDto = {
  profileUrl: "https://unripe-vestment.net/",
  profileUsername: "<value>",
  commentText: "<value>",
  post: {},
};
```

## Fields

| Field                                                                                                      | Type                                                                                                       | Required                                                                                                   | Description                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                       | *string*                                                                                                   | :heavy_minus_sign:                                                                                         | N/A                                                                                                        |
| `profileUrl`                                                                                               | *string*                                                                                                   | :heavy_check_mark:                                                                                         | N/A                                                                                                        |
| `profileUsername`                                                                                          | *string*                                                                                                   | :heavy_check_mark:                                                                                         | N/A                                                                                                        |
| `commentText`                                                                                              | *string*                                                                                                   | :heavy_check_mark:                                                                                         | N/A                                                                                                        |
| `commentedAt`                                                                                              | *string*                                                                                                   | :heavy_minus_sign:                                                                                         | N/A                                                                                                        |
| `sourceUrl`                                                                                                | *string*                                                                                                   | :heavy_minus_sign:                                                                                         | N/A                                                                                                        |
| `post`                                                                                                     | [models.LinkedInProfileActivityPostResponseDto](../models/linked-in-profile-activity-post-response-dto.md) | :heavy_check_mark:                                                                                         | N/A                                                                                                        |
| `actor`                                                                                                    | [models.LinkedInProfileCommentResponseDtoActor](../models/linked-in-profile-comment-response-dto-actor.md) | :heavy_minus_sign:                                                                                         | N/A                                                                                                        |