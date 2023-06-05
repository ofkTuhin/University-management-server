import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import router from './app/Modules/users/user.router'
const app: Application = express()
// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/user', router)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
