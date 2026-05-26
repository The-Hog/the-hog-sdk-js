# MonitorResponseDto

## Example Usage

```typescript
import { MonitorResponseDto } from "@the-hog/sdk/models";

let value: MonitorResponseDto = {
  id: "<id>",
  name: "<value>",
  type: "linkedin_profile",
  status: "paused",
  config: {
    "key": "<value>",
    "key1": "<value>",
  },
  cadenceMinutes: 3069.16,
  lastRunAt: "<value>",
  nextRunAt: "<value>",
  consecutiveFailures: 4072.7,
  createdAt: "1724608903719",
  updatedAt: "1735638705717",
};
```

## Fields

| Field                                                                       | Type                                                                        | Required                                                                    | Description                                                                 |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `id`                                                                        | *string*                                                                    | :heavy_check_mark:                                                          | N/A                                                                         |
| `name`                                                                      | *string*                                                                    | :heavy_check_mark:                                                          | N/A                                                                         |
| `type`                                                                      | [models.MonitorResponseDtoType](../models/monitor-response-dto-type.md)     | :heavy_check_mark:                                                          | N/A                                                                         |
| `status`                                                                    | [models.MonitorResponseDtoStatus](../models/monitor-response-dto-status.md) | :heavy_check_mark:                                                          | N/A                                                                         |
| `config`                                                                    | Record<string, *any*>                                                       | :heavy_check_mark:                                                          | N/A                                                                         |
| `cadenceMinutes`                                                            | *number*                                                                    | :heavy_check_mark:                                                          | N/A                                                                         |
| `lastRunAt`                                                                 | *string*                                                                    | :heavy_check_mark:                                                          | N/A                                                                         |
| `nextRunAt`                                                                 | *string*                                                                    | :heavy_check_mark:                                                          | N/A                                                                         |
| `consecutiveFailures`                                                       | *number*                                                                    | :heavy_check_mark:                                                          | N/A                                                                         |
| `createdAt`                                                                 | *string*                                                                    | :heavy_check_mark:                                                          | N/A                                                                         |
| `updatedAt`                                                                 | *string*                                                                    | :heavy_check_mark:                                                          | N/A                                                                         |