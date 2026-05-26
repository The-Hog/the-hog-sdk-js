# PlatformWebSearchDto

## Example Usage

```typescript
import { PlatformWebSearchDto } from "@the-hog/sdk/models";

let value: PlatformWebSearchDto = {
  query: "best CRM software 2025",
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     | Example                                         |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `query`                                         | *string*                                        | :heavy_check_mark:                              | Search query                                    | best CRM software 2025                          |
| `maxResults`                                    | *number*                                        | :heavy_minus_sign:                              | N/A                                             |                                                 |
| `searchDepth`                                   | [models.SearchDepth](../models/search-depth.md) | :heavy_minus_sign:                              | N/A                                             |                                                 |
| `topic`                                         | [models.Topic](../models/topic.md)              | :heavy_minus_sign:                              | N/A                                             |                                                 |
| `days`                                          | *number*                                        | :heavy_minus_sign:                              | Limit results to last N days (news only)        |                                                 |
| `includeDomains`                                | *string*[]                                      | :heavy_minus_sign:                              | Only include results from these domains         |                                                 |
| `excludeDomains`                                | *string*[]                                      | :heavy_minus_sign:                              | Exclude results from these domains              |                                                 |