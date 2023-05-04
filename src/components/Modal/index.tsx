import React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import currencyContext from "@/context/currencyContext";
import { Alert, AlertTitle } from "@mui/material";

const style = {
  p: 1,
  top: "50%",
  left: "50%",
  // width: "50%",
  boxShadow: 24,
  bgcolor: "background.paper",
  transform: "translate(-50%, -50%)",
  position: "absolute" as "absolute",
};

export default function ModalResult() {

  const { appGlobalContext: globalData } = React.useContext(currencyContext);
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  let label = ""
  if (globalData.result) {
    const { amount, value } = globalData.result;
    const { from, to } = globalData.currencies;
    label = `${amount} ${from?.toUpperCase()} is ${value} ${to?.toUpperCase()}`;
  };

  return (
    <div>
      <Modal
        open={open}
        closeAfterTransition
        onClose={handleClose}
        slots={{ backdrop: Backdrop }}
        aria-labelledby="transition-modal-title"
        slotProps={{ backdrop: { timeout: 500, } }}
        aria-describedby="transition-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Alert severity="success" variant="outlined">
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Conversion Result
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {label}
              </Typography>
            </Alert>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};