# ListLinkedInProfileReactionsResponseBody

LinkedIn profile reactions.

## Example Usage

```typescript
import { ListLinkedInProfileReactionsResponseBody } from "@the-hog/sdk/models/operations";

let value: ListLinkedInProfileReactionsResponseBody = {
  data: [
    {
      profileUrl: "https://forsaken-tray.info/",
      profileUsername: "<value>",
      reactionType: "<value>",
      post: {},
    },
  ],
  meta: {
    requestId: "<id>",
  },
};
```

## Fields

| Field                                                                                                  | Type                                                                                                   | Required                                                                                               | Description                                                                                            |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `data`                                                                                                 | [models.LinkedInProfileReactionResponseDto](../../models/linked-in-profile-reaction-response-dto.md)[] | :heavy_check_mark:                                                                                     | N/A                                                                                                    |
| `meta`                                                                                                 | [models.PublicResponseMetaDto](../../models/public-response-meta-dto.md)                               | :heavy_check_mark:                                                                                     | N/A                                                                                                    |