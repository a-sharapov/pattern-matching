type Pattern<V> = (v: V) => boolean;
type Handler<V> = (v: V) => V | any;
type Case<V> = {
  pattern: Pattern<V>;
  handler: Handler<V>;
};

/**
 * Создает утилиту для сопоставления с образцом для заданного значения.
 *
 * @param {any} value - Значение, с которым производится сопоставление.
 * @return {{ when: {when, _, run}, _: {run} }} - Объект, содержащий функции `when`, `_` И `run` для построения цепочки сопоставления с образцом.
 *
 * @example
 * const patters = {
 * isFive: (v: number) => v === 5,
 * isSix: (v: number) => v === 6,
 * isSeven: (v: number) => v === 7,
 * isMoreThenSeven: (v: number) => v > 7,
 * };

 * const result = match(5)
 * .when(patters.isFive, (v) => v * 10)
 * .when(patters.isSix, (v) => v * 10)
 * .when(patters.isSeven, (v) => v * 10)
 * .when(patters.isMoreThenSeven, (v) => v * 10)
 * ._((x) => x * 10)
 * .run();
 */
export var match = <T>(value: T) => {
  let cases: Case<T>[] = [];

  const when = (valueIs: Pattern<T>, execute: Handler<T>) => (
    (cases = cases.concat({ pattern: valueIs, handler: execute })),
    { when, _, run }
  );
  const _ = (execute: Handler<T>) => (
    (cases = cases.concat({ pattern: () => true, handler: execute })), { run }
  );
  const run = () => cases.find(({ pattern }) => pattern(value))?.handler(value);

  return {
    when,
    _,
  };
};
