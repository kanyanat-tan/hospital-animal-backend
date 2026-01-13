
exports.signInLogic = async (email, password, customerRepo) => {
    if (!password || password.length < 8) {
        throw new Error("INVALID_PASSWORD")
    }
    const user = await customerRepo.findByEmail(email)

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    return user
}

exports.signUpLogic = async (data, repo, pool) => {
    const { email, role } = data

    const roleQuery = await repo.findRoleByPermission(role, pool)
    if (roleQuery.rowCount === 0) {
        throw new Error("INVALID_ROLE");
    }
    const role_ID = roleQuery.rows[0].role_id;

    const dupUser = await repo.findCustomerByEmail(email, pool);
    if (dupUser.rowCount > 0) {
        throw new Error("DUPLICATE_USER");
    }

    return {
        role_ID
    }

}

exports.roleLogic = async (data, repo, pool) => {
    const { role } = data

    const roleQuery = await repo.findRoleByPermission(role, pool)
    if (roleQuery.rowCount === 0) {
        throw new Error("INVALID_ROLE");
    }
    const role_ID = roleQuery.rows[0].role_id;

    return {
        role_ID
    }

}

exports.animalLogic = async (data, repo, pool) => {
    const { breed, hospital } = data
    
    const hospitalQuery = await repo.findHospitalName(hospital, pool)
    if (hospitalQuery.rowCount === 0) {
        throw new Error("NO HOSPITAL DATA FOUND")
    }
    const hospital_ID = hospitalQuery.rows[0].hospital_id;

    const breedQuery = await repo.findBreedName(breed, pool)
    if (breedQuery.rowCount === 0) {
        throw new Error("NO BREED DATA FOUND")
    }
    const breed_ID = breedQuery.rows[0].breed_id;

    return {
        hospital_ID,
        breed_ID
    }
}

