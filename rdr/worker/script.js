const window = this
!(function(e) {
    var t = {}
    function n(r) {
        if (t[r]) return t[r].exports
        var a = (t[r] = { i: r, l: !1, exports: {} })
        return e[r].call(a.exports, a, a.exports, n), (a.l = !0), a.exports
    }
    ;(n.m = e),
        (n.c = t),
        (n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
        }),
        (n.r = function(e) {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: 'Module',
                }),
                Object.defineProperty(e, '__esModule', { value: !0 })
        }),
        (n.t = function(e, t) {
            if ((1 & t && (e = n(e)), 8 & t)) return e
            if (4 & t && 'object' == typeof e && e && e.__esModule) return e
            var r = Object.create(null)
            if (
                (n.r(r),
                Object.defineProperty(r, 'default', {
                    enumerable: !0,
                    value: e,
                }),
                2 & t && 'string' != typeof e)
            )
                for (var a in e)
                    n.d(
                        r,
                        a,
                        function(t) {
                            return e[t]
                        }.bind(null, a)
                    )
            return r
        }),
        (n.n = function(e) {
            var t =
                e && e.__esModule
                    ? function() {
                          return e.default
                      }
                    : function() {
                          return e
                      }
            return n.d(t, 'a', t), t
        }),
        (n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }),
        (n.p = ''),
        n((n.s = 0))
})([
    function(e, t, n) {
        const r = n(1)
        addEventListener('fetch', async e => {
            e.respondWith(a(e))
        })
        const a = async e => {
            const { request: t } = e,
                n = t.headers.get('x-rdr-request-uri')
            let a = caches.default,
                o = new URL(t.url)
            o.pathname = n
            let s = new Request(o, { headers: t.headers, method: 'GET' }),
                c = await a.match(s)
            return c || ((c = r(n)), e.waitUntil(a.put(s, c.clone()))), c
        }
    },
    function(e, t) {
        const n = 'https://mdvrdrtest.com.global.prod.fastly.net',
            r = {
                '/articles/23': '/articles/1',
                '/articles/44': '/articles/2',
                '/foo': '/articles/1',
                '/feeds/msn/articles': '/feed/msn/articulos',
                '/feeds/msn/galleries': '/feed/msn/galerias',
            },
            a = [
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
            o = () =>
                new Response('', {
                    headers: { 'Cache-Control': 'max-age=3600' },
                    status: 404,
                    statusText: 'Not found',
                }),
            s = e =>
                new Response('', {
                    headers: { 'Cache-Control': 'max-age=3600', Location: e },
                    status: 301,
                }),
            c = (e, t) =>
                new Response('', {
                    headers: {
                        'Cache-Control': 'max-age=3600',
                        Location: e,
                        'x-rdr-backend': t,
                    },
                    status: 303,
                })
        e.exports = e => {
            if (null == e || null == e) return o()
            if (null != r[e]) {
                let t = n + r[e]
                return s(t)
            }
            for (let t of a)
                if (t.regex.test(e)) {
                    if ('matchAndReplaceRegex' == t.type) return s(t.result)
                    if ('matchAndFormatRegex' == t.type)
                        return (
                            (newuri = e.replace(t.regex, t.result)),
                            void 0 !== t.backend
                                ? c(newuri, t.backend)
                                : ((location = n + newuri), s(location))
                        )
                }
            return o()
        }
    },
])
