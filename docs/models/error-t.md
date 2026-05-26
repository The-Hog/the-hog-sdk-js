# ErrorT

Error details when failed

## Example Usage

```typescript
import { ErrorT } from "@the-hog/sdk/models";

let value: ErrorT = {
  message: "<value>",
  retryable: true,
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `message`                               | *string*                                | :heavy_check_mark:                      | Safe error message                      |
| `retryable`                             | *boolean*                               | :heavy_check_mark:                      | Whether retrying the search may succeed |