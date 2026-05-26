# LinkedInProfilePostsResponseDto

## Example Usage

```typescript
import { LinkedInProfilePostsResponseDto } from "@the-hog/sdk/models";

let value: LinkedInProfilePostsResponseDto = {
  username: "Joaquin4",
  posts: [],
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `username`                                                                   | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `posts`                                                                      | [models.LinkedInPostResponseDto](../models/linked-in-post-response-dto.md)[] | :heavy_check_mark:                                                           | N/A                                                                          |
| `bio`                                                                        | *string*                                                                     | :heavy_minus_sign:                                                           | N/A                                                                          |
| `author`                                                                     | [models.Author](../models/author.md)                                         | :heavy_minus_sign:                                                           | N/A                                                                          |