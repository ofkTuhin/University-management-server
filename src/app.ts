import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import httpStatus from 'http-status'
import { globalErrorhandler } from './app/middleware/globalerrorhandler'
import routes from './app/routes/routes'
const app: Application = express()
// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', routes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.use(globalErrorhandler)

// not found route
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'not found',
    errorMessage: [
      {
        path: '',
        message: 'Api not found',
      },
    ],
  })
})
export default app
