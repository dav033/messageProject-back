"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require('dotenv').config();
const cors = require('cors');
async function bootstrap() {
    console.log('AAA');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['*'],
        credentials: true,
        AccessControlAllowOrigin: '*'
    }));
    await app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on http://localhost:${process.env.PORT} and ${process.env.PORT_SOCKET}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map