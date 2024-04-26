const caab = (v) => Array.isArray(v) && v;

class WebSecurity {
    static CSP = (...CSPs) => CSPs.reduce((acc, { key: k, none: n, directives: d, self: s, wildcard: w, domains: dm }) => `${acc} ${k.replace(/([A-Z])/g, '-$1').toLowerCase()}${(n) ? " 'none'" : `${(d.length > 0) ? ` ${d.map(i => `'${i}'`).join(' ')}` : ''}${(s) ? " 'self'" : ''}${(w) ? ' *' : ''}${(dm.length > 0) ? ` ${dm.join(' ')}` : ''}`}; `, '');
    static CORS = (
        { exposeHeaders: eh, allowMethods: am, allowHeaders: ah, maxAge: ma, allowOrigin: ao, allowCredentials: ac },
        { openerPolicy: op, resourcePolicy: rp, embedderPolicy: ep }
    ) => Array.of(
        Array.of('Access-Control-Max-Age', ma || 0),
        Array.of('Access-Control-Allow-Origin', ao || '*'),
        Array.of('Access-Control-Allow-Credentials', ac ?? false),
        Array.of('Cross-Origin-Opener-Policy', op || 'cross-origin'),
        Array.of('Cross-Origin-Embedder-Policy', ep || 'require-corp'),
        Array.of('Cross-Origin-Resource-Policy', rp || 'cross-origin'),
        Array.of('Access-Control-Allow-Headers', caab(ah) ? ah.join(', ') : '*'),
        Array.of('Access-Control-Allow-Methods', caab(am) ? am.join(', ') : '*'),
        Array.of('Access-Control-Expose-Headers', caab(eh) ? eh.join(', ') : '*'),
    );
    static HSTS = ({ ma, iSD, pl }) => `max - age=${ma || 31536e3}${(iSD) ? '; includeSubDomains' : ''}${(pl) ? '; preload' : ''} `;
    static ReportTo = (...data) => data.map(({ group, max_age, endpoints }) => JSON.stringify({ group, max_age, endpoints })).join(', ');
    static ReportingEndpoints = (...data) => data.reduce((acc, ep) => acc += `${ep.id.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${ep.url}, `, '').slice(0, -2);
    static PermissionPolicy = (...data) => data.reduce((acc, { key, ...value }) => {
        const { none: n, self: s, wildcard: w, src, domains: d } = value;
        return `${acc}${key.replace(/([A-Z])/g, '-$1').toLowerCase()}=${(w) ? '*' : `(${(n) ? '' : `${(s) ? "'self' " : ''}${(src) ? "'src' " : ''}${(caab(d)) ? d.map(v => `"${v}"`).join(' ') : ''}`.trim()})`}, `
    }, '').slice(0, -2);
    static CD = (domain) => Array.of(domain, `*.${domain} `);
}

class CSPObj {
    constructor(key, none, directives, self, wildcard, domains) {
        this.key = key;
        this.none = none;
        this.directives = directives;
        this.self = self;
        this.wildcard = wildcard;
        this.domains = domains;
    }
}

class ReportToGroup {
    constructor(group, max_age, endpoints) {
        this.group = group;
        this.max_age = max_age;
        this.endpoints = endpoints;
    }
}

class ReportingEndpoint {
    constructor(id, url) {
        this.id = id;
        this.url = url;
    }
}

class PermissionPolicy {
    constructor(key, data) {
        this.key = key;
        this.none = data.none ?? false;
        this.self = data.self ?? false;
        this.wildcard = data.wildcard ?? false;
        this.src = data.src ?? false;
        this.domains = data.domains ?? [];
    }
}

const Headers = (headers) => (_req, res, next) => {
    const dict = Array.of(Array.of('CORS', (v) => v.forEach(h => res.setHeader(h[0], h[1]))), Array.of('CSP', (v) => res.setHeader('Content-Security-Policy', v)), Array.of('HSTS', (v) => res.setHeader('Strict-Transport-Security', v)), Array.of('ReportTo', (v) => res.setHeader('Report-To', v)), Array.of('ReportingEndpoints', (v) => res.setHeader('Reporting-Endpoints', v)), Array.of('PermissionPolicy', (v) => res.setHeader('Permission-Policy', v)))
    Object.entries(headers).forEach(([k, v]) => dict.find(([x, _]) => x == k)[1](v));
    next();
};

module.exports = { WebSecurity, CSPObj, ReportToGroup, ReportingEndpoint, PermissionPolicy, Headers };