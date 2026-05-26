# GetLinkedInProfileResponseBody

LinkedIn profile data.

## Example Usage

```typescript
import { GetLinkedInProfileResponseBody } from "@the-hog/sdk/models/operations";

let value: GetLinkedInProfileResponseBody = {
  data: {
    username: "Darwin80",
  },
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `data`                                                                   | [operations.Data](../../models/operations/data.md)                       | :heavy_check_mark:                                                       | N/A                                                                      |
| `meta`                                                                   | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md) | :heavy_check_mark:                                                       | N/A                                                                      |