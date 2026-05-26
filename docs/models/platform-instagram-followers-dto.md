# PlatformInstagramFollowersDto

## Example Usage

```typescript
import { PlatformInstagramFollowersDto } from "@the-hog/sdk/models";

let value: PlatformInstagramFollowersDto = {
  username: "instagram",
};
```

## Fields

| Field                                                         | Type                                                          | Required                                                      | Description                                                   | Example                                                       |
| ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `username`                                                    | *string*                                                      | :heavy_check_mark:                                            | N/A                                                           | instagram                                                     |
| `maxFollowers`                                                | *number*                                                      | :heavy_minus_sign:                                            | Maximum followers to request. Unlimited is not exposed on v1. |                                                               |