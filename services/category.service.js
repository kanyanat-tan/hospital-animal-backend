exports.create = async (data, repo, pool) => {
    const result = await repo.insertCategory(data, pool)

    return result
}

exports.update = async (data, repo, id, pool) => {
    const result = await repo.updateCategory(data, id, pool)

    return result
}