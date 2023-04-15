import { capitalize } from "../src/functions/capitalize";

test("capitalize", () => {
  expect(capitalize("hello")).toEqual("Hello");
});
