const bookingPackageService = require('./bookingPackage.service')

test('create booking package success', async () => {
    const fakeRepo = {
        insertBookingPackage: jest.fn().mockResolvedValue(true)
    }

    const fakePool = {}

    const result = await bookingPackageService.create(
        { title: 'A', price: 100, booking: 1 },
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.insertBookingPackage).toHaveBeenCalled()
    expect(result).toBe(true)
})

test('update booking package success', async () => {
    const fakeRepo = {
        updateBookingPackage: jest.fn().mockResolvedValue(true)
    }
    const fakeId = 1
    const fakePool = {}

    const result = await bookingPackageService.update(
        { title: 'A', price: 100, booking: 1 },
        fakeId,
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.updateBookingPackage).toHaveBeenCalled()
    expect(result).toBe(true)
})