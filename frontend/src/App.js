import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import DashBoard from './components/Dashboard';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));

  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <DashBoard />
      {/* isLoaded only shows when the userSession is restored - removes signIn and signUp */}
      { isLoaded && (<Switch>
        <Route path='/'>

        </Route>
        <Route path='/dashboard'>
          <DashBoard />
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
