exports.create = async (data, repo, pool) => {
    const result = await repo.insertNews(data, pool)

    return result
}

exports.update = async (data, id, repo, pool) => {
    const result = await repo.updateNews(data, id, pool)

    return result
}