# LinkedInPostCommentResponseDto

## Example Usage

```typescript
import { LinkedInPostCommentResponseDto } from "@the-hog/sdk/models";

let value: LinkedInPostCommentResponseDto = {
  id: "<id>",
  commentary: "<value>",
  linkedinUrl: "https://profuse-premier.net/",
  createdAt: "1722751368140",
  createdAtTimestamp: 3728.25,
  engagement: {
    likes: 7020.15,
    comments: 6843.81,
    shares: 3214.18,
  },
  postId: "<id>",
  pinned: true,
  edited: true,
  actor: {
    id: "<id>",
    type: "profile",
    name: "<value>",
    linkedinUrl: "https://muddy-academics.biz",
    position: "<value>",
  },
};
```

## Fields

| Field                                                                                                 | Type                                                                                                  | Required                                                                                              | Description                                                                                           |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `id`                                                                                                  | *string*                                                                                              | :heavy_check_mark:                                                                                    | N/A                                                                                                   |
| `commentary`                                                                                          | *string*                                                                                              | :heavy_check_mark:                                                                                    | N/A                                                                                                   |
| `linkedinUrl`                                                                                         | *string*                                                                                              | :heavy_check_mark:                                                                                    | N/A                                                                                                   |
| `createdAt`                                                                                           | *string*                                                                                              | :heavy_check_mark:                                                                                    | N/A                                                                                                   |
| `createdAtTimestamp`                                                                                  | *number*                                                                                              | :heavy_check_mark:                                                                                    | N/A                                                                                                   |
| `engagement`                                                                                          | [models.LinkedInCommentEngagementResponseDto](../models/linked-in-comment-engagement-response-dto.md) | :heavy_check_mark:                                                                                    | N/A                                                                                                   |
| `postId`                                                                                              | *string*                                                                                              | :heavy_check_mark:                                                                                    | N/A                                                                                                   |
| `pinned`                                                                                              | *boolean*                                                                                             | :heavy_check_mark:                                                                                    | N/A                                                                                                   |
| `edited`                                                                                              | *boolean*                                                                                             | :heavy_check_mark:                                                                                    | N/A                                                                                                   |
| `actor`                                                                                               | [models.LinkedInCommentActorResponseDto](../models/linked-in-comment-actor-response-dto.md)           | :heavy_check_mark:                                                                                    | N/A                                                                                                   |
| `replies`                                                                                             | [models.LinkedInPostCommentResponseDto](../models/linked-in-post-comment-response-dto.md)[]           | :heavy_minus_sign:                                                                                    | N/A                                                                                                   |