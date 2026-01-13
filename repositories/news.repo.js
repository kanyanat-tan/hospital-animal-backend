exports.insertNews = async ({ title, content, image_url, create_date, categoryid, roleid }, pool) => {
    let sql = `INSERT INTO public.news
        (title,content,image_url,create_date,categoryID,roleID)
        VALUES($1,$2,$3,$4,$5,$6)`
    let response = await pool.query(sql, [title, content, image_url, create_date, categoryid, roleid])

    return response.rowCount > 0
}

exports.updateNews = async ({ title, content, image_url, create_date, categoryid, roleid }, id, pool) => {
    let sql = `UPDATE public.news
    SET title = $1, content = $2, image_url = $3, create_date = $4,categoryID = $5 , roleID = $6 
    WHERE news_ID = $7`
    let response = await pool.query(sql, [title, content, image_url, create_date, categoryid, roleid, id])

    return response.rowCount > 0
}