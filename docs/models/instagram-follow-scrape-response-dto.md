# InstagramFollowScrapeResponseDto

## Example Usage

```typescript
import { InstagramFollowScrapeResponseDto } from "@the-hog/sdk/models";

let value: InstagramFollowScrapeResponseDto = {
  username: "Wiley_Von4",
  relationType: "following",
  edges: [],
  returnedCount: 4902.51,
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `username`                                                                                 | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `relationType`                                                                             | [models.RelationType](../models/relation-type.md)                                          | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `edges`                                                                                    | [models.InstagramFollowEdgeResponseDto](../models/instagram-follow-edge-response-dto.md)[] | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `requestedLimit`                                                                           | *number*                                                                                   | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `returnedCount`                                                                            | *number*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |