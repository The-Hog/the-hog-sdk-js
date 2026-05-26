# StartDeepResearchRequest

## Example Usage

```typescript
import { StartDeepResearchRequest } from "@the-hog/sdk/models/operations";

let value: StartDeepResearchRequest = {
  body: {
    prompt: "Research AI CRM competitors",
    schema: {
      "type": "object",
      "properties": {
        "competitors": {
          "type": "array",
        },
      },
    },
    inputAnchors: [
      {
        "input_anchor": {
          "candidate_index": 1,
        },
      },
    ],
  },
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `idempotencyKey`                                                           | *string*                                                                   | :heavy_minus_sign:                                                         | Prevents duplicate work if you retry the same request with the same key.   |
| `body`                                                                     | [models.DeepResearchRequestDto](../../models/deep-research-request-dto.md) | :heavy_check_mark:                                                         | N/A                                                                        |