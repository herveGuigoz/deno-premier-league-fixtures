import { Application } from 'https://deno.land/x/oak@v5.2.0/mod.ts'
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";
import router from './routes.ts'
import notFound from './middlewares/notFound.ts'
import logger from './middlewares/logger.ts';

const port = 8000

const app = new Application()

app.use(logger.logger);
app.use(router.routes())
app.use(router.allowedMethods())
app.use(notFound)

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`${yellow("Listening on:")} ${green(url)}`);
});

await app.listen({ port });
