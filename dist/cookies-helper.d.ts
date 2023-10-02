export declare class CookiesHelper {
    getItem(sKey: string): string | null;
    setItem(sKey: string, sValue: string, vEnd: Date | number, sPath: string, sDomain: string, bSecure: boolean): boolean;
    removeItem(sKey: string, sPath: string, sDomain: string): boolean;
    hasItem(sKey: string): boolean;
    keys(): string[];
}
