import { Review } from '@/app/models/review';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Card, Typography, Container, IconButton, TextField, Button } from '@mui/material';

type ReviewCardProps = {
  review: Review;
  handleEditReview: (reviewId: string) => void;
  handleDeleteReview: (reviewId: string) => void;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnClick: () => void;
  handleOnClickCancel: () => void;
  isEditing: boolean;
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
  const { review, handleEditReview, handleDeleteReview, isEditing, handleOnChange, handleOnClick, handleOnClickCancel } = props;

  const date = review.createdAt === review.updatedAt ? review.createdAt : review.updatedAt;
  const isUpdated = review.createdAt !== review.updatedAt;
  return (
    <Container>
      <Card
        sx={{
          marginBottom: '1rem',
          padding: '1rem',
          boxShadow: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <Avatar alt={review.user.name} {...stringAvatar(`${review.user.name}`)} />
          {!isEditing ? (
            <>
              <Typography variant="body1">{review.content}</Typography>
              {isUpdated && <span style={{ marginLeft: '0.5rem', color: 'gray' }}>(수정됨)</span>}
            </>
          ) : (
            <Box>
              <TextField value={review} onChange={handleOnChange} fullWidth variant="outlined" />
              <Button variant="outlined" onClick={handleOnClick}>
                Edit
              </Button>
              <Button variant="outlined" onClick={handleOnClickCancel}>
                Cancel
              </Button>
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <IconButton aria-label="edit" color="primary" onClick={() => handleEditReview(review.id)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" color="primary" sx={{ marginRight: '1rem' }} onClick={() => handleDeleteReview(review.id)}>
            <DeleteIcon />
          </IconButton>
          <Typography>{date.toLocaleString().slice(0, 10)}</Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default ReviewCard;
