class WebSecurity {
    static CSP = (...CSPs) => CSPs
        .reduce((acc, info) => acc += ` ${info.key.replace(/([A-Z])/g, '-$1').toLowerCase()
            }${(info.none)
                ? " 'none'"
                : `${(info.directives.length > 0) ? ` ${info.directives.map(i => `'${i}'`).join(' ')}` : ''
                }${(info.self) ? ' \'self\'' : ''
                }${(info.wildcard) ? ' *' : ''
                }${(info.domains.length > 0) ? ` ${info.domains.join(' ')}` : ''
                }`
            };`, '');
    static CORS = (accessControl, crossOrigin) => [
        ['Access-Control-Expose-Headers', (Array.isArray(accessControl.exposeHeaders) && accessControl.exposeHeaders) ? accessControl.exposeHeaders.join(', ') : '*'],
        ['Access-Control-Allow-Methods', (Array.isArray(accessControl.allowMethods) && accessControl.allowMethods) ? accessControl.allowMethods.join(', ') : '*'],
        ['Access-Control-Allow-Headers', (Array.isArray(accessControl.allowHeaders) && accessControl.allowHeaders) ? accessControl.allowHeaders.join(', ') : '*'],
        ['Access-Control-Max-Age', accessControl.maxAge || 0],
        ['Access-Control-Allow-Origin', accessControl.allowOrigin || '*'],
        ['Access-Control-Allow-Credentials', accessControl.allowCredentials ?? false],
        ['Cross-Origin-Opener-Policy', crossOrigin.openerPolicy || 'cross-origin'],
        ['Cross-Origin-Resource-Policy', crossOrigin.resourcePolicy || 'cross-origin'],
        ['Cross-Origin-Embedder-Policy', crossOrigin.embedderPolicy || 'require-corp']
    ];
    static HSTS = (data) => `max-age=${data.ma || 31536000}${(data.iSD) ? '; includeSubDomains' : ''}${(data.pl) ? '; preload' : ''}`;
    static ReportTo = (...data) => data.map(g => JSON.stringify({ group: g.group, max_age: g.max_age, endpoints: g.endpoints })).join(', ');
    static ReportingEndpoints = (...data) => data.reduce((acc, ep) => acc += `${ep.id.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${ep.url}, `, '').slice(0, -2);
    static PermissionPolicy = (...data) => data.reduce((acc, { key, ...value }) => acc += `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}=${(value.wildcard) ? '*' : `(${(value.none) ? '' : `${(value.self) ? '\'self\' ' : ''}${(value.src) ? '\'src\' ' : ''}${(Array.isArray(value.domains) && value.domains) ? value.domains.map(v => `"${v}"`).join(' ') : ''}`.trim()})`}, `, '').slice(0, -2);
    static CD = (domain) => [domain, `*.${domain}`];
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
    headers.CORS.forEach(h => res.setHeader(h[0], h[1]));
    res
        .setHeader('Content-Security-Policy', headers.CSP)
        .setHeader('Strict-Transport-Security', headers.HSTS)
        .setHeader('Report-To', headers.ReportTo)
        .setHeader('Reporting-Endpoints', headers.ReportingEndpoints)
        .setHeader('Permission-Policy', headers.PermissionPolicy)
    next();
};

module.exports = { WebSecurity, CSPObj, ReportToGroup, ReportingEndpoint, PermissionPolicy, Headers };