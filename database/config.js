import mongoose from "mongoose"

export const dbConnection = async () => {
  try {
    mongoose.set('strictQuery', false)

    await mongoose.connect(process.env.MONGODB_CNN)

    console.log("Base de datos conectada")
  } catch (error) {
    console.error(error)
    throw new Error('Error al intentar iniciar la base de datos')
  }
}
