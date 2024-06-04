import { Usuario } from "../models/usuarios.js";

export const passwordValidityMiddleware = async (req, res, next) => {
    const { correo, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }
        const validPassword = password === usuario.password;
        if (!validPassword) {
            return res.status(404).json({
                msg: 'Usuario / Password no son correctos'
            });
        }

        const passwordValidUntil = new Date(usuario.passwordUpdatedAt.getTime() + 5 * 60 * 1000);
        if (new Date() > passwordValidUntil) {
            return res.status(400).json({
                msg: 'La contraseña ha caducado, por favor restablezca su contraseña'
            });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al verificar la contraseña, hable con el administrador'
        });
    }
};
