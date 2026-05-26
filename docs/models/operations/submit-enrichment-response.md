# SubmitEnrichmentResponse


## Supported Types

### `models.EnrichmentSyncResponseDto`

```typescript
const value: models.EnrichmentSyncResponseDto = {
  data: {
    "key": "<value>",
    "key1": "<value>",
  },
  meta: {
    requestId: "<id>",
  },
};
```

### `models.EnrichmentQueuedResponseDto`

```typescript
const value: models.EnrichmentQueuedResponseDto = {
  id: "<id>",
  operationId: "<id>",
  status: "queued",
  pollUrl: "https://shoddy-wilderness.info",
  meta: {
    requestId: "<id>",
  },
};
```

