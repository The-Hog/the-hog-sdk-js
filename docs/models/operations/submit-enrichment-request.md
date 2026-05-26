# SubmitEnrichmentRequest

## Example Usage

```typescript
import { SubmitEnrichmentRequest } from "@the-hog/sdk/models/operations";

let value: SubmitEnrichmentRequest = {
  body: {
    fields: [
      "contact.email",
      "signals",
    ],
  },
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `idempotencyKey`                                                         | *string*                                                                 | :heavy_minus_sign:                                                       | Prevents duplicate work if you retry the same request with the same key. |
| `body`                                                                   | [models.PostEnrichmentDto](../../models/post-enrichment-dto.md)          | :heavy_check_mark:                                                       | N/A                                                                      |