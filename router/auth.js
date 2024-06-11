import {Router} from 'express'
import {check} from 'express-validator'

import { login, logout, newUpdatePassword, updatePassword, usuariosPost } from '../controller/auth.js'
import { validarCampos } from '../middleware/validar-campos.js'
import { passwordValidityMiddleware } from '../middleware/UpdatePasword.js'

export const routerAuth = Router()

routerAuth.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login )

routerAuth.post('/logout',[
    check('correo', 'El correo es obligatorio').isEmail(),
    validarCampos
],logout )
routerAuth.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    validarCampos
], usuariosPost )

routerAuth.post('/updatePassword',[

],updatePassword)

routerAuth.post('/updateLostPassword',[
    passwordValidityMiddleware,
    validarCampos
],newUpdatePassword)