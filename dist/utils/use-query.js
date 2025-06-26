import { useMemo, useRef, useState } from 'react';
export function useQuery(fn) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState();
    const fnRef = useRef(fn);
    fnRef.current = fn;
    return useMemo(() => ({
        isLoading: loading,
        data,
        error,
        start(...input) {
            setLoading(true);
            void fnRef
                .current(...input)
                .then((res) => {
                setData(res);
                setError(undefined);
            })
                .catch((err) => {
                setData(undefined);
                setError(err);
            })
                .finally(() => {
                setLoading(false);
            });
        },
    }), [error, data, loading]);
}
