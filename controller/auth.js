// src/controllers/authController.js
import { transporter } from '../config/nodemailer.js';
import { Usuario } from '../models/usuarios.js';

const errorMessage = 'Invalid credentials. Please check your email and password and try again, or use the password recovery option if you have forgotten your password.';

export const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });

        if (!usuario || usuario.password !== password) {
            return res.status(404).json({ msg: errorMessage });
        }

        res.status(200).json({
            usuario,
            ok: true,
            msg: "El usuario se encontró correctamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hable con el administrador' });
    }
};

export const usuariosPost = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;
        const existingUser = await Usuario.findOne({ correo });

        if (existingUser) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        const usuario = new Usuario({ nombre, correo, password });
        await usuario.save();

        res.json({ usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ha ocurrido un error en el servidor.' });
    }
};

export const updatePassword = async (req, res) => {
    const { correo, newPassword } = req.body;

    try {
        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        usuario.password = newPassword;
        usuario.passwordUpdatedAt = new Date();
        await usuario.save();

        sendPasswordResetEmail(correo, newPassword);

        res.status(200).json({ msg: 'Your password has been successfully reset!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar la contraseña, hable con el administrador' });
    }
};

export const newUpdatePassword = async (req, res) => {
    const { correo, newPassword } = req.body;

    try {
        let usuario = await Usuario.findOne({ correo });
        usuario.password = newPassword;
        await usuario.save();
        res.status(200).json({ msg: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar la contraseña, hable con el administrador' });
    }
};

const sendPasswordResetEmail = (correo, newPassword) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: correo,
        subject: 'Your Trash Project Password Reset Code',
        text: `Hi,

To reset your password on Trash Project, please check your email. We have sent an alphanumeric code ${newPassword} with instructions to help you securely regain access to your account. Please note that this code will be valid for 30 days.

Thank you for trusting Trash Project!

Best regards,

Trash Project`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo: ', error);
        }
    });
};
