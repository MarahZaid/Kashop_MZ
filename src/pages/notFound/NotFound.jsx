import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const canvasRef = useRef(null);

  const primary = '#c026d3';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const cols = Math.floor(width / 28);
    const rows = Math.floor(height / 28);
    const dots = [];

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        dots.push({
          x: (c / cols) * width + 14,
          y: (r / rows) * height + 14,
          baseOpacity: Math.random() * 0.25 + 0.05,
          speed: Math.random() * 0.015 + 0.008,
          offset: Math.random() * Math.PI * 2,
        });
      }
    }

    let frame = 0;
    let animId;
    const isDark = theme.palette.mode === 'dark';

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      frame += 0.4;
      dots.forEach((d) => {
        const opacity = d.baseOpacity + Math.sin(frame * d.speed + d.offset) * 0.12;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(192, 38, 211, ${opacity})`
          : `rgba(192, 38, 211, ${opacity * 0.6})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme.palette.mode]);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        px: 2,
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      {/* Dot grid canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Glow blob */}
      <Box
        sx={{
          position: 'absolute',
          width: { xs: 280, md: 420 },
          height: { xs: 280, md: 420 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${primary}22 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          animation: 'fadeUp 0.6s ease both',
          '@keyframes fadeUp': {
            from: { opacity: 0, transform: 'translateY(28px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        {/* 404 */}
        <Box sx={{ position: 'relative', lineHeight: 1 }}>
          <Typography
            sx={{
              fontSize: { xs: '7rem', sm: '11rem', md: '14rem' },
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: `2px ${primary}`,
              userSelect: 'none',
              fontFamily: '"Georgia", serif',
              animation: 'pulse 3s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { textShadow: `0 0 60px ${primary}44` },
                '50%': { textShadow: `0 0 120px ${primary}88, 0 0 40px ${primary}44` },
              },
            }}
          >
            404
          </Typography>

          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '-8%',
              right: '-8%',
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${primary}88, transparent)`,
              transform: 'translateY(-50%)',
            }}
          />
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            fontSize: { xs: '1.1rem', md: '1.4rem' },
            letterSpacing: '0.02em',
          }}
        >
          {t('page_not_found')}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            maxWidth: 360,
            lineHeight: 1.7,
            fontSize: '0.95rem',
          }}
        >
          {t('page_not_found_desc')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mt: 1 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/')}
            sx={{
              px: 4,
              py: 1.3,
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '0.95rem',
              background: `linear-gradient(135deg, ${primary}, #a21caf)`,
              boxShadow: `0 4px 24px ${primary}55`,
              textTransform: 'none',
              transition: 'all 0.25s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 32px ${primary}77`,
              },
            }}
          >
            {t('Back to Home')}
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/shop')}
            sx={{
              px: 8,
              py: 1.3,
              borderRadius: '50px',
              fontWeight: 600,
              fontSize: '0.95rem',
              borderColor: primary,
              color: primary,
              textTransform: 'none',
              transition: 'all 0.25s ease',
              '&:hover': {
                borderColor: primary,
                background: `${primary}11`,
                transform: 'translateY(-2px)',
              },
            }}
          >
            {t('Shop')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}