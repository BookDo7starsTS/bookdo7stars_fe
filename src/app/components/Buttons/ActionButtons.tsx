import { Box, Button } from '@mui/material';

type ActionButtonsProps = {
  names: string[];
  handleOnClick: () => void;
  disabled: boolean;
};

const ActionButtons = (props: ActionButtonsProps) => {
  const { names, handleOnClick, disabled } = props;
  return (
    <>
      {names.map((name) => {
        return (
          <Button variant="outlined" onClick={handleOnClick} disabled={disabled}>
            {name}
          </Button>
        );
      })}
    </>
  );
};

export default ActionButtons;
