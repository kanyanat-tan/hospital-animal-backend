const packageDetailService = require('./packageDetail.service')

test('create packageDetail success', async () => {
    const fakeRepo = {
        insertPackageDetail: jest.fn().mockResolvedValue(true)
    }

    const fakePool = {}
    const result = await packageDetailService.create(
        {
            title : "Free Trial Package",
            price : 0,
            description : "แพ็กเกจทดลองใช้งานฟรี",
            image_url : "https://example.com/images/free.jpg",
        },
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.insertPackageDetail).toHaveBeenCalled()
    expect(result).toBe(true)
})
