import { match } from "$lib/shared/utils";

describe("Test writable store", () => {
  it("should return first matched value", () => {
    const result = match(1)
      .when(
        () => false,
        () => 1
      )
      .when(
        () => true,
        () => 2
      )
      .when(
        () => false,
        () => 3
      )
      .run();
    expect(result).toBe(2);
  });

  it("should return last matched value", () => {
    const result = match(1)
      .when(
        () => false,
        () => 1
      )
      .when(
        () => false,
        () => 2
      )
      .when(
        () => true,
        () => 3
      )
      .run();
    expect(result).toBe(3);
  });

  it("should return default value", () => {
    const result = match(1)
      .when(
        () => false,
        () => 1
      )
      .when(
        () => false,
        () => 2
      )
      ._(() => 3)
      .run();
    expect(result).toBe(3);
  });
});
