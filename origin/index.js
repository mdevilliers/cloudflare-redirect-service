const Router = require('./router')

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const r = new Router()

    r.get('.*/articles/1', () => new Response('Article 1'))
    r.get('.*/articles/2', () => new Response('Article 2'))
    r.get('.*/articles/3', () => new Response('Article 3'))
    r.get('.*/articles/4', () => new Response('Article 4'))

    r.get('/', () => new Response('Hello from the origin application'))

    const resp = await r.route(request)
    return resp
}
