# EntitySearchFiltersDto

## Example Usage

```typescript
import { EntitySearchFiltersDto } from "@the-hog/sdk/models";

let value: EntitySearchFiltersDto = {};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `titles`                                                                             | *string*[]                                                                           | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `titleMatch`                                                                         | [models.TitleMatch](../models/title-match.md)                                        | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `locations`                                                                          | *string*[]                                                                           | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `industries`                                                                         | *string*[]                                                                           | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `employeeCount`                                                                      | [models.EntityEmployeeCountFilterDto](../models/entity-employee-count-filter-dto.md) | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `signals`                                                                            | *string*[]                                                                           | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `company`                                                                            | [models.EntityCompanyNestedFilterDto](../models/entity-company-nested-filter-dto.md) | :heavy_minus_sign:                                                                   | N/A                                                                                  |