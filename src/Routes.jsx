import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/Home';
import NewContactPage from './pages/NewContact';
import EditContactPage from './pages/EditContact';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/new" component={NewContactPage} />
      <Route path="/edit/:id" component={EditContactPage} />
    </Switch>
  );
}
