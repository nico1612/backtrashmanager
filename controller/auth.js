import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/usuarios.js';
import { hashPassword } from '../services/hashPassword.js';

export const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        let usuario;

        usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario / Password no son correctos'
            });
        }
        
        const validPassword = password===usuario.password;
        if (!validPassword) {
            return res.status(404).json({
                msg: 'Usuario / Password no son correctos'
            });
        }

        res.status(200).json({
            usuario,
            ok: true
        });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}



export const usuariosPost = async (req, res = response) => {
    try {
        const { nombre, correo, password } = req.body

        const usuario = new Usuario({ nombre, correo, password: password })
        await usuario.save()
        res.json({ usuario })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Ha ocurrido un error en el servidor.' })
    }
}

export const updatePassword = async (req, res) => {
    const { correo, newPassword } = req.body;

    try {
        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }


        usuario.password = newPassword;
        await usuario.save();

        res.status(200).json({
            msg: 'Contraseña actualizada exitosamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar la contraseña, hable con el administrador'
        });
    }
};