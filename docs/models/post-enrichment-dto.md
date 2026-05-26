# PostEnrichmentDto

## Example Usage

```typescript
import { PostEnrichmentDto } from "@the-hog/sdk/models";

let value: PostEnrichmentDto = {
  fields: [
    "contact.email",
    "signals",
  ],
};
```

## Fields

| Field                                                                           | Type                                                                            | Required                                                                        | Description                                                                     | Example                                                                         |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `identifier`                                                                    | [models.PersonIdentifierRecordDto](../models/person-identifier-record-dto.md)   | :heavy_minus_sign:                                                              | Single person (mutually exclusive with identifiers)                             |                                                                                 |
| `identifiers`                                                                   | [models.PersonIdentifierRecordDto](../models/person-identifier-record-dto.md)[] | :heavy_minus_sign:                                                              | Batch (max 100); mutually exclusive with identifier                             |                                                                                 |
| `fields`                                                                        | *string*[]                                                                      | :heavy_check_mark:                                                              | N/A                                                                             | [<br/>"contact.email",<br/>"signals"<br/>]                                      |
| `signalsConfig`                                                                 | [models.SignalsConfigDto](../models/signals-config-dto.md)                      | :heavy_minus_sign:                                                              | N/A                                                                             |                                                                                 |
