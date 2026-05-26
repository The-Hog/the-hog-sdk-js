# PostPeopleSearchDto

## Example Usage

```typescript
import { PostPeopleSearchDto } from "@the-hog/sdk/models";

let value: PostPeopleSearchDto = {
  query: "VP Engineering at hiring B2B SaaS companies in SF",
};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             | Example                                                                 |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `query`                                                                 | *string*                                                                | :heavy_check_mark:                                                      | N/A                                                                     | VP Engineering at hiring B2B SaaS companies in SF                       |
| `limit`                                                                 | *number*                                                                | :heavy_minus_sign:                                                      | N/A                                                                     |                                                                         |
| `includeSignals`                                                        | *boolean*                                                               | :heavy_minus_sign:                                                      | N/A                                                                     |                                                                         |
| `includeContacts`                                                       | *boolean*                                                               | :heavy_minus_sign:                                                      | N/A                                                                     |                                                                         |
| `filters`                                                               | [models.EntitySearchFiltersDto](../models/entity-search-filters-dto.md) | :heavy_minus_sign:                                                      | N/A                                                                     |                                                                         |
