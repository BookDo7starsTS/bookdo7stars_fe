import { Review } from '@/app/models/review';
import { Avatar, Box, Card, Typography, Container } from '@mui/material';

type ReviewCardProps = {
  review: Review;
};
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      marginRight: '1rem',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const ReviewCard = (props: ReviewCardProps) => {
  const { review } = props;

  return (
    <Container>
      <Card
        sx={{
          marginBottom: '1rem',
          padding: '1rem',
          boxShadow: 3,
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <Avatar alt={review.user.name} {...stringAvatar(`${review.user.name}`)} />
          <Typography variant="body1">{review.content}</Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default ReviewCard;
