const bookingService = require('../services/booking.service')

test('create booking success', async () => {
    const fakeRepo = {
        insertBooking: jest.fn().mockResolvedValue(true)
    }
    const fakeRole = 1
    const fakeUserId = 1
    const fakePool = {}

    const result = await bookingService.create(
        {
            booking_date: "2026-01-01",
            status: "status",
            animal: 1
        },
        fakeRole,
        fakeUserId,
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.insertBooking).toHaveBeenCalled()
    expect(result).toBe(true)
})

test('update booking success', async () => {
    const fakeRepo = {
        updateBooking: jest.fn().mockResolvedValue(true)
    }

    const fakeRole = 1
    const fakeUserId = 1
    const fakeId = 1
    const fakePool = {}

    const result = await bookingService.update(
        {
            booking_date: "2026-01-01",
            status: "status",
            animal: 1
        },
        fakeRole,
        fakeUserId,
        fakeId,
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.updateBooking).toHaveBeenCalled()
    expect(result).toBe(true)
})

