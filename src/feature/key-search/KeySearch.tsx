import { InputAdornment, TextField, type SxProps, type Theme } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { type ChangeEvent } from "react";

type props = {
    sx?: SxProps<Theme>;
    searchText: string;
    onTextChange: (value: string) => void;
}

export const KeySearch:React.FC<props> = ({ 
    sx, 
    searchText,
    onTextChange
 }) => {

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        onTextChange(e.target.value)
    }

    return (
        <>
            <TextField sx={sx} value={searchText} onChange={handleTextChange}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">
                                        <SearchIcon/>
                                      </InputAdornment>,
                    },
                }}
            />
        </>
    )
}