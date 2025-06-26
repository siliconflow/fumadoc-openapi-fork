const keys = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'];
export function createProxy(options = {}) {
    const { allowedOrigins, allowedUrls, filterRequest = (req) => {
        return (!allowedUrls || allowedUrls.some((item) => req.url.startsWith(item)));
    }, overrides, } = options;
    const handlers = {};
    async function handler(req) {
        const url = req.nextUrl.searchParams.get('url');
        if (!url) {
            return Response.json('[Proxy] A `url` query parameter is required for proxy url', {
                status: 400,
            });
        }
        let parsedUrl;
        try {
            parsedUrl = new URL(url);
        }
        catch {
            return Response.json('[Proxy] Invalid `url` parameter value.', {
                status: 400,
            });
        }
        if (allowedOrigins && !allowedOrigins.includes(parsedUrl.origin)) {
            return Response.json(`[Proxy] The origin "${parsedUrl.origin}" is not allowed.`, {
                status: 400,
            });
        }
        const contentLength = req.headers.get('content-length');
        const hasBody = contentLength && parseInt(contentLength) > 0;
        let proxied = new Request(parsedUrl, {
            method: req.method,
            cache: 'no-cache',
            headers: req.headers,
            body: hasBody &&
                ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method.toUpperCase())
                ? await req.arrayBuffer()
                : undefined,
        });
        if (overrides?.request) {
            proxied = overrides.request(proxied);
        }
        if (!filterRequest(proxied)) {
            return Response.json('[Proxy] The proxied request is not allowed', {
                status: 403,
            });
        }
        proxied.headers.forEach((_value, originalKey) => {
            const key = originalKey.toLowerCase();
            if (key === 'origin') {
                proxied.headers.delete(originalKey);
            }
        });
        let res = await fetch(proxied).catch((e) => new Error(e.toString()));
        if (res instanceof Error) {
            return Response.json(`[Proxy] Failed to proxy request: ${res.message}`, {
                status: 500,
            });
        }
        if (overrides?.response) {
            res = overrides.response(res);
        }
        const headers = new Headers(res.headers);
        headers.forEach((_value, originalKey) => {
            const key = originalKey.toLowerCase();
            if (key.startsWith('access-control-') || key === 'content-encoding') {
                headers.delete(originalKey);
            }
        });
        headers.set('X-Forwarded-Host', res.url);
        return new Response(res.body, {
            status: res.status,
            statusText: res.statusText,
            headers,
        });
    }
    for (const key of keys) {
        handlers[key] = handler;
    }
    return handlers;
}
