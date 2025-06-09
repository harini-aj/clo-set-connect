import React, { Suspense, useCallback, useEffect, useState, useMemo } from "react"
import { KeySearch } from "../feature/key-search/KeySearch"
import { ContentFilter } from "../feature/content-filter/ContentFilter"
import Box from '@mui/material/Box';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { fetchContent } from "../feature/content-list/contentSlice";
import { CircularProgress, FormControl, MenuItem, Select, Typography, type SelectChangeEvent } from "@mui/material";
import { lazy } from 'react';
import useDebounce from "../hooks/useDebounce";
const ContentListContainer = lazy(() => import("../feature/content-list/ContentListContainer"));
import { useSearchParams } from 'react-router-dom'

type sortByType = "0" | "1" | "2"

export const Home:React.FC = () => {
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

    useEffect(() => {
        dispatch(fetchContent())
    }, [dispatch])

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

    const getErrorComponent = useCallback(() => {
        return <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="200px">
            <Typography color="error" variant="body1" sx={{ mb: 1 }}>
                Something went wrong while fetching content.
            </Typography>
            <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => dispatch(fetchContent())}
            >
                Retry
            </Typography>
        </Box>
    }, [dispatch])

    const getLoadingProgressComponent = useCallback(() => {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
    }, [])

    return (
        <Box display="flex" flexDirection="column" flex={1} sx={{ marginX: '50px'}}>
            <KeySearch 
                searchText={key} 
                onTextChange={(value) => setKey(value)}
            />

            <Box display="flex" flexDirection="column" flex={1}>
                <ContentFilter 
                    isPaid={isPaid} 
                    isFree={isFree} 
                    isViewOnly={isViewOnly}
                    priceRange={[minPrice, maxPrice]}
                    minRange = {minPriceRange}
                    maxRange = {maxPriceRange}
                    onPaidChange={() => setPaid(prev => !prev)}
                    onFreeChange={() => setFree(prev => !prev)}
                    onViewOnlyChange={() => setViewOnly(prev => !prev)}
                    onReset={handleReset}
                    onPriceRangeChange={handlePriceRangeChange}
                />
            </Box>

            <FormControl variant="standard" sx={{ ml: 'auto', minWidth: 120 , maxWidth: 220 }}>
                 <Select
                    labelId="sort-label"
                    id="sort-select"
                    value={sortBy}
                    onChange={handleSortByChange}
                >
                    <MenuItem value={"0"}>Name</MenuItem>
                    <MenuItem value={"1"}>Price: High to low</MenuItem>
                    <MenuItem value={"2"}>Price: Low to high</MenuItem>
                </Select>
            </FormControl>
           
            <Box display="flex" flexDirection="column" flex={1}>
                { !loading && error && ( getErrorComponent())}
                { loading && ( getLoadingProgressComponent()) }
                { !loading && (
                    <Suspense fallback={getLoadingProgressComponent()}>
                        <ContentListContainer data={sortedData}/>
                    </Suspense>
                )}
            </Box>
        </Box>
    )
}