import { transporter } from '../config/nodemailer.js';
import { Usuario } from '../models/usuarios.js';

export const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario / Password no son correctos'
            });
        }

        const validPassword = password === usuario.password;
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
        console.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};

export const usuariosPost = async (req, res = response) => {
    try {
        const { nombre, correo, password } = req.body;

        let existingUser = await Usuario.findOne({ correo });
        if (existingUser) {
            return res.status(400).json({
                msg: 'El usuario ya existe'
            });
        }

        const usuario = new Usuario({ nombre, correo, password });

        await usuario.save();
        res.json({ usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error en el servidor.' });
    }
};

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
        usuario.passwordUpdatedAt = new Date();
        await usuario.save();

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: correo,
            subject: 'Actualización de Contraseña',
            text: `Tu nueva contraseña es: ${newPassword}. Recuerda que esta contraseña es válida solo por 5 minutos.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo: ', error);
                return res.status(500).json({
                    msg: 'Error al enviar el correo con la nueva contraseña'
                });
            }
            res.status(200).json({
                msg: 'Contraseña actualizada exitosamente y correo enviado'
            });
        });
    
       
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar la contraseña, hable con el administrador'
        });
    }
};

export const newUpdatePassword = async (req, res) => {
    const { correo,newPassword } = req.body;

    try {
        let usuario = await Usuario.findOne({ correo });
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
