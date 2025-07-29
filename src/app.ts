import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import router from './router/apiRouter'
import globalErrorHandler from './middleware/globalErrorHandler'
import responseMessage from './constant/responseMessage'
import httpError from './util/httpError'

const app: Application = express()

// Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public'))) //use public folder for static content

// Routes
app.use('/api/v1', router)

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('Route'))
    } catch (error) {
        httpError(next, error, req, 404)
    }
})

// Global Error Handler
app.use(globalErrorHandler)

export default app
