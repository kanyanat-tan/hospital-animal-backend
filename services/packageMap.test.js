const packageMapService = require('./packageMap.service')


test('create packageMap success', async () => {
    const fakeRepo = {
        insertPackageMap: jest.fn().mockResolvedValue(true)
    }

    const fakePool = {}
    const result = await packageMapService.create(
        {
            bookingPackage: 1,
            package: 2,
            quantity: 3
        },
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.insertPackageMap).toHaveBeenCalled()
    expect(result).toBe(true)
})

test('create packageBooking success', async () => {
    const fakeRepo = {
        insertPackageBooking: jest.fn().mockResolvedValue(true)
    }

    const fakePool = {}
    const result = await packageMapService.createPackageBooking(
        {
            status: "test",
            booking_date: "2026-01-01",
            roleid: 1,
            customerid: 1,
            animalid: 1,
            title: "test",
            total: 1000,
            packageid: 1,
            packageDetailid: 1,
            quantity: 1
        },
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.insertPackageBooking).toHaveBeenCalled()
    expect(result).toBe(true)
})

test('update packageBooking success', async () => {
    const fakeRepo = {
        updatePackageBooking: jest.fn().mockResolvedValue(true)
    }

    const fakeId = {}
    const fakePool = {}
    const result = await packageMapService.updatePackageBooking(
        {
            status: "test",
            booking_date: "2026-01-01",
            roleid: 1,
            customerid: 1,
            animalid: 1,
            title: "test",
            total: 1000,
            packageid: 1,
            packageDetailid: 1,
            quantity: 1
        },
        fakeId,
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.updatePackageBooking).toHaveBeenCalled()
    expect(result).toBe(true)
})