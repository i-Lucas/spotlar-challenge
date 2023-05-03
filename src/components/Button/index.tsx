import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface ButtonProps {
  content: string,
  loading: boolean,
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled: boolean
}

export default function ButtonComponent({ content, loading, onClick, disabled }: ButtonProps) {

  if (loading) {
    return <LoadingButton loading variant="outlined">submit</LoadingButton>
  };

  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      color="success">
      {content}
    </Button>
  )
};