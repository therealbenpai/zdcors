import * as express from './express'

/**
 * Module: `@therealbenpai/zdcors`
 * 
 * This module is a HTTP Security Headers generator that allows for quick and easy generation of basic HTTP security headers.
 * 
 * This module is designed to be used in a Node.js environment and is not intended for use in a browser environment.
 * 
 * The module follows the specifications set forth by the Mozilla Developer Network (MDN) and the World Wide Web Consortium (W3C).
 * 
 * @license GPL-3.0-or-later
 * @copyright
 * 2024 © TheRealBenpai (in association with The FemDevs). All Rights Reserved.
 *
 * Removal of this copyright notice is prohibited under 17 U.S.C. §§ 101-810 and 44 U.S.C. §§ 505, 2113; 18 U.S.C. § 2318 (Copyright Act of 1976).
 */
declare module '@therealbenpai/zdcors' {
    /**
     * Content Security Policy Sectors
     * 
     * A list of all the possible CSP Sectors that can be used in the CSP Object
     */
    type CSPSectors = 'imgSrc' | 'fontSrc' | 'baseUri' | 'mediaSrc' | 'childSrc' | 'reportTo' | 'styleSrc' | 'objectSrc' | 'reportUri' | 'scriptSrc' | 'defaultSrc' | 'connectSrc' | 'formAction' | 'prefetchSrc' | 'manifestSrc' | 'blockAllMixedContent' | 'requireTrustedTypesFor' | 'upgradeInsecureRequests'
    /**
     * Content Security Policy Directives
     * 
     * A list of all the possible CSP Directives that can be used in the CSP Object
     */
    type CSPDirectives = 'unsafe-inline' | 'unsafe-eval' | 'unsafe-hashes' | 'strict-dynamic'
    /**
     * Permission Policy Sectors
     * 
     * A list of all the possible Permission Policy Sectors that can be used in the Permission Policy Object
     */
    type PermissionPolicySectors = 'hid' | 'usb' | 'midi' | 'camera' | 'serial' | 'battery' | 'gamepad' | 'payment' | 'autoplay' | 'webShare' | 'bluetooth' | 'gyroscope' | 'fullscreen' | 'localFonts' | 'microphone' | 'geolocation' | 'magnetometer' | 'accelerometer' | 'idleDetection' | 'storageAccess' | 'browsingTopics' | 'screenWakeLock' | 'otpCredentials' | 'display-capture' | 'document-domain' | 'encrypted-media' | 'windowManagement' | 'pictureInPicture' | 'speakerSelection' | 'xrSpacialTracking' | 'ambientLightSensor' | 'identityCredentialsGet' | 'publickeyCredentialsGet' | 'executionWhileNotRendered' | 'publickeyCredentialsCreate' | 'executionWhileOutOfViewport'
    /**
     * **C**ORS **C**ross **O**rigin **P**olicy Type
     */
    type CCOP = 'same-origin' | 'same-site' | 'cross-origin'
    /**
     * CORS Access Control Object
     * 
     * An object that contains all the necessary information to set the CORS `Access-Control-*` headers
     */
    interface CorsAccessControlObj {
        /**
         * Access Control Expose Headers
         * 
         * Used to set the `Access-Control-Expose-Headers` header
         * 
         * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers MDN Docs Referance}
         */
        exposeHeaders: Array<string>
        /**
         * Access Control Allow Methods
         * 
         * Used to set the `Access-Control-Allow-Methods` header
         * 
         * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods MDN Docs Referance}
         */
        allowMethods: Array<string>
        /**
         * Access Control Allow Headers
         * 
         * Used to set the `Access-Control-Allow-Headers` header
         * 
         * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers MDN Docs Referance}
         */
        allowHeaders: Array<string>
        /**
         * Access Control Max Age
         * 
         * Used to set the `Access-Control-Max-Age` header
         * 
         * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age MDN Docs Referance}
         */
        maxAge: number
        /**
         * Access Control Allow Origin
         * 
         * Used to set the `Access-Control-Allow-Origin` header
         * 
         * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin MDN Docs Referance}
         */
        allowOrigin: string
        /**
         * Access Control Allow Credentials
         * 
         * Used to set the `Access-Control-Allow-Credentials` header
         * 
         * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials MDN Docs Referance}
         */
        allowCredentials: boolean
    }
    /**
     * CORS Cross Origin Object
     * 
     * An object that contains all the necessary information to set the CORS `Cross-Origin-*` headers
     */
    interface CorsCrossOriginObj {
        /**
         * COOP Origin
         * 
         * Used to set the `Cross-Origin-Opener-Policy` header
         * 
         * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy MDN Docs Referance}
         */
        openerPolicy: CCOP
        /**
         * COOP Method
         * 
         * Used to set the `Cross-Origin-Resource-Policy` header
         * 
         * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy MDN Docs Referance}
         */
        resourcePolicy: CCOP
        /**
         * COOP Embedder
         * 
         * Used to set the `Cross-Origin-Embedder-Policy` header
         * 
         * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy MDN Docs Referance}
         */
        embedderPolicy: CCOP
    }
    /**
     * HSTS Header Object
     * 
     * An object that contains all the necessary information to set the HSTS (`Strict-Transport-Security`) header
     * 
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security MDN Docs Referance}
     */
    interface HSTSObj {
        /** Max Age of the HSTS Policy */
        ma: number;
        /** Whether or not the HSTS Policy should includes subdomains */
        iSD: boolean;
        /** Whether or not the HSTS Policy should include preloading capabilities */
        pl: boolean;
    }
    /**
     * Permission Policy Object
     * 
     * An object that contains all the necessary information to specify a Permission Policy directive for usage
     * in the `Permissions-Policy` header
     * 
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions_Policy MDN Docs Referance}
     * 
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Permissions_Policy#allowlists MDN Docs Allowlist Referance}
     */
    interface PermissionPolicyObj {
        /** Whether or not the directive should be set to completely disable access to the feature */
        none?: boolean;
        /** Whether or not the directive should be set to allow access to the host for the feature */
        self?: boolean;
        /** Whether or not the directive should be set to allow access to any website for the feature */
        wildcard?: boolean;
        /** Whether or not the directive should be set to allow access to content from the same host as the source in `iframe` elements */
        src?: boolean;
        /** A list of domains that the directive should be set to allow access to */
        domains?: Array<string>;
    }
    /**
     * Web Security Class
     * 
     * This class contains a multitude of functions that allow for quick and easy generation of basic HTTP security headers
     * including, but not limited to;
     * - {@link WebSecurity.CSP Content Security Policy}
     * - {@link WebSecurity.CORS CORS Headers}
     * - {@link WebSecurity.HSTS HSTS Headers}
     * - {@link WebSecurity.ReportTo Reporting Headers}
     * - {@link WebSecurity.ReportingEndpoints Reporting Endpoints}
     */
    export class WebSecurity {
        /**
         * Content Security Policy
         * 
         * Used to generate a Content Security Policy
         * 
         * Returns a string that should be set as the value for the `Content-Security-Policy` header
         * @param CSPs The array of CSP Sectors to be used
         */
        static CSP: (...CSPs: Array<CSPObj>) => string;
        /**
         * CORS Headers
         * 
         * Used to generate CORS headers
         * 
         * Returns an array of strings formatted in the following way;
         * [Header Name, Header Value]
         * 
         * The Easiest way to use this function is to destructure the array into the headers object
         * and use the in-built Array.prototype.forEach() method to set the headers using the following code;
         * 
         * ```javascript
         * // ...
         * const app = express()
         * const { WebSecurity } = require('@therealbenpai/zdcors')
         * // ...
         * WebSecurity.CORS({ ... }).forEach(header => app.setHeader(header[0], header[1]))
         * // ...
         * ```
         * 
         * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS MDN Docs Referance}
         * @param accessControl The Access Control Directive Object
         * @param crossOrigin The Cross Origin Directive Object
         */
        static CORS: (accessControl: CorsAccessControlObj, crossOrigin: CorsCrossOriginObj) => Array<string>;
        /**
         * HSTS Headers
         * 
         * Used to generate HSTS headers
         * 
         * Returns a string that should be set as the value for the `Strict-Transport-Security` header
         * 
         * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security MDN Docs Referance}
         * @param hsts The HSTS Directive
         */
        static HSTS: (hsts: HSTSObj) => string;
        /**
         * Reporting Headers
         * 
         * Returns a string that should be set as the value for the `Report-To` header
         * 
         * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Report-To MDN Docs Referance}
         * @param data The array of Report-To Groups
         */
        static ReportTo: (...data: Array<ReportToGroup>) => string;
        /**
         * Reporting Endpoints
         * 
         * Returns a string that should be set as the value for the `Reporting-Endpoints` header
         * 
         * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Reporting-Endpoints MDN Docs Referance}
         * @param data The array of Reporting Endpoints
         */
        static ReportingEndpoints: (...data: Array<ReportingEndpoint>) => string;
        /**
         * Permission Policy
         * 
         * Returns a string that should be set as the value for the `Permissions-Policy` header
         * 
         * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions_Policy MDN Docs Referance}
         * @param data The array of Permission Policies
         */
        static PermissionPolicy: (...data: Array<PermissionPolicy>) => string;
        /**
         * Complete Domain Function
         * 
         * A utility function that takes in a domain and returns an array containing the domain and
         * the domain with a wildcard subdomain specifier
         * @param domain The domain to be used
        */
        static CD: (domain: string) => [string, string];
    }
    /**
     * Content Security Policy Object
     * 
     * An object that contains all the necessary information to setup a segment of the CSP header
     * 
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy MDN Docs Referance}
     */
    export class CSPObj {
        /** The Identifier of the specific CSP Sector */
        key: CSPSectors;
        /** Whether or not the sector should be set to completely disable access to the feature */
        none: boolean;
        /** A list of directives for the CSP sector */
        directives: Array<CSPDirectives | string>;
        /** Whether or not the sector should be set to allow access to the host for the feature */
        self: boolean;
        /** Whether or not the sector should be set to allow access to any website for the feature */
        wildcard: boolean;
        /** A list of domains that the sector should be set to allow access to */
        domains: Array<string>;
        /**
         * @param key The Identifier of the specific CSP Sector
         * @param none Whether or not the sector should be set to completely disable access to the feature
         * @param directives A list of directives for the CSP sector
         * @param self Whether or not the sector should be set to allow access to the host for the feature
         * @param wildcard Whether or not the sector should be set to allow access to any website for the feature
         * @param domains A list of domains that the sector should be set to allow access to
         */
        constructor(key: CSPSectors, none: boolean, directives: Array<CSPDirectives | string>, self: boolean, wildcard: boolean, domains: Array<string>)
    }
    /**
     * Report To Group
     * 
     * An object that contains all the necessary information to setup a segment of the Report-To header
     * 
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Report-To MDN Docs Referance}
     */
    export class ReportToGroup {
        /** The Identifier of the specific Report-To Group */
        group: string;
        /** The maximum age of the Report-To Group */
        maxAge: number;
        /** A list of endpoints for the Report-To Group */
        endpoints: Array<string>;
        /**
         * @param group The Identifier of the specific Report-To Group
         * @param maxAge The maximum age of the Report-To Group
         * @param endpoints A list of endpoints for the Report-To Group
         */
        constructor(group: string, maxAge: number, endpoints: Array<string>)
    }
    /**
     * Reporting Endpoint
     * 
     * An object that contains all the necessary information to setup a segment of the Reporting-Endpoints header
     * 
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Reporting-Endpoints MDN Docs Referance}
     */
    export class ReportingEndpoint {
        /** The Identifier of the specific Reporting Endpoint */
        id: string;
        /** The URL to send reports to */
        url: string;
        /**
         * @param id The Identifier of the specific Reporting Endpoint
         * @param url The URL to send reports to
         */
        constructor(id: string, url: string)
    }
    /**
     * Permission Policy Data
     * 
     * An object that contains all the necessary information to setup a segment of the Permission Policy header
     * 
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions_Policy MDN Docs Referance}
     */
    export class PermissionPolicy {
        /** The Identifier of the specific Permission Policy */
        key: PermissionPolicySectors;
        /** Whether or not the directive should be set to completely disable access to the PermissionPolicy */
        none: boolean;
        /** Whether or not the directive should be set to allow access to the host for the PermissionPolicy */
        self: boolean;
        /** Whether or not the directive should be set to allow access to any website for the PermissionPolicy */
        wildcard: boolean;
        /** Whether or not the directive should be set to allow access to content from the same host as the source in `iframe` elements */
        src: boolean;
        /** A list of domains that the directive should be set to allow access to */
        domains: Array<string>;
        /**
         * @param key The Identifier of the specific Permission Policy
         * @param data The data for the Permission Policy
         */
        constructor(key: PermissionPolicySectors, data: PermissionPolicyObj)
    }

    interface HeadersInterface {
        /** The array of CORS Headers */
        CORS: Array<string>;
        /** The HSTS Header */
        CSP: string;
        /** The Report-To Header */
        HSTS: string;
        /** The Reporting-Endpoints Header */
        ReportTo: string;
        /** The Permission Policy Header */
        ReportingEndpoints: string;
        /** The Permission Policy Header */
        PermissionPolicy: string;
    }

    /**
     * Headers Middleware
     * 
     * A middleware function that sets all the necessary headers for a secure web server
     * 
     * @param headers The Headers to be setup
     */
    export const Headers: (headers: HeadersInterface) => express.RequestHandler
}