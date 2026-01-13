const { hashPassword, comparePassword } = require('../config/encrypt');

describe("hashPassword", () => {
    test("should return hashed password", async () => {
        const password = "mypassword123";

        const hash = await hashPassword(password)

        expect(hash).toBeDefined();
        expect(hash).not.toBe(password);

        const isMatch = await comparePassword(password, hash)
        expect(isMatch).toBe(true);
    })
})