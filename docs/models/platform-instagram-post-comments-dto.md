# PlatformInstagramPostCommentsDto

## Example Usage

```typescript
import { PlatformInstagramPostCommentsDto } from "@the-hog/sdk/models";

let value: PlatformInstagramPostCommentsDto = {
  postUrl: "https://www.instagram.com/p/ABC123/",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `postUrl`                                                                            | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  | https://www.instagram.com/p/ABC123/                                                  |
| `maxComments`                                                                        | *number*                                                                             | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |
| `includeNested`                                                                      | *boolean*                                                                            | :heavy_minus_sign:                                                                   | When true, requests nested reply threads from the comment actor (more items / cost). |                                                                                      |