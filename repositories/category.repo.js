exports.insertCategory = async ({ title }, pool) => {
    let sql = `INSERT INTO public.news_category
                (title)
                VALUES($1)`
    let response = await pool.query(sql, [title])

    return response.rowCount > 0
}

exports.updateCategory = async ({ title }, id, pool) => {
    let sql = `UPDATE public.news_category
                SET title = $1
                WHERE category_ID = $2`
    let response = await pool.query(sql, [title, id])

    return response.rowCount > 0
}