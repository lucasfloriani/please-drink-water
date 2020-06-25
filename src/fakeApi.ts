import Koa from 'koa'

export default function fakeApi() {
  const app = new Koa()
  app.use(async (ctx) => { ctx.body = 'Make me 24/7' })
  app.listen(process.env.PORT || 8080)
}
