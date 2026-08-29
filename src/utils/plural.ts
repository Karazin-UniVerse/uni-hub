export function getPluralUk(
  count: number,
  one: string,
  few: string,
  many: string
): string {
  const pr = new Intl.PluralRules('uk-UA');
  const rule = pr.select(count);
  if (rule === 'one') return one;
  if (rule === 'few') return few;
  return many;
}
