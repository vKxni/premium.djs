import { checkDifference } from "../src/functions/difference";

test("checkDifference", () => {
  expect(checkDifference("hello", "hillo")).toEqual({
    oldString: "hello",
    newString: "hillo",
    differences: [
      {
        oldChar: "e",
        newChar: "i",
        index: 1,
      },
    ],
  });
});
