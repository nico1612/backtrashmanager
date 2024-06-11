import pkg from 'mongoose'
const {Schema, model} = pkg

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    sesionIniciada: {
        type: Boolean,
        default: false
    },
    passwordUpdatedAt: { type: Date, default: Date.now }
})


UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario  } = this.toObject()
    usuario.uid = _id
    return usuario
}

export const Usuario= model("usuario",UsuarioSchema)