# InputAnchors

Optional caller-owned anchor metadata overlaid into matching schema paths. Arrays preserve the previously documented contract; objects support keyed anchors used by the runtime.


## Supported Types

### `{ [k: string]: any }[]`

```typescript
const value: { [k: string]: any }[] = [
  {
    "input_anchor": {
      "candidate_index": 1,
    },
  },
];
```

### `{ [k: string]: any }`

```typescript
const value: { [k: string]: any } = {
  "key": "<value>",
  "key1": "<value>",
  "key2": "<value>",
};
```

