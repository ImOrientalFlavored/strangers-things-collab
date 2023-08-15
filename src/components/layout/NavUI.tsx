import { useState } from 'react';
import React from 'react';
//routes, layouts
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Container, InputBase, colors } from '@mui/material';
import { ColorModeContext, tokens} from "../../theme";
import { useContext } from "react";
import { AuthContext } from '../../routes/Root'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
//import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
//Icons
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import FlagIcon from '@mui/icons-material/Flag';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MailIcon from '@mui/icons-material/Mail';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
//

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

type NavUIProp ={
  setIsLoggedIn: (arg0: boolean)=>void,
  children?:React.ReactNode
}

export default function NavUI({setIsLoggedIn, children}:NavUIProp) {
    
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isLoggedIn = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth={'xl'}>
      <Box sx={{ 
        display: 'flex',
        bgcolor: '#f0f0f0'
      }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{
        }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>

              <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>

                {//"Left side of Top Nav - Logo, SiteName, Search"
                }
                <Box display={'flex'}>
                  <Typography variant="h6" zIndex={"10"} noWrap component="div" sx={{ 
                    textShadow:"0 0 1em #414141"}}>
                    Stranger's Things
                  </Typography>
                  <Box bgcolor={colors.primary[100]}  sx={{ml:"5px" ,borderRadius:"20px"}}>
                    <InputBase sx={{p:"0 10px 0 10px", color:colors.primary[800] ,borderRadius:"20px"}}/>
                  </Box>
                  
                </Box>

                {//"Right side of Top Nav - Icons(Theme, Notifications, Profile, Login/Logout)"
                }
                <Box display={'flex'}>
                  <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                      <DarkModeOutlinedIcon />
                    ):(
                      <LightModeOutlinedIcon />
                    )}
                  </IconButton>
                  {isLoggedIn ?<> 
                      <IconButton>
                        <NotificationsOutlinedIcon />
                      </IconButton>
                      <IconButton>
                        <AccountBoxOutlinedIcon />
                      </IconButton>
                    </>
                    :
                      ''
                  }
                  <IconButton onClick={()=>setIsLoggedIn(!isLoggedIn)}>
                    {!isLoggedIn ? <LoginOutlinedIcon /> : <LogoutOutlinedIcon /> }
                  </IconButton>

                </Box>
              </Box>
              
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} sx={{backgroundColor:colors.primary[900]}}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Categories', 'Your Posts', 'Messages', 'Favorites', 'Settings'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 40,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index === 0 ? theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon /> : ''}
                    {index === 1 ? <FlagIcon /> : ''}
                    {index === 2 ? <MailIcon /> : ''}
                    {index === 3 ? <FavoriteBorderIcon /> : ''}
                    {index === 4 ? <SettingsTwoToneIcon /> : ''}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box component="main" bgcolor={colors.primary[900]} color={colors.greenAccent[400]} sx={{ flexGrow: 1, }}>
          <DrawerHeader sx={{backgroundColor:colors.primary[900]}} />
          
            {children}
        
        </Box>
      </Box>
    </Container>
  );
}