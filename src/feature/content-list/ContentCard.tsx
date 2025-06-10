import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { Content } from '../../types/content.types';
import { Box } from '@mui/material';

export type ContentCardProps = {
    data?: Content
}

const getPriceTypography = (data: Content) => {
    return <Typography variant="h6" flex={1} gutterBottom sx={{ ml: "auto"}} >
            { data.pricingOption === 0 && (<>${data.price}</>)}
        </Typography>
}

const getFreeViewOnlyTypography = (data: Content) => {
    return <Typography variant="subtitle1" flex={1} gutterBottom sx={{ ml: "auto"}} >
            { (data.pricingOption === 1) ? "Free" : "View Only" }
        </Typography>
}

export const ContentCard:React.FC<ContentCardProps> = ({ data }) => {
  return data && (
     <Card sx={{ maxWidth: 245 }} key={data.id}>
      <CardMedia
        sx={{ height: 240 }}
        image={data.imagePath}
        title={data.title}
      />
      <CardContent sx={{ display: "flex"}}>
        <Box  flex={5} sx={{ display: "flex", flexDirection:"column" }}>
            <Typography variant="caption" gutterBottom>
                {data.title}
            </Typography>
            <Typography variant="caption" gutterBottom sx={{ fontSize: 9}}>
                {data.creator}
            </Typography>
        </Box>
        { data.pricingOption === 0 && (getPriceTypography(data))}
        { (data.pricingOption === 1 || data.pricingOption === 2) && ( getFreeViewOnlyTypography(data))}
      </CardContent>
    </Card>
  );
}