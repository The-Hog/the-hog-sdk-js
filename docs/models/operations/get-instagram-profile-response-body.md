# GetInstagramProfileResponseBody

Instagram profile data.

## Example Usage

```typescript
import { GetInstagramProfileResponseBody } from "@the-hog/sdk/models/operations";

let value: GetInstagramProfileResponseBody = {
  data: {
    username: "Layla_Considine-Mosciski64",
  },
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                                       | Type                                                                                        | Required                                                                                    | Description                                                                                 |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `data`                                                                                      | [operations.GetInstagramProfileData](../../models/operations/get-instagram-profile-data.md) | :heavy_check_mark:                                                                          | N/A                                                                                         |
| `meta`                                                                                      | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)                    | :heavy_check_mark:                                                                          | N/A                                                                                         |