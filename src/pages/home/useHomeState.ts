import { useCallback, useEffect, useState, useMemo } from "react"
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchContent } from "../../feature/content-list/contentSlice";
import { type SelectChangeEvent } from "@mui/material";
import useDebounce from "../../hooks/useDebounce";
import { useSearchParams } from 'react-router-dom'
import { constants } from "../../utils/constants";

export type sortByType = "0" | "1" | "2"

export const useHomeState = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isPaid, setPaid] = useState<boolean>(searchParams.get('isPaid') === "true" ? true : false)
    const [isFree, setFree] = useState<boolean>(searchParams.get('isFree') === "true" ? true : false)
    const [isViewOnly, setViewOnly] = useState<boolean>(searchParams.get('isViewOnly') === "true" ? true : false)
    const [key, setKey] = useState<string>(searchParams.get('key') || "")
    const [sortBy, setSortBy] = useState<sortByType>(searchParams.get('sortBy') as sortByType || "0")
    const [minPrice, setMinPrice] = useState<number>(Number(searchParams.get('minPrice') || "0"))
    const [maxPrice, setMaxPrice] = useState<number>(Number(searchParams.get('maxPrice') || "Infinity"))

    const debouncedMinPrice = useDebounce(minPrice, 500)
    const debouncedMaxPrice = useDebounce(maxPrice, 500)
    const debouncedKey = useDebounce(key, 300);
    const {items, loading, error} = useAppSelector((state) => state.content)
    const dispatch = useAppDispatch()
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    useEffect(() => {
        dispatch(fetchContent({page: page, limit:constants.CONTENT_LIST_PAGE_LIMIT}))
    }, [dispatch, page])

    useEffect(() => {
        const params = new URLSearchParams();

        params.set("isPaid", isPaid ? "true" : "false")
        params.set("isFree", isFree ? "true" : "false")
        params.set("isViewOnly", isViewOnly ? "true" : "false")
        params.set("key", debouncedKey)
        params.set("sortBy", sortBy)
        params.set("minPrice", minPrice.toString())
        params.set("maxPrice", maxPrice.toString())

        setSearchParams(params, { replace: true });

    }, [isPaid, isFree, isViewOnly, debouncedKey, sortBy, minPrice, maxPrice, setSearchParams])

    const filteredData = useMemo(() => {
        const start = performance.now()
        let filtered = items;
        if (isPaid || isFree || isViewOnly) {
            filtered = items.filter(item => {
                return (
                    ((isPaid && item.pricingOption === 0) ||
                    (isFree && item.pricingOption === 1) ||
                    (isViewOnly && item.pricingOption === 2)) &&
                    item.price >= debouncedMinPrice && 
                    item.price <= debouncedMaxPrice
                );
            });
        }
        if (debouncedKey.trim()) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(debouncedKey.toLowerCase()) ||
                item.creator.toLowerCase().includes(debouncedKey.toLowerCase())
            );
        }
        const end = performance.now()
        console.log(`Filtering took ${(end - start)} ms`, isPaid, isFree, isViewOnly, debouncedKey);
        return filtered;
    }, [items, isPaid, isFree, isViewOnly, debouncedMinPrice, debouncedMaxPrice, debouncedKey]);

    const sortedData = useMemo(()=> {
        const dataToSort = [...filteredData]; 
        if(sortBy === "0") 
            return dataToSort.sort((a,b) => a.title?.localeCompare(b.title || ""))
        else if(sortBy === "1")
            return dataToSort.sort((a,b) => b.price - a.price)
        else
            return dataToSort.sort((a,b) => a.price - b.price)
    }, [sortBy, filteredData])

    const minPriceRange = useMemo(() => {
        return (items.length > 0) ? Math.min(...items.map(item => item.price)) : 0
    }, [items])

    const maxPriceRange = useMemo(() => {
        return (items.length > 0) ? Math.max(...items.map(item => item.price)) : 0
    }, [items])

    const handleReset = useCallback (() => {
        setPaid(false)
        setFree(false)
        setViewOnly(false)
        setMinPrice(minPriceRange)
        setMaxPrice(maxPriceRange)
    }, [maxPriceRange, minPriceRange])

    const handleSortByChange = useCallback ((e: SelectChangeEvent) => {
        setSortBy(e.target.value as sortByType)
    }, [])

    const handlePriceRangeChange = useCallback ((_event: Event, newValue: number[], activeThumb: number) => {
       if(newValue[0] < newValue[1]){
            if(activeThumb == 0){
                setMinPrice(newValue[0])
            } else {
                setMaxPrice(newValue[1])
            }
        }
    }, [])

    const fetchMore = async () => {
        if (!hasMore || isFetchingMore) return;
        setIsFetchingMore(true);
        const newPage = page + 1;

        const result = await dispatch(fetchContent({ page: newPage, limit: constants.CONTENT_LIST_PAGE_LIMIT }));
        if (result.payload) setHasMore(false);
        else setPage(newPage);

        setIsFetchingMore(false);
    };

    return {
        loading,
        error,
        sortedData,
        key,
        isPaid,
        isFree,
        isViewOnly,
        sortBy,
        minPrice,
        maxPrice,
        minPriceRange,
        maxPriceRange,
        setKey,
        setPaid,
        setFree,
        setViewOnly,
        handleReset,
        handlePriceRangeChange,
        handleSortByChange,
        dispatch,
        page,
        fetchMore,
        hasMore,
        isFetchingMore
    }
}