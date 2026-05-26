# ListLinkedInProfileCommentsResponseBody

LinkedIn profile comments.

## Example Usage

```typescript
import { ListLinkedInProfileCommentsResponseBody } from "@the-hog/sdk/models/operations";

let value: ListLinkedInProfileCommentsResponseBody = {
  data: [],
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `data`                                                                                               | [models.LinkedInProfileCommentResponseDto](../../models/linked-in-profile-comment-response-dto.md)[] | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `meta`                                                                                               | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |