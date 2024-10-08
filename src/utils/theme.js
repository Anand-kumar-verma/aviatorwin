import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    maxWidth: '400px !important',
                    margin: '0 auto ',
                    padding: '0px 0px 40px 0px !important',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '0 !important',
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#E4063A',
        },
        secondary: {
            main: '#f50057',
        },
        error: {
            main: '#f50057',
        },
    },
});

export default theme;