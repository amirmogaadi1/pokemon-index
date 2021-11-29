import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

type CardProps = {
  key: string;
  name: string;
  image: string;
};

export const PokeCard: React.FC<CardProps> = ({ key, name, image }) => (
  <>
    <Grid key={key} item xs={2} sm={4} md={3}>
      <Link to={'/' + name}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="200"
            image={image}
            style={{ objectFit: 'contain' }}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ textAlign: 'center' }}
            >
              {name}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  </>
);
