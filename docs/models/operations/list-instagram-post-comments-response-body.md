# ListInstagramPostCommentsResponseBody

Instagram post comments.

## Example Usage

```typescript
import { ListInstagramPostCommentsResponseBody } from "@the-hog/sdk/models/operations";

let value: ListInstagramPostCommentsResponseBody = {
  data: [],
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `data`                                                                                 | [models.InstagramCommentResponseDto](../../models/instagram-comment-response-dto.md)[] | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `meta`                                                                                 | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)               | :heavy_check_mark:                                                                     | N/A                                                                                    |