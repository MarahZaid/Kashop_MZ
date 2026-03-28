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
        default: mode === "dark" ? "#0f172a" : "#ffffff",  // ← كحلي غامق
        paper: mode === "dark" ? "#1e293b" : "#ffffff",    // ← كحلي أفتح شوي للكاردز
      },
    },
  });
}
export default getTheme;