# ListInstagramPostsResponseBody

Instagram posts.

## Example Usage

```typescript
import { ListInstagramPostsResponseBody } from "@the-hog/sdk/models/operations";

let value: ListInstagramPostsResponseBody = {
  data: [
    {
      shortcode: "<value>",
    },
  ],
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `data`                                                                           | [models.InstagramPostResponseDto](../../models/instagram-post-response-dto.md)[] | :heavy_check_mark:                                                               | N/A                                                                              |
| `meta`                                                                           | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)         | :heavy_check_mark:                                                               | N/A                                                                              |