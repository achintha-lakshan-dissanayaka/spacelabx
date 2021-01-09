import './Home.css';
import React, { useState , useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExploreIcon from '@material-ui/icons/Explore';

import {BrowserRouter as Router , Switch , Route , Link} from 'react-router-dom';
import marsroverphotos from './MarsRoverPhotos';


function Home() {

  const[content , setContent] = useState({});

  const api_key = 'O4caK6V8qbtc4DU2WLn7ukYaZ52bGZAeFKYYHCiu';

  useEffect(()=> {
    async function getContent(){
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`)
      const data = await response.json();
      //console.log(data);
      setContent(data);
      //console.log('hello');
    }
    getContent();
    
  },[])

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <div
      
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List>
          <Link to='/earthimaginary' className='navstyle'>
              <ListItem button to='/earthimaginary'>
                <ListItemIcon>
                    <ExploreIcon />
                </ListItemIcon>
                <ListItemText>
                      Get Satellite Images of the Earth
                  </ListItemText>
              </ListItem>
          </Link>
          <Link to='/marsroverphotos' className='navstyle'>
          <ListItem button to='/marsroverphotos'>
            <ListItemIcon>
                <ExploreIcon />
            </ListItemIcon>
            <ListItemText >
                Mars Rover Photos
              </ListItemText>
          </ListItem>
          </Link>
          <Link to='/fireballdata' className='navstyle'>
          <ListItem button to='/fireballdata'>
            <ListItemIcon>
                <ExploreIcon />
            </ListItemIcon>
            <ListItemText >
            Center for Near-Earth Object Studies - Fireball
              </ListItemText>
          </ListItem>
          </Link>
          <Link to='/sentryobjects' className='navstyle'>
          <ListItem button to='/sentryobjects'>
            <ListItemIcon>
                <ExploreIcon />
            </ListItemIcon>
            <ListItemText >
            Center for Near-Earth Object Studies - Sentry
              </ListItemText>
          </ListItem>
          </Link>
          <Link to='/comenjection' className='navstyle'>
          <ListItem button to='/comenjection'>
            <ListItemIcon>
                <ExploreIcon />
            </ListItemIcon>
            <ListItemText >
              New Technologies of NASA
              </ListItemText>
          </ListItem>
          </Link>
      </List>
    </div>
  );
//explore icon
  return (
    <div className="app">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"  color="white" aria-label="menu">
            <div className='icon'>
              <MenuIcon onClick={toggleDrawer('left', true)}/>
            </div>
          </IconButton>
          <Typography variant="h2" >
            spacelab-X
          </Typography>
        </Toolbar>
      </AppBar>

      <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
        <div className='maincontent'>
          <div className='maincontent__heading'>
            <h1>Astronomy Picture of the Day</h1>
            <strong>{content.title}</strong><br/>
            {content.date}
          </div>
            <img src={content.url}  className='maincontent__image'/>
            <div className='maincontent__explantion'>
              <strong>{content.explanation}</strong>
            </div>
        </div>
    </div>
  );
}

export default Home;
