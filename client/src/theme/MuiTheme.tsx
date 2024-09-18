import { createTheme, PaletteMode } from "@mui/material";

const ProjectTheme = (themeMode: PaletteMode) =>
    createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: "#04B4FC",
            },
            secondary: {
                main: "#9329FC",
            },
            background: {
                default: "#121212"
            }
        },
        typography: {
            fontFamily: "Poppins",
        },
        components: {
            MuiTypography: {
                styleOverrides: {
                    root: {
                        // letterSpacing: "0.5px",
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        // fontWeight: 600,
                        textTransform: "none",
                        // letterSpacing:"0.5px"
                    }
                }
            }
        }
    });

export default ProjectTheme