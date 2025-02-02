import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import JobItemDeatils from './components/JobItemDetails'
import ProjectedRoute from './components/ProjectedRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProjectedRoute exact path="/" component={Home} />
    <ProjectedRoute exact path="/jobs" component={Jobs} />
    <ProjectedRoute exact path="/jobs/:id" component={JobItemDeatils} />
    <Route component={NotFound} />
  </Switch>
)

export default App
