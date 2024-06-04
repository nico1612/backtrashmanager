import Task from "../models/task.model.js"


export const createTask = async (req, res) => {
    try {
        const { assigned, completed, created, description, status } = req.body

        const newTask = new Task({ assigned, completed, created, description, status })
        await newTask.save()

        res.status(201).json({ task: newTask })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'An error occurred while creating the task.' })
    }
}

export const findAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json({ tasks })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'An error occurred while fetching the tasks.' })
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const { assigned, completed, created, description, status } = req.body

        const task = await Task.findOneAndUpdate(
            { id },
            { assigned, completed, created, description, status },
            { new: true, runValidators: true }
        )

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' })
        }

        res.status(200).json({ task })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'An error occurred while updating the task.' })
    }
}
