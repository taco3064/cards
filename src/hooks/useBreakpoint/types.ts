export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Breakpoints = Record<Exclude<Breakpoint, 'xl'>, number>;
