import React, { Suspense, useCallback } from "react"
import { KeySearch } from "../../feature/key-search/KeySearch"
import ContentFilter from "../../feature/content-filter/ContentFilter"
import Box from '@mui/material/Box';
import { fetchContent } from "../../feature/content-list/contentSlice";
import { CircularProgress, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { lazy } from 'react';
const ContentListContainer = lazy(() => import("../../feature/content-list/ContentListContainer"));
import { useHomeState } from "./useHomeState";
import { constants } from "../../utils/constants";
import { LoadMoreTrigger } from "../../component/LoadMoreTrigger";

export const Home:React.FC = () => {
    const {loading,
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
        isFetchingMore} = useHomeState()

    const getErrorComponent = useCallback(() => {
        return <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="200px">
            <Typography color="error" variant="body1" sx={{ mb: 1 }}>
                Something went wrong while fetching content.
            </Typography>
            <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => dispatch(fetchContent({page: page, limit: constants.CONTENT_LIST_PAGE_LIMIT}))}
            >
                Retry
            </Typography>
        </Box>
    }, [dispatch, page])

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
                        {hasMore && <LoadMoreTrigger onVisible={fetchMore} />}
                        {isFetchingMore && (
                        <Box display="flex" justifyContent="center" mt={2}>
                            <CircularProgress size={20} />
                        </Box>)}
                    </Suspense>
                )}
            </Box>
        </Box>
    )
}