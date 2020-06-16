import { green, cyan } from "https://deno.land/std@0.53.0/fmt/colors.ts";

export default {
  logger: async (
    { request }: { request: any },
    next: Function,
  ) => {
    await next();
    console.log(`${green(request.method)} ${cyan(request.url.pathname)}`);
  }
};