# MonitorEventDto

## Example Usage

```typescript
import { MonitorEventDto } from "@the-hog/sdk/models";

let value: MonitorEventDto = {
  id: "<id>",
  monitorId: "<id>",
  dedupKey: "<value>",
  eventType: "<value>",
  eventJson: {
    "key": "<value>",
    "key1": "<value>",
    "key2": "<value>",
  },
  canonicalPersonId: "<id>",
  canonicalCompanyId: "<id>",
  detectedAt: "<value>",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `id`                  | *string*              | :heavy_check_mark:    | N/A                   |
| `monitorId`           | *string*              | :heavy_check_mark:    | N/A                   |
| `dedupKey`            | *string*              | :heavy_check_mark:    | N/A                   |
| `eventType`           | *string*              | :heavy_check_mark:    | N/A                   |
| `eventJson`           | Record<string, *any*> | :heavy_check_mark:    | N/A                   |
| `canonicalPersonId`   | *string*              | :heavy_check_mark:    | N/A                   |
| `canonicalCompanyId`  | *string*              | :heavy_check_mark:    | N/A                   |
| `detectedAt`          | *string*              | :heavy_check_mark:    | N/A                   |