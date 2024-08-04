import { Backdrop, CircularProgress } from "@mui/material";

function BackdropLoading(){
    return (
        <Backdrop
          sx={{ color: '#78909C', zIndex: (theme) => theme.zIndex.drawer + 1 ,backgroundColor: 'rgba(0, 0, 0, 0.1)'}}
          open={true}
        >
          <CircularProgress color="primary" />
        </Backdrop>
    )
}
export default BackdropLoading;