import bcryptjs from "bcryptjs";
import hashCreator from "./authentication";

describe("Given a function auth", () => {
  describe("When is called", () => {
    test("Then it should call the method hash from bcryptjs", () => {
      bcryptjs.hash = jest.fn();
      const mockFunction = bcryptjs.hash;

      hashCreator("");

      expect(mockFunction).toBeCalled();
    });
  });
});
