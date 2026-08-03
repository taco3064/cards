// Callbacks are awaited for sequencing only; their resolved value is never read.
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- resolved value unused
export type ResponsiveCallback = () => Promise<any>;
