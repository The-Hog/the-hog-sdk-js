# ListLinkedInCompanyPostsResponseBody

LinkedIn company posts.

## Example Usage

```typescript
import { ListLinkedInCompanyPostsResponseBody } from "@the-hog/sdk/models/operations";

let value: ListLinkedInCompanyPostsResponseBody = {
  data: {
    companySlug: "<value>",
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
| `data`                                                                                         | [models.LinkedInCompanyPostsResponseDto](../../models/linked-in-company-posts-response-dto.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `meta`                                                                                         | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)                       | :heavy_check_mark:                                                                             | N/A                                                                                            |