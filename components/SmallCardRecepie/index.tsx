import { Recepie } from "@/models/Recepie";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const SmallCardRecepie = ({ recipe }: { recipe: Recepie }) => {
  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <CardActionArea sx={{ minHeight: 150 }}>
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {recipe.type}
          </Typography>
          <Typography variant="h5" component="div">
            {recipe.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {recipe.createdAt?.toString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SmallCardRecepie;
