const hospitalService = require('./hospital.service')

test('create hospital success', async () => {
    const fakeRepo = {
        insertHospital: jest.fn().mockResolvedValue(true)
    }

    const fakePool = {}
    const result = await hospitalService.create(
        {
            name: "Test User",
            email: "test.user@example.com",
            address: "Test Address",
            image_url: "https://example.com/images/mock/hospital.jpg",
            telephone: "0999999999"
        },
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.insertHospital).toHaveBeenCalled()
    expect(result).toBe(true)
})


test('create hospital success', async () => {
    const fakeRepo = {
        updateHospital: jest.fn().mockResolvedValue(true)
    }

    const fakeId = 1
    const fakePool = {}
    const result = await hospitalService.update(
        {
            name: "Test User",
            email: "test.user@example.com",
            address: "Test Address",
            image_url: "https://example.com/images/mock/hospital.jpg",
            telephone: "0999999999"
        },
        fakeRepo,
        fakeId,
        fakePool
    )

    expect(fakeRepo.updateHospital).toHaveBeenCalled()
    expect(result).toBe(true)
})