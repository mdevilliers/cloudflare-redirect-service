const store = require('./store/data')

addEventListener('fetch', async event => {
    event.respondWith(redirect_with_cache(event))
})

const redirect = event => {
    const { request } = event
    const path = request.headers.get('x-rdr-request-uri')

    return store(path)
}

const redirect_with_cache = async event => {
    const { request } = event
    const path = request.headers.get('x-rdr-request-uri')

    let cache = caches.default

    // create a cache key with a generated request
    let url = new URL(request.url)
    url.pathname = path
    let cacheKey = new Request(url, { headers: request.headers, method: 'GET' })

    // is this cached?
    let response = await cache.match(cacheKey)

    if (!response) {
        // not cached - get and add
        response = store(path)
        event.waitUntil(cache.put(cacheKey, response.clone()))
    }

    return response
}
