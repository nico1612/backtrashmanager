import pkg from 'mongoose'
const { Schema, model } = pkg

const taskSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    assigned: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    completed: {
        type: Date,
    },
    created: {
        type: Date,
        required: [true, 'La fecha de creación es obligatoria']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    status: {
        type: String,
        required: [true, 'El estado es obligatorio']
    }
})

const Task = model('Task', taskSchema)

export default Task