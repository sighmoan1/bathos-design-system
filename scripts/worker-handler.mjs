export default {
  fetch(request) {
    if (!['GET','HEAD'].includes(request.method)) return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD'}});
    const url = new URL(request.url);
    const path = url.pathname === '/index.html' ? '/' : url.pathname;
    const asset = Object.hasOwn(assets,path) ? assets[path] : undefined;
    if (!asset) return new Response('Not found',{status:404});
    return new Response(request.method === 'HEAD' ? null : asset[1],{headers:{
      'Content-Type':asset[0],
      'Cache-Control':'public, max-age=300',
      'X-Content-Type-Options':'nosniff',
      'Referrer-Policy':'strict-origin-when-cross-origin',
      'Content-Security-Policy':"default-src 'none'; style-src 'self' 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    }});
  }
};
