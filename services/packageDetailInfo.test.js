const packageDetailInfo = require('./packageDetailInfo.service')

test('create packageDetailInfo success', async () => {
    const fakeRepo = {
        insertPackageDetailInfo: jest.fn().mockResolvedValue(true)
    }

    const fakePool = {}
    const result = await packageDetailInfo.create(
        {
            title: "Standard Package",
            price: 14900,
            description: "แพ็กเกจมาตรฐาน เหมาะสำหรับผู้เริ่มต้น",
            image_url: "https://example.com/images/standard.png",
            packageid: 2
        },
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.insertPackageDetailInfo).toHaveBeenCalled()
    expect(result).toBe(true)
})


test('update packageDetailInfo success', async () => {
    const fakeRepo = {
        updatePackageDetailInfo: jest.fn().mockResolvedValue(true)
    }

    const fakeId = 1
    const fakePool = {}
    const result = await packageDetailInfo.update(
        {
            title: "Standard Package",
            price: 14900,
            description: "แพ็กเกจมาตรฐาน เหมาะสำหรับผู้เริ่มต้น",
            image_url: "https://example.com/images/standard.png",
            packageid: 2
        },
        fakeId,
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.updatePackageDetailInfo).toHaveBeenCalled()
    expect(result).toBe(true)
})