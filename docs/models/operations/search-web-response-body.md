# SearchWebResponseBody

Successful response.

## Example Usage

```typescript
import { SearchWebResponseBody } from "@the-hog/sdk/models/operations";

let value: SearchWebResponseBody = {
  data: {
    query: "<value>",
    results: [
      {
        url: "https://metallic-developing.net",
        title: "<value>",
      },
    ],
  },
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `data`                                                                   | [models.WebSearchResponseDto](../../models/web-search-response-dto.md)   | :heavy_check_mark:                                                       | N/A                                                                      |
| `meta`                                                                   | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md) | :heavy_check_mark:                                                       | N/A                                                                      |