# PostCompanySearchDto

## Example Usage

```typescript
import { PostCompanySearchDto } from "@the-hog/sdk/models";

let value: PostCompanySearchDto = {
  query: "B2B SaaS companies in Austin hiring engineers",
};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             | Example                                                                 |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `query`                                                                 | *string*                                                                | :heavy_check_mark:                                                      | N/A                                                                     | B2B SaaS companies in Austin hiring engineers                           |
| `limit`                                                                 | *number*                                                                | :heavy_minus_sign:                                                      | N/A                                                                     |                                                                         |
| `includeSignals`                                                        | *boolean*                                                               | :heavy_minus_sign:                                                      | N/A                                                                     |                                                                         |
| `filters`                                                               | [models.EntitySearchFiltersDto](../models/entity-search-filters-dto.md) | :heavy_minus_sign:                                                      | N/A                                                                     |                                                                         |
