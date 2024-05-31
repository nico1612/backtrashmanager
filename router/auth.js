import {Router} from 'express'
import {check} from 'express-validator'

import { login, updatePassword, usuariosPost } from '../controller/auth.js'
import { validarCampos } from '../middleware/validar-campos.js'

export const routerAuth = Router()

routerAuth.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login )

routerAuth.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    validarCampos
], usuariosPost )

routerAuth.post('/updatePassword',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    validarCampos
],updatePassword)