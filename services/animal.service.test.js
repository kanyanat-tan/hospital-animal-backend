const { animalLogic } = require('./auth.service')
const animalService = require('./animal.service')

test('should create animal when data is valid', async () => {
    const data = {
        breed: "Golden Retriever",
        hospital: "LittlePet Hospital"
    }

    const repo = {
        findHospitalName: jest.fn().mockResolvedValue({
            rowCount: 1,
            rows: [{ hospital_id: 1 }]
        }),

        findBreedName: jest.fn().mockResolvedValue({
            rowCount: 1,
            rows: [{ breed_id: 1 }]
        })
    }

    const pool = {
        query: jest.fn()
    };

    const result = await animalLogic(data, repo, pool);

    expect(result).toBeDefined();

    expect(repo.findHospitalName).toHaveBeenCalledWith(
        "LittlePet Hospital",
        pool
    );
})

test('create animal success', async () => {
    const fakeRepo = {
        insertAnimal: jest.fn().mockResolvedValue(true)
    }

    const fakeUserId = 1
    const fakePool = {}

    const result = await animalService.create(
        {
            name: "test",
            description: "ตาแดง มีน้ำตาไหล หูมีกลิ่นผิดปกติ หรือขี้หูสะสม",
        }, {
        hospital_ID: 1,
        breed_ID: 1
    },
        fakeUserId,
        fakeRepo,
        fakePool)

    expect(fakeRepo.insertAnimal).toHaveBeenCalled()
    expect(result).toBe(true)
})


test('update animal success', async () => {
    const fakeRepo = {
        updateAnimal: jest.fn().mockResolvedValue(true)
    }

    const fakeUserId = 1
    const fakeId = 1
    const fakePool = {}

    const result = await animalService.update(
        {
            name: "test",
            description: "ตาแดง มีน้ำตาไหล หูมีกลิ่นผิดปกติ หรือขี้หูสะสม",
        },
        {
            hospital_ID: 1,
            breed_ID: 1
        },
        fakeUserId,
        fakeId,
        fakeRepo,
        fakePool)

    expect(fakeRepo.updateAnimal).toHaveBeenCalled()
    expect(result).toBe(true)
})

