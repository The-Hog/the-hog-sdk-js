# InstagramFollowEdgeResponseDto

## Example Usage

```typescript
import { InstagramFollowEdgeResponseDto } from "@the-hog/sdk/models";

let value: InstagramFollowEdgeResponseDto = {
  relationType: "followers",
  seedUsername: "<value>",
  follower: {
    username: "Brigitte39",
  },
  following: {
    username: "Wilmer95",
  },
};
```

## Fields

| Field                                                                                                              | Type                                                                                                               | Required                                                                                                           | Description                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `relationType`                                                                                                     | [models.InstagramFollowEdgeResponseDtoRelationType](../models/instagram-follow-edge-response-dto-relation-type.md) | :heavy_check_mark:                                                                                                 | N/A                                                                                                                |
| `seedUsername`                                                                                                     | *string*                                                                                                           | :heavy_check_mark:                                                                                                 | N/A                                                                                                                |
| `follower`                                                                                                         | [models.InstagramFollowProfileResponseDto](../models/instagram-follow-profile-response-dto.md)                     | :heavy_check_mark:                                                                                                 | N/A                                                                                                                |
| `following`                                                                                                        | [models.InstagramFollowProfileResponseDto](../models/instagram-follow-profile-response-dto.md)                     | :heavy_check_mark:                                                                                                 | N/A                                                                                                                |