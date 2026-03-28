import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './i18next.jsx'
import { useTranslation } from 'react-i18next'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@emotion/react'
import getTheme from './theme.js'
import useThemeStore from './store/useThemeStore.js'

const ltrCache = createCache({ key: 'muiltr' });
const rtlCache = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const queryClient = new QueryClient()

export default function App() {
    const { i18n } = useTranslation();
    const isRtl = i18n.language === "ar";

    useEffect(() => {
        document.documentElement.dir = isRtl ? "rtl" : "ltr";
    }, [isRtl])

    const mode = useThemeStore((state) => state.mode);
    return (
        <CacheProvider value={isRtl ? rtlCache : ltrCache}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={getTheme(mode, isRtl)}>
                    <CssBaseline />
                    <RouterProvider router={router} />
                </ThemeProvider>
            </QueryClientProvider>
        </CacheProvider>
    )
}