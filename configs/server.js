'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import apiLimiter from '../src/middlewares/rate-limit-validator.js'
import { swaggerDocs, swaggerUi } from './swagger.js'

// Rutas
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import tutorRoutes from '../src/tutor/tutor.routes.js'
import studentRoutes from '../src/student/student.routes.js'
import professorRoutes from '../src/professor/professor.routes.js'
import courseRoutes from '../src/course/course.routes.js'
import noteRoutes from '../src/note/note.routes.js'
import sessionRoutes from '../src/session/session.routes.js'

const middlewares = (app) => {
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
  app.use(helmet())
  app.use(morgan('dev'))
  app.use(apiLimiter)
}

const routes = (app) => {
  const prefix = '/academicTutoringManagement/v1'
  app.use(`${prefix}/auth`, authRoutes)
  app.use(`${prefix}/user`, userRoutes)
  app.use(`${prefix}/tutors`, tutorRoutes)
  app.use(`${prefix}/students`, studentRoutes)
  app.use(`${prefix}/professors`, professorRoutes)
  app.use(`${prefix}/courses`, courseRoutes)
  app.use(`${prefix}/notes`, noteRoutes)
  app.use(`${prefix}/sessions`, sessionRoutes)

  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

export const initServer = () => {
  const app = express()

  try {
    middlewares(app)
    dbConnection()
    routes(app)
    app.listen(process.env.PORT, () =>
      console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
    )
  } catch (err) {
    console.error(`Fallo al iniciar el servidor: ${err}`)
  }
}
