const treatmentInfoService = require('./treatmentInfo.service')

test('create treatmentInfo success', async () => {
    const fakeRepo = {
        insertTreatmentInfo: jest.fn().mockResolvedValue(true)
    }
    const fakePool = {};

    const result = await treatmentInfoService.create(
        {
            name: "test",
            descriptionanimal: "test_description_animal",
            breedid: 1,
            customerid: 1,
            hospitalid: 1,
            booking_date: "2026-01-01",
            status: "test_status",
            roleid: 1,
            title: "test_title",
            appointment: "2026-01-01 00:00",
            weight: 1.0,
            sterilization: "no",
            descriptiontreatment: "test_description_treatment"
        },
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.insertTreatmentInfo).toHaveBeenCalled()
    expect(result).toBe(true)
})


test('update treatmentInfo success', async () => {
    const fakeRepo = {
        updateTreatmentInfo: jest.fn().mockResolvedValue(true)
    }
    const fakePool = {};

    const fakeId = 1
    const result = await treatmentInfoService.update(
        {
            name: "test",
            descriptionanimal: "test_description_animal",
            breedid: 1,
            customerid: 1,
            hospitalid: 1,
            booking_date: "2026-01-01",
            status: "test_status",
            roleid: 1,
            title: "test_title",
            appointment: "2026-01-01 00:00",
            weight: 1.0,
            sterilization: "no",
            descriptiontreatment: "test_description_treatment"
        },
        fakeId,
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.updateTreatmentInfo).toHaveBeenCalled()
    expect(result).toBe(true)
})