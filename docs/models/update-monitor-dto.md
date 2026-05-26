# UpdateMonitorDto

## Example Usage

```typescript
import { UpdateMonitorDto } from "@the-hog/sdk/models";

let value: UpdateMonitorDto = {};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `name`                                                                  | *string*                                                                | :heavy_minus_sign:                                                      | N/A                                                                     |
| `config`                                                                | [models.UpdateMonitorDtoConfig](../models/update-monitor-dto-config.md) | :heavy_minus_sign:                                                      | N/A                                                                     |
| `cadenceMinutes`                                                        | *number*                                                                | :heavy_minus_sign:                                                      | N/A                                                                     |
| `maxResults`                                                            | *number*                                                                | :heavy_minus_sign:                                                      | N/A                                                                     |
| `forceFresh`                                                            | *boolean*                                                               | :heavy_minus_sign:                                                      | N/A                                                                     |
| `cacheTtlDays`                                                          | *number*                                                                | :heavy_minus_sign:                                                      | N/A                                                                     |
| `status`                                                                | [models.UpdateMonitorDtoStatus](../models/update-monitor-dto-status.md) | :heavy_minus_sign:                                                      | Only active and paused are user-settable                                |