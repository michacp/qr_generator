export type BannerAdConfig = {
    key: string;
    width: number;
    height: number;
    scriptSrc: string;
};

export type NativeAdConfig = {
    key: string;
    scriptSrc: string;
};

const NATIVE_HOST = "https://pl31838729.profitableratecpmnetwork.com";
const BANNER_HOST = "https://www.highrevenueformat.com";

const NATIVE_KEY = "3eec15aeafd7da080e34fa67179c30ad";
const BANNER_728_KEY = "63294694c0a16a3f4fbc88aedcd61c25";
const BANNER_320_KEY = "74c5f441c871065f36dc341a2c08be31";

export const ADS: {
    native: NativeAdConfig;
    banner728: BannerAdConfig;
    banner320: BannerAdConfig;
} = {
    native: {
        key: NATIVE_KEY,
        scriptSrc: `${NATIVE_HOST}/${NATIVE_KEY}/invoke.js`,
    },
    banner728: {
        key: BANNER_728_KEY,
        width: 728,
        height: 90,
        scriptSrc: `${BANNER_HOST}/${BANNER_728_KEY}/invoke.js`,
    },
    banner320: {
        key: BANNER_320_KEY,
        width: 320,
        height: 50,
        scriptSrc: `${BANNER_HOST}/${BANNER_320_KEY}/invoke.js`,
    },
};