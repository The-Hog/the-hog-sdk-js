# EnrichmentSyncResponseDto

## Example Usage

```typescript
import { EnrichmentSyncResponseDto } from "@the-hog/sdk/models";

let value: EnrichmentSyncResponseDto = {
  data: {
    "key": "<value>",
    "key1": "<value>",
  },
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `data`                                                                | Record<string, *any*>                                                 | :heavy_check_mark:                                                    | N/A                                                                   |
| `meta`                                                                | [models.PublicResponseMetaDto](../models/public-response-meta-dto.md) | :heavy_check_mark:                                                    | N/A                                                                   |