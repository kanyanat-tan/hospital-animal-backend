exports.create = async (data, resolvedAnimal, userid, repo, pool) => {
    const result = await repo.insertAnimal(data, resolvedAnimal, userid, pool)

    return result
}

exports.update = async (data, resolvedAnimal, userid, id, repo, pool) => {
    const result = await repo.updateAnimal(data, resolvedAnimal, userid, id, pool)
    return result
}