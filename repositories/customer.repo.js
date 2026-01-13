
exports.findRoleByPermission = async (permissionLevel, pool) => {
    const result = await pool.query(
        'SELECT role_ID FROM role WHERE permission_level = $1',
        [permissionLevel]
    );
    return result
}

exports.findCustomerByEmail = async (email, pool) => {
    const result = await pool.query(
        'SELECT * FROM public.customer WHERE email = $1',
        [email]
    );
    return result
}
