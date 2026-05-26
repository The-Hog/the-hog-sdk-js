# LinkedInCompanyPostsResponseDto

## Example Usage

```typescript
import { LinkedInCompanyPostsResponseDto } from "@the-hog/sdk/models";

let value: LinkedInCompanyPostsResponseDto = {
  companySlug: "<value>",
  posts: [
    {
      activityId: "<id>",
      text: "<value>",
    },
  ],
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `companySlug`                                                                | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `posts`                                                                      | [models.LinkedInPostResponseDto](../models/linked-in-post-response-dto.md)[] | :heavy_check_mark:                                                           | N/A                                                                          |
| `description`                                                                | *string*                                                                     | :heavy_minus_sign:                                                           | N/A                                                                          |