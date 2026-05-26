# LinkedInPostReactionResponseDto

## Example Usage

```typescript
import { LinkedInPostReactionResponseDto } from "@the-hog/sdk/models";

let value: LinkedInPostReactionResponseDto = {
  id: "<id>",
  reactionType: "<value>",
  postId: "<id>",
  actor: {
    id: "<id>",
    name: "<value>",
    linkedinUrl: "https://rich-interviewer.com",
    position: "<value>",
  },
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `reactionType`                                                                                | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `postId`                                                                                      | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `actor`                                                                                       | [models.LinkedInReactionActorResponseDto](../models/linked-in-reaction-actor-response-dto.md) | :heavy_check_mark:                                                                            | N/A                                                                                           |