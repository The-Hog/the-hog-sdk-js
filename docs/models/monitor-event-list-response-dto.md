# MonitorEventListResponseDto

## Example Usage

```typescript
import { MonitorEventListResponseDto } from "@the-hog/sdk/models";

let value: MonitorEventListResponseDto = {
  data: [
    {
      id: "<id>",
      monitorId: "<id>",
      dedupKey: "<value>",
      eventType: "<value>",
      eventJson: {
        "key": "<value>",
        "key1": "<value>",
      },
      canonicalPersonId: "<id>",
      canonicalCompanyId: "<id>",
      detectedAt: "<value>",
    },
  ],
  nextCursor: "<value>",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `data`                                                     | [models.MonitorEventDto](../models/monitor-event-dto.md)[] | :heavy_check_mark:                                         | N/A                                                        |
| `nextCursor`                                               | *string*                                                   | :heavy_check_mark:                                         | N/A                                                        |