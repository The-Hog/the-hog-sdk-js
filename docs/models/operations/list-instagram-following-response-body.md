# ListInstagramFollowingResponseBody

Instagram following.

## Example Usage

```typescript
import { ListInstagramFollowingResponseBody } from "@the-hog/sdk/models/operations";

let value: ListInstagramFollowingResponseBody = {
  data: {
    username: "Kaia_Larson",
    relationType: "followers",
    edges: [
      {
        relationType: "following",
        seedUsername: "<value>",
        follower: {
          username: "Brigitte39",
        },
        following: {
          username: "Wilmer95",
        },
      },
    ],
    returnedCount: 751.08,
  },
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                                           | Type                                                                                            | Required                                                                                        | Description                                                                                     |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `data`                                                                                          | [models.InstagramFollowScrapeResponseDto](../../models/instagram-follow-scrape-response-dto.md) | :heavy_check_mark:                                                                              | N/A                                                                                             |
| `meta`                                                                                          | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)                        | :heavy_check_mark:                                                                              | N/A                                                                                             |