# SignalsConfigDto

## Example Usage

```typescript
import { SignalsConfigDto } from "@the-hog/sdk/models";

let value: SignalsConfigDto = {};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `platforms`                               | *string*[]                                | :heavy_minus_sign:                        | Opt-in platforms; omit or empty = all     |
| `maxPosts`                                | [models.MaxPosts](../models/max-posts.md) | :heavy_minus_sign:                        | N/A                                       |
| `intentSignals`                           | *string*[]                                | :heavy_minus_sign:                        | N/A                                       |
| `sinceDays`                               | *number*                                  | :heavy_minus_sign:                        | N/A                                       |
| `handles`                                 | [models.Handles](../models/handles.md)    | :heavy_minus_sign:                        | N/A                                       |