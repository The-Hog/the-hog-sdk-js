# EntitySearchAcceptedPublicDto

## Example Usage

```typescript
import { EntitySearchAcceptedPublicDto } from "@the-hog/sdk/models";

let value: EntitySearchAcceptedPublicDto = {
  id: "<id>",
  operationId: "<id>",
  status: "queued",
  pollUrl: "https://hateful-dream.biz",
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `id`                                 | *string*                             | :heavy_check_mark:                   | N/A                                  |
| `operationId`                        | *string*                             | :heavy_check_mark:                   | N/A                                  |
| `status`                             | [models.Status](../models/status.md) | :heavy_check_mark:                   | N/A                                  |
| `pollUrl`                            | *string*                             | :heavy_check_mark:                   | N/A                                  |