import {useEffect, useState} from "react";

const FAVICON_SIZE = '32';

const mockChrome = {
    storage: {
        local: {
            get: (key, fn) => {
                const value = window.localStorage.getItem(key);
                fn(value && {[key]: JSON.parse(value)})
            },
            set: (data, fn) => {
                Object.keys(data).forEach(key => window.localStorage.setItem(key, JSON.stringify(data[key])));
                fn && fn();
            }
        }
    },
    tabs: {update: ({url}) => window.location.href = url},
    topSites: {
        get: (fn) => fn([
            {title: 'Facebook', url: 'https://www.facebook.com/'},
            {title: 'LinkedIn', url: 'https://www.linkedin.com/'},
            {title: 'YouTube', url: 'https://www.youtube.com/'},
            {title: 'Twitter', url: 'https://twitter.com/'},
            {title: 'Drive', url: 'https://drive.google.com/'},
        ])
    }
};

const favIconUrls = {
    Chrome: (site) => {
        const url = new URL(chrome.runtime.getURL('/_favicon/'));
        url.searchParams.set('pageUrl', site.url); // this encodes the URL as well
        url.searchParams.set('size', FAVICON_SIZE);
        // `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(site.url)}&size=32`
        return url.toString();
    },
    Firefox: (site) => "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url="
        + encodeURIComponent(site.url) + "&size=" + FAVICON_SIZE,
    Default: (site) => "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url="
        + encodeURIComponent(site.url) + "&size=" + FAVICON_SIZE
};

const usersBrowserName = () => {
    const browserInfo = navigator.userAgent;
    if (browserInfo.includes('Chrome')) {
        return 'Chrome';
    } else if (browserInfo.includes('Firefox')) {
        return 'Firefox';
    } else {
        return 'Chrome';
    }
}

export const favIconUrl = site => {
    const browserName = usersBrowserName();
    if (process.env.REACT_APP_PRODUCTION === 'true') {
        return favIconUrls[browserName](site);
    } else {
        return favIconUrls.Default(site);
    }
}

export const chrome = window.chrome?.storage ? window.chrome : mockChrome;
export const useLocalStorage = (key, fallback) => {
    const [value, setValue] = useState(fallback);
    const [done, setDone] = useState(false);

    useEffect(() => {
        chrome.storage.local.get([key], (result) => {
            setDone(true);
            if (result && result[key] !== undefined) {
                setValue(result[key]);
            }
        });
    }, [key]); // Added key as a dependency

    const saveValue = (newValue) => {
        if (newValue === undefined || newValue === null) {
            console.warn(`Skipping save: invalid value for key "${key}"`, newValue);
            return;
        }
        chrome.storage.local.set({[key]: newValue}, () => {
            setValue(newValue);
        });
    };

    return [value ?? fallback, saveValue, done]; // Ensure value is never undefined
};


