# OperationResponseDto

## Example Usage

```typescript
import { OperationResponseDto } from "@the-hog/sdk/models";

let value: OperationResponseDto = {
  id: "<id>",
  status: "processing",
};
```

## Fields

| Field                                                                           | Type                                                                            | Required                                                                        | Description                                                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `id`                                                                            | *string*                                                                        | :heavy_check_mark:                                                              | N/A                                                                             |
| `status`                                                                        | [models.OperationResponseDtoStatus](../models/operation-response-dto-status.md) | :heavy_check_mark:                                                              | N/A                                                                             |
| `progress`                                                                      | *number*                                                                        | :heavy_minus_sign:                                                              | N/A                                                                             |
| `result`                                                                        | Record<string, *any*>                                                           | :heavy_minus_sign:                                                              | N/A                                                                             |
| `error`                                                                         | Record<string, *any*>                                                           | :heavy_minus_sign:                                                              | N/A                                                                             |