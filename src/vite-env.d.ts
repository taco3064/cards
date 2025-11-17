type Classes<ClassName extends string> = {
  [K in ClassName]?: string;
};

type ExtendedClasses<
  Prefix extends string,
  Props extends { classes?: Classes<string> },
> = {
  [K in `${Prefix}${Capitalize<keyof NonNullable<Props['classes']>>}`]?: string;
};
