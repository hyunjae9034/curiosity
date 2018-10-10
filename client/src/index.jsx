import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import App from './components/Auth/App.jsx';

const client = new ApolloClient({
  uri: `http://hrcuriosity.herokuapp.com/graphql`,
});

class Index extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: undefined,
        username: undefined,
        signedIn: false,
        credits: 0,
        rank: 0,
      },
    };
    this.setUser = this.setUser.bind(this);
  }
  setUser({ id, username, credit, rank }, signedIn, email) {
    let updatedUser = {
      id: id,
      signedIn: signedIn,
      username: username,
      credits: credit,
      rank: rank,
      email: email,
    };
    this.setState({ user: updatedUser });
  }
  render() {
    return (
      <App
        setUser={(user, signedIn, email) => {
          this.setUser(user, signedIn, email);
        }}
        user={this.state.user}
      />
    );
  }
}
ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
