exports.create = async (data, repo, pool) => {
    const result = await repo.insertTreatmentInfo(data, pool)
    return result
}

exports.update = async (data, id, repo, pool) => {
    const result = await repo.updateTreatmentInfo(data, id, pool)
    return result
}