# GetInstagramPostResponseBody

Instagram post details.

## Example Usage

```typescript
import { GetInstagramPostResponseBody } from "@the-hog/sdk/models/operations";

let value: GetInstagramPostResponseBody = {
  data: {
    shortcode: "<value>",
  },
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                                 | Type                                                                                  | Required                                                                              | Description                                                                           |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `data`                                                                                | [operations.GetInstagramPostData](../../models/operations/get-instagram-post-data.md) | :heavy_check_mark:                                                                    | N/A                                                                                   |
| `meta`                                                                                | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)              | :heavy_check_mark:                                                                    | N/A                                                                                   |