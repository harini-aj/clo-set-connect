import { Grid } from "@mui/material"
import { ContentCard } from "./ContentCard"
import type { Content } from "../../types/content.types"
import type { ReactNode } from "react"

type ContentListContainerProps = {
    data? : Content[]
}

const ContentListContainer:React.FC<ContentListContainerProps> = ({ data }): ReactNode => {
    return (
        <>
            {(data && data.length > 0) && (data.length + " results")}
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

export default ContentListContainer