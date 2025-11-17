import { useMemo } from 'react';

export function useExtractClasses<Props extends { classes?: Classes<string> }>(
  prefix: string,
  classes?: Classes<string>,
) {
  const clsStringify = useMemo(() => JSON.stringify(classes || {}), [classes]);

  return useMemo<NonNullable<Props['classes']>>(() => {
    const regex = new RegExp(`^${prefix}([A-Z])`);
    const classes: Classes<string> = JSON.parse(clsStringify);

    return Object.entries(classes).reduce(
      (acc, [key, value]) => ({
        ...acc,
        ...(regex.test(key) && {
          [key.replace(prefix, '').toLowerCase()]: value,
        }),
      }),
      {},
    );
  }, [clsStringify, prefix]);
}
