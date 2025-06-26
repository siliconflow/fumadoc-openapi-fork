import { createProxy } from '../server/proxy.js';
export function createOpenAPI(options = {}) {
    return {
        createProxy,
        getAPIPageProps(props) {
            return {
                ...options,
                ...props,
            };
        },
    };
}
