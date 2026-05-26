# LinkedInProfileReactionResponseDto

## Example Usage

```typescript
import { LinkedInProfileReactionResponseDto } from "@the-hog/sdk/models";

let value: LinkedInProfileReactionResponseDto = {
  profileUrl: "https://puzzled-jury.info/",
  profileUsername: "<value>",
  reactionType: "<value>",
  post: {},
};
```

## Fields

| Field                                                                                                      | Type                                                                                                       | Required                                                                                                   | Description                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                       | *string*                                                                                                   | :heavy_minus_sign:                                                                                         | N/A                                                                                                        |
| `profileUrl`                                                                                               | *string*                                                                                                   | :heavy_check_mark:                                                                                         | N/A                                                                                                        |
| `profileUsername`                                                                                          | *string*                                                                                                   | :heavy_check_mark:                                                                                         | N/A                                                                                                        |
| `reactionType`                                                                                             | *string*                                                                                                   | :heavy_check_mark:                                                                                         | N/A                                                                                                        |
| `reactedAt`                                                                                                | *string*                                                                                                   | :heavy_minus_sign:                                                                                         | N/A                                                                                                        |
| `sourceUrl`                                                                                                | *string*                                                                                                   | :heavy_minus_sign:                                                                                         | N/A                                                                                                        |
| `post`                                                                                                     | [models.LinkedInProfileActivityPostResponseDto](../models/linked-in-profile-activity-post-response-dto.md) | :heavy_check_mark:                                                                                         | N/A                                                                                                        |
| `actor`                                                                                                    | [models.Actor](../models/actor.md)                                                                         | :heavy_minus_sign:                                                                                         | N/A                                                                                                        |