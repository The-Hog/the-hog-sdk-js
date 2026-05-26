# SearchAcceptedDto

## Example Usage

```typescript
import { SearchAcceptedDto } from "@the-hog/sdk/models";

let value: SearchAcceptedDto = {
  id: "<id>",
  status: "queued",
  pollUrl: "https://unselfish-extent.net",
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `id`                                                                      | *string*                                                                  | :heavy_check_mark:                                                        | Search operation ID                                                       |
| `status`                                                                  | [models.SearchAcceptedDtoStatus](../models/search-accepted-dto-status.md) | :heavy_check_mark:                                                        | N/A                                                                       |
| `pollUrl`                                                                 | *string*                                                                  | :heavy_check_mark:                                                        | URL to poll for result                                                    |
| `meta`                                                                    | [models.SearchAcceptedMetaDto](../models/search-accepted-meta-dto.md)     | :heavy_check_mark:                                                        | N/A                                                                       |