const breedService = require('./breed.service')

test('create breed success', async () => {
    const fakeRepo = {
        insertBreed: jest.fn().mockResolvedValue(true)
    }

    const fakePool = {}
    const result = await breedService.create(
        {
            name: "test",
            species: "Golden Retriever",
            description: "ตาแดง มีน้ำตาไหล หูมีกลิ่นผิดปกติ หรือขี้หูสะสม",
            image_url: "https://example.com/images/buddy.jpg"
        },
        fakeRepo,
        fakePool
    )

    expect(fakeRepo.insertBreed).toHaveBeenCalled()
    expect(result).toBe(true)
})

test('update breed success', async () => {
    const fakeRepo = {
        insertBreed: jest.fn().mockResolvedValue(true)
    }

    const fakeId = 1
    const fakePool = {}
    const result = await breedService.create(
        {
            name: "test",
            species: "Golden Retriever",
            description: "ตาแดง มีน้ำตาไหล หูมีกลิ่นผิดปกติ หรือขี้หูสะสม",
            image_url: "https://example.com/images/buddy.jpg"
        },
        fakeRepo,
        fakeId,
        fakePool
    )

    expect(fakeRepo.insertBreed).toHaveBeenCalled()
    expect(result).toBe(true)
})