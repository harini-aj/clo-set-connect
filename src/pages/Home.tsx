import React, { useCallback, useEffect, useState } from "react"
import { KeySearch } from "../feature/key-search/KeySearch"
import { ContentFilter } from "../feature/content-filter/ContentFilter"
import { ContentListContainer } from "../feature/content-list/ContentListContainer"
import Box from '@mui/material/Box';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { fetchContent } from "../feature/content-list/contentSlice";
import { CircularProgress, Typography } from "@mui/material";

export const Home:React.FC = () => {
    const [isPaid, setPaid] = useState<boolean>(false)
    const [isFree, setFree] = useState<boolean>(false)
    const [isViewOnly, setViewOnly] = useState<boolean>(false)
    const [key, setKey] = useState<string>("")
    const {items, loading, error} = useAppSelector((state) => state.content)
    const dispatch = useAppDispatch()
    const [filteredData, setFilteredData] = useState<typeof items>(items)

    useEffect(() => {
        dispatch(fetchContent())
    }, [dispatch])

    useEffect(() => {
        let filtered = items;
        if(isPaid || isFree || isViewOnly){
            filtered = items.filter((item) => {
                let include = false
                if(item.pricingOption === 0 && isPaid) {
                    include = true
                }
                if(item.pricingOption === 1 && isFree) {
                    include = true
                }
                if(item.pricingOption === 2 && isViewOnly) {
                    include = true
                }
                return include
            })
        }
        
        if(key.trim() !== ""){
            filtered = filtered.filter((item) =>  
                item.title.toLowerCase().indexOf(key.toLowerCase()) > -1 ||  
                item.creator.toLowerCase().indexOf(key.toLowerCase()) > -1
            )
        }
        setFilteredData([...filtered])

    }, [isPaid, isFree, isViewOnly, key, items])

    const handleReset = useCallback (() => {
        setPaid(false)
        setFree(false)
        setViewOnly(false)
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
        <Box display="flex" flexDirection="column" flex={1} sx={{ margin: '15px'}}>
            <KeySearch 
                searchText={key} 
                onTextChange={(value) => setKey(value)}
            />
            <Box display="flex" flexDirection="column" flex={1} sx={{ margin: '15px'}}>
                <ContentFilter 
                    isPaid={isPaid} 
                    isFree={isFree} 
                    isViewOnly={isViewOnly} 
                    onPaidChange={() => setPaid(prev => !prev)}
                    onFreeChange={() => setFree(prev => !prev)}
                    onViewOnlyChange={() => setViewOnly(prev => !prev)}
                    onReset={handleReset}
                />
            </Box>
            { !loading && (<ContentListContainer data={filteredData}/>) }
            { !loading && error && ( getErrorComponent())}
            { loading && ( getLoadingProgressComponent()) }
        </Box>
    )
}