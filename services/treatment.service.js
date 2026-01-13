exports.create = async (data, repo, pool) => {
    const result = await repo.insertTreatment(data, pool)

    return result
}

exports.update = async (data, id, repo, pool) => {
    const result = await repo.updateTreatment(data, id, pool)

    return result
}