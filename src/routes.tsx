import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Home from './pages/Home';
import Pokemon from './pages/Pokemon';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/pokemonName" component={Pokemon} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
