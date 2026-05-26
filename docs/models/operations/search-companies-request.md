# SearchCompaniesRequest

## Example Usage

```typescript
import { SearchCompaniesRequest } from "@the-hog/sdk/models/operations";

let value: SearchCompaniesRequest = {
  body: {
    query: "B2B SaaS companies in Austin hiring engineers",
  },
};
```

## Fields

| Field                                                                                           | Type                                                                                            | Required                                                                                        | Description                                                                                     |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `idempotencyKey`                                                                                | *string*                                                                                        | :heavy_minus_sign:                                                                              | Optional. Reusing the same key for the same organization returns the existing queued operation. |
| `body`                                                                                          | [models.PostCompanySearchDto](../../models/post-company-search-dto.md)                          | :heavy_check_mark:                                                                              | N/A                                                                                             |