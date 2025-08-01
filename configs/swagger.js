import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {    
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Sitio Web para Gestión de Tutorías Académicas",
      version: "1.0.0",
      description: "API RESTful completa para gestionar tutorías, estudiantes, profesores y cursos.",
      contact: {
        name: "Anderson Lopez",
        email: "alopez-2023269@kinal.org.gt"
      }
    },
    servers: [
      {
        url: "http://127.0.0.1:4000/academicTutoringManagement/v1"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    "./src/auth/*.js",
    "./src/user/*.js",
    "./src/tutor/*.js",
    "./src/course/*.js",
    "./src/session/*.js",
    "./src/note/*.js",
    "./src/student/*.js",
    "./src/professor/*.js"
  ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)
export { swaggerDocs, swaggerUi }
