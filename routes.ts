import { Router } from 'https://deno.land/x/oak@v5.2.0/mod.ts'
import { getTeamsCollection, getTeamsItem } from './controllers/teamController.ts'
import { getFixturesCollection, getFixturesItem } from './controllers/fixturesController.ts';


const router = new Router()

router
    .get('/', async (context: any) => { await context.send({
        root: './static',
        index: 'index.html'
    })})
    .get('/teams', getTeamsCollection)
    .get('/teams/:id', getTeamsItem)
    .get('/fixtures', getFixturesCollection)
    .get('/fixtures/:id', getFixturesItem)

export default router