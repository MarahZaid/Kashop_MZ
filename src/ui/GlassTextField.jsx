import {
    TextField
} from '@mui/material'

export const GlassTextField = (props) => (
  <TextField
    fullWidth
    variant="outlined"
    {...props}
    sx={{
      
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderRadius: '12px',
        color: '#fff',
        '& fieldset': {
          borderColor: 'rgba(255,255,255,0.12)',
        },
        '&:hover fieldset': {
          borderColor: '#b45cff',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#d94fd5',
        },
      },
      '& .MuiInputLabel-root': {
        color: 'rgba(255,255,255,0.6)',
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: '#d94fd5',
      },
    }}
  />
);