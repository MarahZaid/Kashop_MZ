import { createTheme } from "@mui/material/styles";

const getTheme = (mode, isRtl = false) => {
  return createTheme({
    direction: isRtl ? 'rtl' : 'ltr',
    palette: {
      mode: mode,
      primary: {
        main: "#c026d3",
      },
      background: {
        default: mode === "dark" ? "#0f172a" : "#ffffff",
        paper: mode === "dark" ? "#1e293b" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "'DM Sans', sans-serif",
      h1: { fontFamily: "'Syne', sans-serif", fontWeight: 800 },
      h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
      h3: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
      h4: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
      button: {
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        textTransform: 'none',
      },
      caption: {
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        letterSpacing: '0.12em',
      },
      overline: {
        fontFamily: "'Syne', sans-serif",
        letterSpacing: '0.15em',
        fontWeight: 600,
      },
    },
  });
}
export default getTheme;