import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
require('dotenv').config()

const cors = require('cors')
async function bootstrap () {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['*'],
      credentials: true,
      AccessControlAllowOrigin: '*'
    })
  )

  await app.listen(process.env.PORT || 5000, () => {
    console.log(
      `Server running on http://localhost:${process.env.PORT} and ${process.env.PORT_SOCKET}`
    )
  })
}
bootstrap()
