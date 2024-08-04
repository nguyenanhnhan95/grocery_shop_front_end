import { Select, styled } from "@mui/material";

export const StyleFocusFormControl = styled(Select)(() => ({
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#80bdff !important',
    },
    '&.Mui-focused': {
        backgroundColor: '#fff',
        boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
}));