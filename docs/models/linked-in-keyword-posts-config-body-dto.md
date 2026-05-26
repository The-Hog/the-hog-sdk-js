# LinkedInKeywordPostsConfigBodyDto

## Example Usage

```typescript
import { LinkedInKeywordPostsConfigBodyDto } from "@the-hog/sdk/models";

let value: LinkedInKeywordPostsConfigBodyDto = {};
```

## Fields

| Field                                                                                                                | Type                                                                                                                 | Required                                                                                                             | Description                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `limit`                                                                                                              | *number*                                                                                                             | :heavy_minus_sign:                                                                                                   | N/A                                                                                                                  |
| `sortBy`                                                                                                             | [models.LinkedInKeywordPostsConfigBodyDtoSortBy](../models/linked-in-keyword-posts-config-body-dto-sort-by.md)       | :heavy_minus_sign:                                                                                                   | N/A                                                                                                                  |
| `dateFilter`                                                                                                         | [models.DateFilter](../models/date-filter.md)                                                                        | :heavy_minus_sign:                                                                                                   | N/A                                                                                                                  |
| `matchMode`                                                                                                          | [models.LinkedInKeywordPostsConfigBodyDtoMatchMode](../models/linked-in-keyword-posts-config-body-dto-match-mode.md) | :heavy_minus_sign:                                                                                                   | Use exact to search the keyword as a quoted phrase, or broad to let LinkedIn match related terms.                    |