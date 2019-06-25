// TODO : replace with KV store lookup
const CONFIG = {
    base_url: 'https://mdvrdrtest.com.global.prod.fastly.net',
    redirects: {
        '/articles/23' : '/articles/1',
        '/foo' : '/bar',
        '/feeds/msn/articles': '/feed/msn/articulos',
        '/feeds/msn/galleries': '/feed/msn/galerias',
    },
    regexs: [
        {
            regex: new RegExp(
                '/legal/sistema-de-gestion-medioambiental-y-cadena-de-custodia'
            ),
            result:
                'https://privacidad.condenast.es/sistema-de-gestion-medioambiental-y-cadena-de-custodia/',
            type: 'matchAndReplaceRegex',
        },
        {
            regex: new RegExp('^(/xyz/.+)/.+'),
            result: '$1',
            type: 'matchAndFormatRegex',
        },
        {
            backend: 'feeds_service',
            regex: new RegExp('^/feed/(.+)'),
            result: '/brand-market/feed/$1',
            type: 'matchAndFormatRegex',
        },
    ],
}

const getRedirect = uri => {
    if (uri == null || uri == undefined) {
        return notFoundResponse()
    }

    // first look for statically defined routes
    if (CONFIG.redirects[uri] != undefined) {
        let location = CONFIG.base_url + CONFIG.redirects[uri]
        return redirectResponse(location)
    }

    // now we look for regexs
    for (let r of CONFIG.regexs) {
        if (r.regex.test(uri)) {
            if (r.type == 'matchAndReplaceRegex') {
                return redirectResponse(r.result)
            }

            if (r.type == 'matchAndFormatRegex') {
                newuri = uri.replace(r.regex, r.result)

                if (r.backend !== undefined) {
                    return seeOtherResponse(newuri, r.backend)
                }

                location = CONFIG.base_url + newuri
                return redirectResponse(location)
            }
        }
    }

    return notFoundResponse()
}

const notFoundResponse = () => {
    return new Response('', {
        headers: {
            'Cache-Control': 'max-age=3600',
        },
        status: 404,
        statusText: 'Not found',
    })
}

const redirectResponse = location => {
    return new Response('', {
        headers: {
            'Cache-Control': 'max-age=3600',
            Location: location,
        },
        status: 301,
    })
}

const seeOtherResponse = (location, backend) => {
    return new Response('', {
        headers: {
            'Cache-Control': 'max-age=3600',
            Location: location,
            'x-rdr-backend': backend,
        },
        status: 303,
    })
}

module.exports = getRedirect
