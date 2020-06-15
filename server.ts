import { Application } from 'https://deno.land/x/oak@v5.2.0/mod.ts'
import router from './routes.ts'
import NotFound from './controllers/notFoundController.ts'

const port = 8000

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())
app.use(NotFound)

console.log(`Server running on port ${port}`)

await app.listen({ port: port })
