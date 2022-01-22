import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { Injectable, PLATFORM_ID, Inject } from "@angular/core";

@Injectable(
    {
        providedIn: `root`
    }
)
export class LocalRepository {
    private isInBrowser: boolean;
    private isLocalStorageSupported: boolean;
    /**
     * Provided By MH
     */
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.isInBrowser = isPlatformBrowser(this.platformId);
        this.isLocalStorageSupported = typeof (localStorage) !== "undefined";
    }

    public get IsInMobile(): boolean {
        let userAgent = navigator.userAgent || navigator.vendor;
        let mobile = /android/i.test(userAgent) || /iPhone|ipad|iPod/i.test(userAgent);
        return mobile;
    }

    public get IsInBrowser(): boolean {
        return this.isInBrowser;
    }

    public get getWindow(): Window | any {
        return this.document.defaultView;
    }

    public get getDocument(): Document {
        return this.document;
    }

    // /**
    //  * stores data into localStorage by taking care of SSR
    //  * @param key for reference to date
    //  * @param value data to be stored
    //  */
    public setItem(key: string, value: string) {
        if (this.isInBrowser && this.isLocalStorageSupported)
            localStorage.setItem(key, value);
    }

    public setItemAs<T>(key: string, value: T) {
        if (this.isInBrowser && this.isLocalStorageSupported) {
            const data = JSON.stringify(value);
            localStorage.setItem(key, data);
        }
    }

    // /**
    //  * get data from localStorage by taking care of SSR
    //  * @param key for reference key to retrive value
    //  */
    public getItem(key: string): string | undefined {
        if (this.isInBrowser && this.isLocalStorageSupported) {
            return localStorage.getItem(key) || undefined
        }
        return undefined;
    }

    public getItemAs<T>(key: string): T | undefined {
        let data: T;
        if (this.isInBrowser && this.isLocalStorageSupported) {
            const foundItem = localStorage.getItem(key) || '';
            data = JSON.parse(foundItem) as T;
            return data
        }
        return undefined;
    }

    // /**
    //  * Clear local Storage
    //  */
    public clear() {
        if (this.isInBrowser && this.isLocalStorageSupported)
            localStorage.clear();
    }

    // /**
    //  * remove local Storage
    //  * @param key for reference key to remove value
    //  */
    public remove(key: string) {
        if (this.isInBrowser && this.isLocalStorageSupported)
            localStorage.removeItem(key);
    }

}