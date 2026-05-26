# SearchResultDto

## Example Usage

```typescript
import { SearchResultDto } from "@the-hog/sdk/models";

let value: SearchResultDto = {
  id: "<id>",
  status: "succeeded",
  type: "linkedin_keyword",
  query: "<value>",
  createdAt: "1723915593420",
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `id`                                                                  | *string*                                                              | :heavy_check_mark:                                                    | Unique search result ID                                               |
| `status`                                                              | [models.SearchResultDtoStatus](../models/search-result-dto-status.md) | :heavy_check_mark:                                                    | Current status                                                        |
| `type`                                                                | [models.SearchResultDtoType](../models/search-result-dto-type.md)     | :heavy_check_mark:                                                    | Search type                                                           |
| `query`                                                               | *string*                                                              | :heavy_check_mark:                                                    | Original query                                                        |
| `pollUrl`                                                             | *string*                                                              | :heavy_minus_sign:                                                    | URL to poll for result                                                |
| `results`                                                             | [models.SearchResultItemDto](../models/search-result-item-dto.md)[]   | :heavy_minus_sign:                                                    | Search results array                                                  |
| `totalResults`                                                        | *number*                                                              | :heavy_minus_sign:                                                    | Total results found                                                   |
| `error`                                                               | [models.ErrorT](../models/error-t.md)                                 | :heavy_minus_sign:                                                    | Error details when failed                                             |
| `createdAt`                                                           | *string*                                                              | :heavy_check_mark:                                                    | ISO timestamp of creation                                             |
| `completedAt`                                                         | *string*                                                              | :heavy_minus_sign:                                                    | ISO timestamp of completion                                           |