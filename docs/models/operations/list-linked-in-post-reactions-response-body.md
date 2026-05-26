# ListLinkedInPostReactionsResponseBody

LinkedIn post reactions.

## Example Usage

```typescript
import { ListLinkedInPostReactionsResponseBody } from "@the-hog/sdk/models/operations";

let value: ListLinkedInPostReactionsResponseBody = {
  data: [],
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `data`                                                                                           | [models.LinkedInPostReactionResponseDto](../../models/linked-in-post-reaction-response-dto.md)[] | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `meta`                                                                                           | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)                         | :heavy_check_mark:                                                                               | N/A                                                                                              |