# DeepResearchQueuedResponseDto

## Example Usage

```typescript
import { DeepResearchQueuedResponseDto } from "@the-hog/sdk/models";

let value: DeepResearchQueuedResponseDto = {
  id: "<id>",
  operationId: "<id>",
  status: "queued",
  pollUrl: "https://dull-flame.name/",
};
```

## Fields

| Field                                                                                               | Type                                                                                                | Required                                                                                            | Description                                                                                         |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `id`                                                                                                | *string*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |
| `operationId`                                                                                       | *string*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |
| `status`                                                                                            | [models.DeepResearchQueuedResponseDtoStatus](../models/deep-research-queued-response-dto-status.md) | :heavy_check_mark:                                                                                  | N/A                                                                                                 |
| `pollUrl`                                                                                           | *string*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |
| `meta`                                                                                              | [models.DeepResearchAcceptedMetaDto](../models/deep-research-accepted-meta-dto.md)                  | :heavy_minus_sign:                                                                                  | N/A                                                                                                 |