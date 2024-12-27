import { Box, Button } from '@mui/material';

type ActionButtonsProps = {
  names: string[];
  handleOnClick: (name: string) => void;
  disabledButtons: (name: string) => boolean;
};

const ActionButtons = (props: ActionButtonsProps) => {
  const { names, handleOnClick, disabledButtons } = props;
  return (
    <>
      {names.map((name) => {
        return (
          <Button variant="outlined" onClick={() => handleOnClick(name)} disabled={disabledButtons(name)}>
            {name}
          </Button>
        );
      })}
    </>
  );
};

export default ActionButtons;
