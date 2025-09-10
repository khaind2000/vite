/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

declare module 'virtual:pwa-register' {
    export interface RegisterSWOptions {
        immediate?: boolean;
        onRegistered?: (registration?: ServiceWorkerRegistration) => void;
        onNeedRefresh?: () => void;
        onOfflineReady?: () => void;
    }
    // registerSW returns a function to update the SW (or void)
    export function registerSW(options?: RegisterSWOptions): () => void;
    export default registerSW;
}