export declare function useQuery<I extends unknown[], T>(fn: (...input: I) => Promise<T>): {
    start: (...input: I) => void;
    data?: T;
    error?: unknown;
    isLoading: boolean;
};
//# sourceMappingURL=use-query.d.ts.map