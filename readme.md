#### redirect service using cloudflare and fastly

This POC is made of 3 services (all deployed as cloudflare workers) behind a fastly endpoint

To run via fastly - https://fiddle.fastlydemo.net/fiddle/835f38bf

## origin 

Server requests for articles

## feeds

Serves RSS feeds (still a thing)


## rdr 

Knows about redirects and rewrites

To test 

```
curl -v  -H "x-rdr-request-uri:/xyz/4/f" https://cloudflare-rdr.mdevilliers.workers.dev/
```



