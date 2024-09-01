import { Paper } from '@mui/material';

interface BookCoverProps {
  cover: string;
}

const BookCover: React.FC<BookCoverProps> = ({ cover }) => {
  return (
    <Paper elevation={3}>
      <img src={cover} alt="Book Cover" style={{ width: '100%' }} />
    </Paper>
  );
};

export default BookCover;
