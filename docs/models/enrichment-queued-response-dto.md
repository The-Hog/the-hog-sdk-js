# EnrichmentQueuedResponseDto

## Example Usage

```typescript
import { EnrichmentQueuedResponseDto } from "@the-hog/sdk/models";

let value: EnrichmentQueuedResponseDto = {
  id: "<id>",
  operationId: "<id>",
  status: "queued",
  pollUrl: "https://shoddy-wilderness.info",
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `id`                                                                                           | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `operationId`                                                                                  | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `status`                                                                                       | [models.EnrichmentQueuedResponseDtoStatus](../models/enrichment-queued-response-dto-status.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `pollUrl`                                                                                      | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `meta`                                                                                         | [models.PublicResponseMetaDto](../models/public-response-meta-dto.md)                          | :heavy_check_mark:                                                                             | N/A                                                                                            |