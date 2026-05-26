# ListLinkedInProfilePostsResponseBody

LinkedIn profile posts.

## Example Usage

```typescript
import { ListLinkedInProfilePostsResponseBody } from "@the-hog/sdk/models/operations";

let value: ListLinkedInProfilePostsResponseBody = {
  data: {
    username: "Rachelle_Harvey92",
    posts: [],
  },
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `data`                                                                                         | [models.LinkedInProfilePostsResponseDto](../../models/linked-in-profile-posts-response-dto.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `meta`                                                                                         | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)                       | :heavy_check_mark:                                                                             | N/A                                                                                            |