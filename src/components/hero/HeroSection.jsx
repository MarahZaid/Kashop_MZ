import styles from './HeroSection.module.css';
import { Box, Container, Typography, Button, Stack, Paper } from '@mui/material';
import hero_pg from '../../assets/hero-pg.jpg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const STATS = [
  { value: '50K+', labelKey: 'Happy Customers', delay: '1s'   },
  { value: '4.9★', labelKey: 'Average Rating',  delay: '1.1s' },
  { value: '500+', labelKey: 'Products',         delay: '1.2s' },
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 3 + Math.random() * 5,
  left: `${5 + Math.random() * 90}%`,
  top:  `${10 + Math.random() * 80}%`,
  duration: `${4 + Math.random() * 6}s`,
  delay:    `${Math.random() * 5}s`,
  color: ['#a855f7', '#ec4899', '#f97316'][i % 3],
}));

export default function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '80vh', md: '90vh' },
        backgroundImage: `url(${hero_pg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        overflow: 'hidden',
        py: { xs: 6, md: 0 },
      }}
    >
      {/* Overlays */}
      <Box sx={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
      <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 90% at 18% 50%, rgba(0,0,0,0.45) 0%, transparent 100%)' }} />

      {/* Ambient orbs */}
      <Box className={styles.orb} sx={{ width: 420, height: 420, bgcolor: 'rgba(168,85,247,0.18)', top: -100, left: -80, animationDuration: '9s' }} />
      <Box className={styles.orb} sx={{ width: 300, height: 300, bgcolor: 'rgba(236,72,153,0.14)', bottom: 0, right: '15%', animationDuration: '11s', animationDelay: '-3s' }} />
      <Box className={styles.orb} sx={{ width: 200, height: 200, bgcolor: 'rgba(249,115,22,0.10)', top: '30%', right: '5%', animationDuration: '7s', animationDelay: '-5s' }} />

      {/* Spinning rings — right-anchored to avoid RTL glitch */}
      <Box className={`${styles.ring} ${styles.ringInner}`} />
      <Box className={`${styles.ring} ${styles.ringOuter}`} />

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <Box
          key={p.id}
          className={styles.particle}
          sx={{
            width: p.size, height: p.size,
            bgcolor: p.color,
            left: p.left, top: p.top,
            animationDuration: p.duration,
            animationDelay: p.delay,
            boxShadow: `0 0 6px 2px ${p.color}`,
          }}
        />
      ))}

      {/* Main content */}
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Stack spacing={3} maxWidth="620px">

          {/* Badge */}
          <Box
            className={styles.heroBadge}
            sx={{
              display: 'flex', alignItems: 'center', gap: 1,
              bgcolor: 'rgba(168,85,247,0.15)',
              border: '1px solid rgba(168,85,247,0.4)',
              px: 2, py: 0.75,
              borderRadius: '50px',
              width: 'fit-content',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box className={styles.badgeDot} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#a855f7', boxShadow: '0 0 8px 3px rgba(168,85,247,0.8)' }} />
            <Typography variant="caption" sx={{ letterSpacing: 2, textTransform: 'uppercase', fontWeight: 500 }}>
              {t('New Collection 2026')}
            </Typography>
          </Box>

          {/* Title */}
          <Box className={styles.heroTitle}>
            <Typography className={styles.heroTitle} component="div" sx={{ fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' }, lineHeight: 1.05 }}>
              {t('Elevate Your')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <span className={styles.dividerLine} />
              <Box
                component="span"
                className={styles.titleGradient}
                sx={{ fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' }, lineHeight: 1.05, display: 'inline-block' }}
              >
                {t('KaShop Style')}
              </Box>
            </Box>
          </Box>

          {/* Description */}
          <Typography className={styles.heroDesc} variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 480, lineHeight: 1.7, fontSize: '1rem' }}>
            {t('hero_desc')}
          </Typography>

          {/* Buttons */}
          <Stack className={styles.heroBtns} direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
            <Button
              className={styles.glowBtn}
              size="large"
              sx={{
                background: 'linear-gradient(45deg,#a855f7,#ec4899)',
                color: 'white',
                px: 4, py: 1.4,
                borderRadius: '50px',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '0.95rem',
                textTransform: 'none',
              }}
              onClick={() => navigate('/shop')}
            >
              {t('Shop Now')}
            </Button>
            <Button
              className={styles.outlineBtn}
              variant="outlined"
              size="large"
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                borderRadius: '50px',
                px: 4, py: 1.4,
                fontFamily: "'DM Sans', sans-serif",
                textTransform: 'none',
                fontSize: '0.95rem',
                backdropFilter: 'blur(6px)',
              }}
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('Browse Categories')}
            </Button>
          </Stack>

          {/* Stats */}
          <Stack className={styles.heroStats} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 5 }} mt={2}>
            {STATS.map((s, i) => (
              <Box key={i} className={styles.statBox} sx={{ animationDelay: s.delay, borderLeft: '2px solid rgba(168,85,247,0.5)', pl: 2 }}>
                <Typography variant="h5" sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, background: 'linear-gradient(45deg,#fff,#d8b4fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem' }}>
                  {t(s.labelKey)}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>

      {/* Right feature cards */}
      <Box sx={{ position: 'absolute', right: { sm: 60, md: 80 }, bottom: 60, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', gap: 2, zIndex: 2 }}>
        <FeatureCard icon="🚚" title={t('Free Shipping')}   desc={t('free_shipping_desc')}   delay="0.8s" />
        <FeatureCard icon="🔒" title={t('Secure Checkout')} desc={t('secure_checkout_desc')} delay="1s"   />
      </Box>
    </Box>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <Paper
      className={styles.featureCard}
      sx={{
        p: 2.5,
        width: 250,
        animationDelay: delay,
        borderRadius: '16px',
        bgcolor: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: 'white',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
        <Box sx={{ fontSize: '1.4rem', filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.7))' }}>{icon}</Box>
        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem' }}>{title}</Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', lineHeight: 1.6 }}>
        {desc}
      </Typography>
    </Paper>
  );
}