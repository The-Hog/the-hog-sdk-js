# ListMonitorEventsRequest

## Example Usage

```typescript
import { ListMonitorEventsRequest } from "@the-hog/sdk/models/operations";

let value: ListMonitorEventsRequest = {
  id: "<id>",
};
```

## Fields

| Field                                                       | Type                                                        | Required                                                    | Description                                                 |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `since`                                                     | *any*                                                       | :heavy_minus_sign:                                          | ISO timestamp — only return events detected after this time |
| `limit`                                                     | *number*                                                    | :heavy_minus_sign:                                          | N/A                                                         |
| `cursor`                                                    | *any*                                                       | :heavy_minus_sign:                                          | N/A                                                         |
| `id`                                                        | *string*                                                    | :heavy_check_mark:                                          | Monitor ID.                                                 |