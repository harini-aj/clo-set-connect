import './App.css'
import { Home } from './pages/Home'
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme, CssBaseline, ToggleButton, ToggleButtonGroup, Icon } from '@mui/material';
import { useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';

function App() {
  const [isDark, setIsDark] = useState(true);

  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  });

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const themeToggler = () => {
    return <ToggleButtonGroup
            size='small'
            color="primary"
            exclusive
            onChange={toggleTheme}
            aria-label="theme"
            sx={{ ml: "auto"}}
          >
            <ToggleButton value={isDark ? "Light": "Dark"}>
              <Icon sx={{height:30, scale: .70}}>
                {isDark && <LightModeIcon/>}
                {!isDark && <NightlightIcon/>}
              </Icon>
            </ToggleButton>
          </ToggleButtonGroup>
  }

  return (
    <Box display="flex" flexDirection="column">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {themeToggler()}
          <Home/>
        </ThemeProvider>
    </Box>
  )
}

export default App
