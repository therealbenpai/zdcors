import { IncomingMessage, OutgoingMessage } from 'http'

/**
 * Module: `@therealbenpai/zdcors`
 * 
 * This module is a HTTP Security Headers generator that allows for quick and easy generation of basic HTTP security headers.
 * 
 * This module is designed to be used in a Node.js environment and is not intended for use in a browser environment.
 * 
 * The module follows the specifications set forth by the Mozilla Developer Network (MDN) and the World Wide Web Consortium (W3C).
 */
declare module '@therealbenpai/zdcors' {
    declare type CSPSectors = 'imgSrc' | 'fontSrc' | 'baseUri' | 'mediaSrc' | 'childSrc' | 'reportTo' | 'styleSrc' | 'objectSrc' | 'reportUri' | 'scriptSrc' | 'defaultSrc' | 'connectSrc' | 'formAction' | 'prefetchSrc' | 'manifestSrc' | 'blockAllMixedContent' | 'requireTrustedTypesFor' | 'upgradeInsecureRequests'
    declare type CSPDirectives = 'unsafe-inline' | 'unsafe-eval' | 'unsafe-hashes' | 'strict-dynamic'
    declare type PermissionPolicySectors = 'hid' | 'usb' | 'midi' | 'camera' | 'serial' | 'battery' | 'gamepad' | 'payment' | 'autoplay' | 'webShare' | 'bluetooth' | 'gyroscope' | 'fullscreen' | 'localFonts' | 'microphone' | 'geolocation' | 'magnetometer' | 'accelerometer' | 'idleDetection' | 'storageAccess' | 'browsingTopics' | 'screenWakeLock' | 'otpCredentials' | 'display-capture' | 'document-domain' | 'encrypted-media' | 'windowManagement' | 'pictureInPicture' | 'speakerSelection' | 'xrSpacialTracking' | 'ambientLightSensor' | 'identityCredentialsGet' | 'publickeyCredentialsGet' | 'executionWhileNotRendered' | 'publickeyCredentialsCreate' | 'executionWhileOutOfViewport'
    /**
     * CORS Access Control Object
     * 
     * An object that contains all the necessary information to set the CORS `Access-Control-*` headers
     */
    declare interface CorsAccessControlObj {
        /**
         * Access Control Expose Headers
         * 
         * Used to set the `Access-Control-Expose-Headers` header
         * 
         * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers)
         */
        exposeHeaders: Array<string>
        /**
         * Access Control Allow Methods
         * 
         * Used to set the `Access-Control-Allow-Methods` header
         * 
         * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods)
         */
        allowMethods: Array<string>
        /**
         * Access Control Allow Headers
         * 
         * Used to set the `Access-Control-Allow-Headers` header
         * 
         * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers)
         */
        allowHeaders: Array<string>
        /**
         * Access Control Max Age
         * 
         * Used to set the `Access-Control-Max-Age` header
         * 
         * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age)
         */
        maxAge: number
        /**
         * Access Control Allow Origin
         * 
         * Used to set the `Access-Control-Allow-Origin` header
         * 
         * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)
         */
        allowOrigin: string
        /**
         * Access Control Allow Credentials
         * 
         * Used to set the `Access-Control-Allow-Credentials` header
         * 
         * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)
         */
        allowCredentials: boolean
    }
    /**
     * CORS Cross Origin Object
     * 
     * An object that contains all the necessary information to set the CORS `Cross-Origin-*` headers
     */
    declare interface CorsCrossOriginObj {
        /**
         * CORS Origin
         * 
         * Used to set the `Cross-Origin-Opener-Policy` header
         * 
         * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)
         */
        openerPolicy: 'same-origin' | 'same-site' | 'cross-origin'
        /**
         * CORS Method
         * 
         * Used to set the `Cross-Origin-Resource-Policy` header
         * 
         * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy)
         */
        resourcePolicy: 'same-origin' | 'same-site' | 'cross-origin'
        /**
         * CORS Embedder
         * 
         * Used to set the `Cross-Origin-Embedder-Policy` header
         * 
         * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)
         */
        embedderPolicy: 'same-origin' | 'same-site' | 'cross-origin'
    }
    /**
     * HSTS Header Object
     * 
     * An object that contains all the necessary information to set the HSTS (`Strict-Transport-Security`) header
     * 
     * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)
     */
    declare interface HSTSObj {
        /** Max Age of the HSTS Policy */
        ma: number
        /** Whether or not the HSTS Policy should includes subdomains */
        iSD: boolean
        /** Whether or not the HSTS Policy should include preloading capabilities */
        pl: boolean
    }
    /**
     * Permission Policy Object
     * 
     * An object that contains all the necessary information to specify a Permission Policy directive for usage
     * in the `Permissions-Policy` header
     * 
     * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions_Policy)
     * 
     * [MDN Docs Allowlist Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Permissions_Policy#allowlists)
     */
    declare interface PermissionPolicyObj {
        /** Whether or not the directive should be set to completely disable access to the feature */
        none?: boolean
        /** Whether or not the directive should be set to allow access to the host for the feature */
        self?: boolean
        /** Whether or not the directive should be set to allow access to any website for the feature */
        wildcard?: boolean
        /** Whether or not the directive should be set to allow access to content from the same host as the source in `iframe` elements */
        src?: boolean
        /** A list of domains that the directive should be set to allow access to */
        domains?: Array<string>
    }
    /**
     * Web Security Class
     * 
     * This class contains a multitude of functions that allow for quick and easy generation of basic HTTP security headers
     * including, but not limited to;
     * - Content Security Policy
     * - CORS Headers
     * - HSTS Headers
     * - Reporting Headers
     * - Permission Policy Headers
     */
    export declare class WebSecurity {
        /**
         * Content Security Policy
         * 
         * Used to generate a Content Security Policy
         * 
         * Returns a string that should be set as the value for the `Content-Security-Policy` header
         */
        static CSP: (
            /** The array of CSP Sectors to be used */
            ...CSPs: CSPObj
        ) => string;
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
         * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
         */
        static CORS: (
            /** The Access Control Directive Object */
            accessControl: CorsAccessControlObj,
            /** The Cross Origin Directive bject */
            crossOrigin: CorsCrossOriginObj
        ) => Array<string>;
        /**
         * HSTS Headers
         * 
         * Used to generate HSTS headers
         * 
         * Returns a string that should be set as the value for the `Strict-Transport-Security` header
         * 
         * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)
         */
        static HSTS: (
            /** The HSTS Directive */
            hsts: HSTSObj
        ) => string;
        /**
         * Reporting Headers
         * 
         * Returns a string that should be set as the value for the `Report-To` header
         * 
         * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Report-To)
         */
        static ReportTo: (
            /** The array of Report-To Groups */
            ...data: ReportToGroup
        ) => string;
        /**
         * Reporting Endpoints
         * 
         * Returns a string that should be set as the value for the `Reporting-Endpoints` header
         * 
         * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Reporting-Endpoints)
         */
        static ReportingEndpoints: (
            /** The array of Reporting Endpoints */
            ...data: ReportingEndpoint
        ) => string;
        /**
         * Permission Policy
         * 
         * Returns a string that should be set as the value for the `Permissions-Policy` header
         * 
         * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions_Policy)
         */
        static PermissionPolicy: (
            /** The array of Permission Policies */
            ...data: PermissionPolicy
        ) => string;
        /**
         * Complete Domain Function
         * 
         * A utility function that takes in a domain and returns an array containing the domain and
         * the domain with a wildcard subdomain specifier
         */
        static CD: (
            /** The domain to be used */
            domain: string
        ) => [string, string];
    }
    /**
     * Content Security Policy Object
     * 
     * An object that contains all the necessary information to setup a segment of the CSP header
     * 
     * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)
     */
    export declare class CSPObj {
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
        constructor(
            /** The Identifier of the specific CSP Sector */
            key: CSPSectors,
            /** Whether or not the sector should be set to completely disable access to the feature */
            none: boolean,
            /** A list of directives for the CSP sector */
            directives: Array<CSPDirectives | string>,
            /** Whether or not the sector should be set to allow access to the host for the feature */
            self: boolean,
            /** Whether or not the sector should be set to allow access to any website for the feature */
            wildcard: boolean,
            /** A list of domains that the sector should be set to allow access to */
            domains: Array<string>
        )
    }
    /**
     * Report To Group
     * 
     * An object that contains all the necessary information to setup a segment of the Report-To header
     * 
     * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Report-To)
     */
    export declare class ReportToGroup {
        /** The Identifier of the specific Report-To Group */
        group: string;
        /** The maximum age of the Report-To Group */
        maxAge: number;
        /** A list of endpoints for the Report-To Group */
        endpoints: Array<string>;
        constructor(
            /** The Identifier of the specific Report-To Group */
            group: string,
            /** The maximum age of the Report-To Group */
            maxAge: number,
            /** A list of endpoints for the Report-To Group */
            endpoints: Array<string>,
        )
    }
    /**
     * Reporting Endpoint
     * 
     * An object that contains all the necessary information to setup a segment of the Reporting-Endpoints header
     * 
     * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Reporting-Endpoints)
     */
    export declare class ReportingEndpoint {
        /** The Identifier of the specific Reporting Endpoint */
        id: string;
        /** The URL to send reports to */
        url: string;
        constructor(
            id: string,
            url: string
        )
    }
    /**
     * Permission Policy Data
     * 
     * An object that contains all the necessary information to setup a segment of the Permission Policy header
     * 
     * [MDN Docs Referance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions_Policy)
     */
    export declare class PermissionPolicy {
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
        constructor(
            /** The Identifier of the specific Permission Policy */
            key: PermissionPolicySectors,
            /** The data for the Permission Policy */
            data: PermissionPolicyObj
        )
    }

    declare interface HeadersInterface {
        /** The array of CORS Headers */
        CORS: Array<string>
        /** The HSTS Header */
        CSP: string
        /** The Report-To Header */
        HSTS: string
        /** The Reporting-Endpoints Header */
        ReportTo: string
        /** The Permission Policy Header */
        ReportingEndpoints: string
        /** The Permission Policy Header */
        PermissionPolicy: string
    }

    export declare const Headers: (
        /** The Headers to be setup */
        headers: HeadersInterface
    ) => (_req: IncomingMessage, res: OutgoingMessage, next: () => void) => void
}