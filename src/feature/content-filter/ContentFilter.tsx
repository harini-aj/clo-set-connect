import { Button, FormControlLabel, Slider, Typography } from "@mui/material"
import { Box } from "@mui/system";
import type React from "react";
import Checkbox from '@mui/material/Checkbox';


export type ContentFilterProps = {
    isPaid: boolean;
    isFree: boolean;
    isViewOnly: boolean;
    priceRange: number[];
    minRange: number;
    maxRange: number;
    onPaidChange: () => void;
    onFreeChange: () => void;
    onViewOnlyChange: () => void;
    onPriceRangeChange: (event: Event, value: number[], activeThumb: number) => void
    onReset: ()=> void;
}

const ContentFilter:React.FC<ContentFilterProps> = ({
    isPaid, 
    isFree,  
    isViewOnly, 
    onPaidChange, 
    onFreeChange, 
    onViewOnlyChange,
    priceRange,
    minRange,
    maxRange,
    onReset,
    onPriceRangeChange
}) => {
    return (
        <Box sx={{ display: "flex"}}>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            Pricing Options
            </Typography>
            <FormControlLabel
                control={<Checkbox checked={isPaid} onChange={onPaidChange} />}
                label="Paid"
                labelPlacement="end"
                />
            <FormControlLabel
                control={<Checkbox checked={isFree} onChange={onFreeChange} />}
                label="Free"
                labelPlacement="end"
                />
            <FormControlLabel
                control={<Checkbox checked={isViewOnly} onChange={onViewOnlyChange} />}
                label="View Only"
                labelPlacement="end"
                />
            <Box sx={{ width: 200, marginTop: 1}}>
                <Slider
                    name = "price-silder"
                    size="small"
                    defaultValue={[minRange, maxRange]}
                    aria-label="Price Range Slider"
                    valueLabelDisplay="auto"
                    value = {priceRange}
                    onChange={onPriceRangeChange}
                    min={minRange}
                    max={maxRange}
                />
            </Box>
            
            <Button variant="text" sx={{ ml: "auto" }} onClick={onReset}>RESET</Button>
        </Box>
    )
}

export default ContentFilter