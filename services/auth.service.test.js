const { signInLogic, roleLogic } = require("./auth.service");

test("throw error when password invalid", async () => {
  const fakeRepo = {
    findByEmail: jest.fn(),
  };
  await expect(signInLogic("a@test.com", "123", fakeRepo)).rejects.toThrow("INVALID_PASSWORD");
});

test("throw error when user not found", async () => {
  const fakeRepo = {
    findByEmail: jest.fn().mockResolvedValue(null),

  };
  await expect(signInLogic("a@test.com", "12345678", fakeRepo)).rejects.toThrow("USER_NOT_FOUND");
});


test("sign in success", async () => {
  const fakeRepo = {
    findByEmail: jest.fn().mockResolvedValue({
      id: 1,
      email: "a@test.com",
    }),
  };

  const result = await signInLogic("a@test.com", "12345678", fakeRepo);
  expect(result.id).toBe(1);
});

test("should return role when permission is valid", async () => {
  const data = {
    role: "user"
  }
  const repo = {
    findRoleByPermission: jest.fn().mockResolvedValue({
      rowCount: 1,
      rows: [{ role_id: 1 }]
    })
  }

  const pool = {
    query: jest.fn()
  };

  const result = await roleLogic(data, repo, pool)

  expect(result).toBeDefined();
  expect(repo.findRoleByPermission).toHaveBeenCalledWith(
    "user",
    pool
  );
})