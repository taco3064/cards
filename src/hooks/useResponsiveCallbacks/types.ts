// Callbacks are awaited for sequencing only; their resolved value is never read.
export type ResponsiveCallback = () => Promise<unknown>;
