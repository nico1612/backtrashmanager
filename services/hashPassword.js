import bcryptjs from 'bcryptjs'

export const hashPassword = (password) => {
    const salt = bcryptjs.genSaltSync()
    return bcryptjs.hashSync(password, salt)
}