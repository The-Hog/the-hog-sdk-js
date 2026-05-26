# PlatformInstagramFollowingDto

## Example Usage

```typescript
import { PlatformInstagramFollowingDto } from "@the-hog/sdk/models";

let value: PlatformInstagramFollowingDto = {
  username: "instagram",
};
```

## Fields

| Field                                                                                                          | Type                                                                                                           | Required                                                                                                       | Description                                                                                                    | Example                                                                                                        |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `username`                                                                                                     | *string*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            | instagram                                                                                                      |
| `maxFollowing`                                                                                                 | *number*                                                                                                       | :heavy_minus_sign:                                                                                             | Requested following limit. The upstream source may return more than requested. Unlimited is not exposed on v1. |                                                                                                                |