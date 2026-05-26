# PublicValidationErrorItemDto

## Example Usage

```typescript
import { PublicValidationErrorItemDto } from "@the-hog/sdk/models";

let value: PublicValidationErrorItemDto = {
  property: "body.query",
  message: "query must be a string",
  constraints: {
    "isString": "query must be a string",
  },
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              | Example                                  |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `property`                               | *string*                                 | :heavy_check_mark:                       | N/A                                      | body.query                               |
| `message`                                | *string*                                 | :heavy_check_mark:                       | N/A                                      | query must be a string                   |
| `constraints`                            | Record<string, *string*>                 | :heavy_minus_sign:                       | N/A                                      | {<br/>"isString": "query must be a string"<br/>} |