import { Button, FormControlLabel, Typography, type SxProps, type Theme } from "@mui/material"
import { Box } from "@mui/system";
import type React from "react";
import Checkbox from '@mui/material/Checkbox';


type props = {
    sx?: SxProps<Theme>;
    isPaid: boolean;
    isFree: boolean;
    isViewOnly: boolean;
    onPaidChange: () => void;
    onFreeChange: () => void;
    onViewOnlyChange: () => void;
    onReset: ()=> void;
}

export const ContentFilter:React.FC<props> = ({ 
    isPaid, 
    isFree,  
    isViewOnly, 
    onPaidChange, 
    onFreeChange, 
    onViewOnlyChange,
    onReset
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
            <Button variant="text" sx={{ ml: "auto" }} onClick={onReset}>RESET</Button>
        </Box>
    )
}