# SearchLinkedInKeywordPostsResponseBody

LinkedIn posts matching a keyword.

## Example Usage

```typescript
import { SearchLinkedInKeywordPostsResponseBody } from "@the-hog/sdk/models/operations";

let value: SearchLinkedInKeywordPostsResponseBody = {
  data: [
    {
      activityId: "<id>",
      text: "<value>",
    },
  ],
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                           | Type                                                                            | Required                                                                        | Description                                                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `data`                                                                          | [models.LinkedInPostResponseDto](../../models/linked-in-post-response-dto.md)[] | :heavy_check_mark:                                                              | N/A                                                                             |
| `meta`                                                                          | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)        | :heavy_check_mark:                                                              | N/A                                                                             |