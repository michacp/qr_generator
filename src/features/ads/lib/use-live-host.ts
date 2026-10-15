import { useSyncExternalStore } from "react";
import { siteConfig } from "@/features/seo";

const LIVE_HOST = new URL(siteConfig.url).hostname;

const subscribe = () => () => { };

export function useIsLiveHost(): boolean {
    return useSyncExternalStore(
        subscribe,
        () => window.location.hostname === LIVE_HOST,
        () => false, // en el servidor nunca es "en vivo"
    );
}