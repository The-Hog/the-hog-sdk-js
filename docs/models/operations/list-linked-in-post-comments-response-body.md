# ListLinkedInPostCommentsResponseBody

LinkedIn post comments.

## Example Usage

```typescript
import { ListLinkedInPostCommentsResponseBody } from "@the-hog/sdk/models/operations";

let value: ListLinkedInPostCommentsResponseBody = {
  data: [],
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `data`                                                                                         | [models.LinkedInPostCommentResponseDto](../../models/linked-in-post-comment-response-dto.md)[] | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `meta`                                                                                         | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)                       | :heavy_check_mark:                                                                             | N/A                                                                                            |