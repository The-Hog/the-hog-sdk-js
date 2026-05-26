# WebSearchResponseDto

## Example Usage

```typescript
import { WebSearchResponseDto } from "@the-hog/sdk/models";

let value: WebSearchResponseDto = {
  query: "<value>",
  results: [
    {
      url: "https://metallic-developing.net",
      title: "<value>",
    },
  ],
};
```

## Fields

| Field                                                                                       | Type                                                                                        | Required                                                                                    | Description                                                                                 |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `query`                                                                                     | *string*                                                                                    | :heavy_check_mark:                                                                          | N/A                                                                                         |
| `results`                                                                                   | [models.WebSearchResultItemResponseDto](../models/web-search-result-item-response-dto.md)[] | :heavy_check_mark:                                                                          | N/A                                                                                         |
| `totalResults`                                                                              | *number*                                                                                    | :heavy_minus_sign:                                                                          | N/A                                                                                         |