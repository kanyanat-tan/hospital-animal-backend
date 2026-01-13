const roleService = require('./role.service')

test('create role success', async () => {
    const fakeRepo = {
        insertRole: jest.fn().mockResolvedValue(true)
    }

    const fakePool = {}
    const result = await roleService.create(
        {
            permission_level : "admin",
            hospitalid : 101
        },
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.insertRole).toHaveBeenCalled()
    expect(result).toBe(true)
})


test('update role success', async () => {
    const fakeRepo = {
        updateRole: jest.fn().mockResolvedValue(true)
    }

    const fakeId = 1
    const fakePool = {}
    const result = await roleService.update(
        {
            permission_level : "admin",
            hospitalid : 1
        },
        fakeId,
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.updateRole).toHaveBeenCalled()
    expect(result).toBe(true)
})