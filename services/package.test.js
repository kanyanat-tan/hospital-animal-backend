const packageService = require('./package.service')

test('create package success', async () => {
    const fakeRepo = {
        insertPackage: jest.fn().mockResolvedValue(true)
    }

    const fakePool = {}
    const result = await packageService.create(
        {
            title : "Test News",
        },
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.insertPackage).toHaveBeenCalled()
    expect(result).toBe(true)
})


test('update package success', async () => {
    const fakeRepo = {
        updatePackage: jest.fn().mockResolvedValue(true)
    }

    const fakeId = 1
    const fakePool = {}
    const result = await packageService.update(
        {
            title : "Test News",
        },
        fakeId,
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.updatePackage).toHaveBeenCalled()
    expect(result).toBe(true)
})