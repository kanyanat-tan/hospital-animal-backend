const newsService = require('./news.service')

test('create news success', async () => {
    const fakeRepo = {
        insertNews: jest.fn().mockResolvedValue(true)
    }

    const fakePool = {}
    const result = await newsService.create(
        {
            title : "Test News",
            content : "เนื้อหาทดสอบระบบ",
            image_url :"https://cdn.fakeapp.com/news/maintenance.png",
            create_date : "2026-01-15",
            categoryID : 3,
            roleID : 1
        },
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.insertNews).toHaveBeenCalled()
    expect(result).toBe(true)
})


test('update news success', async () => {
    const fakeRepo = {
        updateNews: jest.fn().mockResolvedValue(true)
    }

    const fakeId = 1
    const fakePool = {}
    const result = await newsService.update(
        {
            title : "Test News",
            content : "เนื้อหาทดสอบระบบ",
            image_url :"https://cdn.fakeapp.com/news/maintenance.png",
            create_date : "2026-01-15",
            categoryID : 3,
            roleID : 1
        },
        fakeId,
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.updateNews).toHaveBeenCalled()
    expect(result).toBe(true)
})