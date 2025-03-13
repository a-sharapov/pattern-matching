type Pattern<V> = (v: V) => boolean;
type Handler<V> = (v: V) => V | any;

/**
 * Создает утилиту для сопоставления с образцом для заданного значения.
 *
 * @param value - Значение, с которым производится сопоставление.
 * @return - Объект, содержащий функции `when`, `_` И `run` для построения цепочки сопоставления с образцом.
 */
export var match = <T>(value: T) => {
  let cases = new Map<Pattern<T>, Handler<T>>();

  const when = (valueIs: Pattern<T>, execute: Handler<T>) => (
    cases.set(valueIs, execute), { when, _, run }
  );
  const _ = (execute: Handler<T>) => (cases.set(() => true, execute), { run });
  const run = () =>
    [...cases].find(({ 0: pattern }) => pattern(value))?.at(1)?.(value);

  return {
    when,
    _,
  };
};
