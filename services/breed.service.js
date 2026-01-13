exports.create = async (data, repo, pool) => {
    const result = await repo.insertBreed(data, pool)
    return result
}

exports.update = async (data, repo, id, pool) => {
    const result = await repo.updateBreed(data, id, pool)
    return result
}