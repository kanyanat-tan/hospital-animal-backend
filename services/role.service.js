exports.create = async (data, repo, pool) => {
    const result = await repo.insertRole(data, pool)

    return result
}

exports.update = async (data, id, repo, pool) => {
    const result = await repo.updateRole(data, id, pool)

    return result
}