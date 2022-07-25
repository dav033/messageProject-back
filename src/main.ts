import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
const cors = require('cors')
async function bootstrap () {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['*'],
      credentials: true
    })
  )

  await app.listen(5000)
}
bootstrap()
