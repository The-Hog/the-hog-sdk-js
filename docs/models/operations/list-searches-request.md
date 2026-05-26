# ListSearchesRequest

## Example Usage

```typescript
import { ListSearchesRequest } from "@the-hog/sdk/models/operations";

let value: ListSearchesRequest = {};
```

## Fields

| Field                              | Type                               | Required                           | Description                        |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `type`                             | *any*                              | :heavy_minus_sign:                 | Filter by search type              |
| `limit`                            | *number*                           | :heavy_minus_sign:                 | Page size (max 200)                |
| `cursor`                           | *any*                              | :heavy_minus_sign:                 | Pagination cursor (created_at ISO) |