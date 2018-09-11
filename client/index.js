import React from 'react';
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import AllAppointments from './components/AllAppointments';
import NewAppointment from './components/NewAppointment';
import SingleAppointment from './components/SingleAppointment';
import Navigation from './components/Navigation';

const httpLink = createHttpLink({
  uri: 'http://localhost:3002/graphql'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

// render the main react component
ReactDOM.render(
  <ApolloProvider client={client}>
   <BrowserRouter>
        <Navigation>
          <Switch>
            <Route exact path='/' component={ AllAppointments } />
            <Route exact path='/newresevation' component={ NewAppointment } />
            <Route exact path='/single/:reservationId' component={ SingleAppointment } />
          </Switch>
        </Navigation>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()

