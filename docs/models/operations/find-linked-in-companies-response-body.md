# FindLinkedInCompaniesResponseBody

LinkedIn company URLs found from domains or URLs.

## Example Usage

```typescript
import { FindLinkedInCompaniesResponseBody } from "@the-hog/sdk/models/operations";

let value: FindLinkedInCompaniesResponseBody = {
  data: [
    {},
  ],
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                               | Type                                                                                | Required                                                                            | Description                                                                         |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `data`                                                                              | [models.LinkedInFinderResponseDto](../../models/linked-in-finder-response-dto.md)[] | :heavy_check_mark:                                                                  | N/A                                                                                 |
| `meta`                                                                              | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)            | :heavy_check_mark:                                                                  | N/A                                                                                 |