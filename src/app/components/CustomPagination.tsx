import { Box, SxProps, Pagination } from '@mui/material';

type CustomPaginationProps = {
  pageCount: number;
  currentPage: number;
  handlePageChange: () => void;
  style?: SxProps;
};

const CustomPagination = (props: CustomPaginationProps) => {
  const { pageCount, currentPage, handlePageChange, style } = props;

  return (
    <Box sx={{ ...style }}>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
        sx={{
          justifyContent: 'center',
          '& .MuiPagination-ul': {
            flexWrap: 'nowrap',
          },
          '& .MuiPaginationItem-root': {
            minWidth: '32px',
            height: '32px',
          },
        }}
      />
    </Box>
  );
};
export default CustomPagination;
