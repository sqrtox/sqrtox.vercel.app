export const classes = (
  ...classes: (string | null | boolean | number | undefined)[]
): string => {
  let className = "";

  for (const cls of classes) {
    if (!cls) continue;

    if (className) {
      className += " ";
    }

    className += cls;
  }

  return className;
};
