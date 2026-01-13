const treatmentService = require('./treatment.service')

test('create role success', async () => {
    const fakeRepo = {
        insertTreatment: jest.fn().mockResolvedValue(true)
    }

    const fakePool = {}
    const result = await treatmentService.create(
        {
            title: "test",
            appointment: "2025-08-12 09:30:00",
            weight: "25",
            descriptiontreatment: "ตรวจสุขภาพทั่วไปและฉีดวัคซีนประจำปี",
            sterilization: "yes",
            booking: 1
        },
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.insertTreatment).toHaveBeenCalled()
    expect(result).toBe(true)
})


test('update role success', async () => {
    const fakeRepo = {
        updateTreatment: jest.fn().mockResolvedValue(true)
    }

    const fakeId = 1
    const fakePool = {}
    const result = await treatmentService.update(
        {
            title: "test",
            appointment: "2025-08-12 09:30:00",
            weight: "25",
            description: "ตรวจสุขภาพทั่วไปและฉีดวัคซีนประจำปี",
            sterilization: "yes",
            booking: 1
        },
        fakeId,
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.updateTreatment).toHaveBeenCalled()
    expect(result).toBe(true)
})