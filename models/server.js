import express from 'express'
import cors from 'cors'
import { createServer } from 'http'

import { dbConnection } from '../database/config.js'
import { routerAuth } from '../router/auth.js'
import routerTask from '../router/taskManager.js'


export class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3000
        this.server = createServer( this.app )

        this.path={
            auth:      '/api/auth',
            task:      '/api/task',
        }

        //middlewares
        this.middlewares()

        //conectar a la base de datos
        this.conectarDB()

        // Lectura y parseo del body
        this.app.use( express.json() )

        //rutas de mi apliacion
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){

        this.app.use( cors() )

        this.app.use( express.json() )

        this.app.use( express.static('public') )
    }

    routes(){
        this.app.use( this.path.auth,routerAuth)
        this.app.use(this.path.task,routerTask )
    }

    listen(){
        this.server.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto ' , this.port)
        })
    }

}