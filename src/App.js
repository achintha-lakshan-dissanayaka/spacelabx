import './App.css';
import Home from './Home';
import MarsRoverPhotos from './MarsRoverPhotos';
import EarthImaginary from './EarthImaginary';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import FireballData from './FireballData';
import SentryObjects from './SentryObjects';
import ComEnjection from './ComEnjection';
import ProjectDetails from './ProjectDetails';

function App() {



  return (
    <Router>
      <div className="app">
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/marsroverphotos' component={MarsRoverPhotos}/>
            <Route path='/earthimaginary' component={EarthImaginary}/>
            <Route path='/fireballdata' component={FireballData} />
            <Route path='/sentryobjects' component={SentryObjects} />
            <Route path='/comenjection' component={ComEnjection} />
            <Route path='/projects' component={ProjectDetails} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
