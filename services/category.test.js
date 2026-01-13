const categoryService = require('./category.service')

test('create hospital success', async () => {
    const fakeRepo = {
        insertCategory: jest.fn().mockResolvedValue(true)
    }

    const fakePool = {}
    const result = await categoryService.create(
        {
            title: "Test",
        },
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.insertCategory).toHaveBeenCalled()
    expect(result).toBe(true)
})


test('create hospital success', async () => {
    const fakeRepo = {
        updateCategory: jest.fn().mockResolvedValue(true)
    }

    const fakeId = 1
    const fakePool = {}
    const result = await categoryService.update(
        {
            title: "Test",
        },
        fakeRepo,
        fakeId,
        fakePool
    )

    expect(fakeRepo.updateCategory).toHaveBeenCalled()
    expect(result).toBe(true)
})