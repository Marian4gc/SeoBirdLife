import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/login/Login';
import Register from './components/registro/register';
import Birds from './components/birds/Birds'
import Plants from './components/plants/Plants';
import Thanks from './components/thanks/Thanks';

import Map from './components/map/Map';

import Start from './components/navBar/Start';
import Insects from './components/insects/Insects';

import AllData from './components/results/AllData';
import UsersList from './components/dashboard/usersList';


function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<> <Home />  </>
    },
    { 
      path:"/Register",
      element:<><Register />  </>
    },
    {
      path:"/Login",
      element:<><Login /> </>
    },
    {
      path:"/Map",
      element:<><Map /> </>
    },
    {
      path:"/Discovery",
      element:<> <Birds /> <Plants /> <Insects />  </>
    },
    // {
    //   path:"/plants",
    //   element:<>   </>
    // },
    // {
    //   path:"/insect",
    //   element:<>   </>
    // },
    {
      path:"/Thanks",
      element:<><Start /> <Thanks /></>
    },
    {
      path:"/Results",
      element:<><AllData /></>
    },
    {
      path:"/userlist",
      element:<><UsersList /></>
    },
    

  ]);

  return (
    <div className="App">
          <RouterProvider router={router} />
    </div>
  );
}

export default App;

