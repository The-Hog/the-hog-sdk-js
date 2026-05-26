# GetLinkedInCompanyResponseBody

LinkedIn company data.

## Example Usage

```typescript
import { GetLinkedInCompanyResponseBody } from "@the-hog/sdk/models/operations";

let value: GetLinkedInCompanyResponseBody = {
  data: null,
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `data`                                                                                     | [operations.GetLinkedInCompanyData](../../models/operations/get-linked-in-company-data.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `meta`                                                                                     | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)                   | :heavy_check_mark:                                                                         | N/A                                                                                        |