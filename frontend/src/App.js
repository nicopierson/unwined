import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Splash from './components/Splash';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import DashBoard from './components/Dashboard';
import WineDetail from './components/WineDetail';
import AddWineForm from './components/WineForm/AddWineForm';
import Footer from './components/Footer/Footer';
import Favorite from './components/Favorite/Favorite';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));

  }, [dispatch]);

  return (
    <div className='app_container'>
      <Navigation isLoaded={isLoaded} />
      {/* isLoaded only shows when the userSession is restored - removes signIn and signUp */}
      { isLoaded && (
        <Switch>
          <Route exact path='/'> {/* Splash Page */}
            <Splash />
          </Route>
          <Route path='/dashboard'> 
            <DashBoard />
          </Route> 
          <Route path='/wines/add'>
            <AddWineForm /> 
          </Route>
          <Route path='/wines/:wineId'>
            <WineDetail />
          </Route>
          <Route path='/fav'>
            <Favorite wineId={3941}/>
          </Route>
        </Switch>
      )}
      <Footer />
    </div>
  );
}

export default App;
