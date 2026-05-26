# EntitySearchAcceptedDto

## Example Usage

```typescript
import { EntitySearchAcceptedDto } from "@the-hog/sdk/models";

let value: EntitySearchAcceptedDto = {
  id: "<id>",
  operationId: "<id>",
  status: "queued",
  pollUrl: "https://specific-hyphenation.info",
  meta: {},
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `id`                                                                                   | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `operationId`                                                                          | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `status`                                                                               | [models.EntitySearchAcceptedDtoStatus](../models/entity-search-accepted-dto-status.md) | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `pollUrl`                                                                              | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `meta`                                                                                 | [models.Meta](../models/meta.md)                                                       | :heavy_check_mark:                                                                     | N/A                                                                                    |