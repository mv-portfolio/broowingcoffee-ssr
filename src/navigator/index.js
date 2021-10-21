import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import pages from './pages';

export default function Navigator() {
  return (
    <Router>
      <Switch>
        {pages.map((page, index) => (
          <Route key={index} {...page} />
        ))}
      </Switch>
    </Router>
  );
}
