# PlatformLinkedInProfileActivityDto

## Example Usage

```typescript
import { PlatformLinkedInProfileActivityDto } from "@the-hog/sdk/models";

let value: PlatformLinkedInProfileActivityDto = {
  profiles: [
    "https://www.linkedin.com/in/satyanadella",
    "some-public-id",
  ],
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      | Example                                                          |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `profiles`                                                       | *string*[]                                                       | :heavy_check_mark:                                               | LinkedIn profile URLs or public profile usernames.               | [<br/>"https://www.linkedin.com/in/satyanadella",<br/>"some-public-id"<br/>] |
| `maxItems`                                                       | *number*                                                         | :heavy_minus_sign:                                               | N/A                                                              |                                                                  |
| `postedLimit`                                                    | [models.PostedLimit](../models/posted-limit.md)                  | :heavy_minus_sign:                                               | Fetch posts no older than this time window.                      |                                                                  |