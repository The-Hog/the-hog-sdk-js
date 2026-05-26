# SearchPeopleRequest

## Example Usage

```typescript
import { SearchPeopleRequest } from "@the-hog/sdk/models/operations";

let value: SearchPeopleRequest = {
  body: {
    query: "VP Engineering at hiring B2B SaaS companies in SF",
  },
};
```

## Fields

| Field                                                                                           | Type                                                                                            | Required                                                                                        | Description                                                                                     |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `idempotencyKey`                                                                                | *string*                                                                                        | :heavy_minus_sign:                                                                              | Optional. Reusing the same key for the same organization returns the existing queued operation. |
| `body`                                                                                          | [models.PostPeopleSearchDto](../../models/post-people-search-dto.md)                            | :heavy_check_mark:                                                                              | N/A                                                                                             |