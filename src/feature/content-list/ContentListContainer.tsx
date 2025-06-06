import { Grid } from "@mui/material"
import { ContentCard } from "./ContentCard"
import type { Content } from "../../types/content.types"

type props = {
    data? : Content[]
}

export const ContentListContainer:React.FC<props> = ({ data }) => {
    return (
        <>
            <Grid container spacing={{ md: 3, lg: 4 }}>
                {(data || []).map((item, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6,  md: 4, lg: 3 }}>
                        <ContentCard data={item}/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}