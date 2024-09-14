import { match } from "$lib/shared/utils";

const patterns = {
  isFive: (v: number) => v === 5,
  isSix: (v: number) => v === 6,
  isSeven: (v: number) => v === 7,
  isMoreThenSeven: (v: number) => v > 7,
};

const result = match(2)
  .when(patterns.isFive, (v) => v * 1)
  .when(patterns.isSix, (v) => v * 2)
  .when(patterns.isSeven, (v) => v * 3)
  .when(patterns.isMoreThenSeven, (v) => v * 10)
  ._((x) => x * 100)
  .run();

console.log(result);
