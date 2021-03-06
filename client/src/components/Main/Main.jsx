import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import QuestionList from '../Question/QuestionList.jsx';
import CreateQuestion from '../Question/CreateQuestion.jsx';
import QuestionContent from '../Question/QuestionContent.jsx';
import UsernameSubmit from '../Auth/UsernameSubmit.jsx';
import Login from '../Auth/Login.jsx';
import ProfileUser from '../User/ProfileUser.jsx';
import NavBar from './NavBar.jsx';
import SearchList from '../Search/SearchList.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { username, signedIn, rank, credits, id, email } = this.props.user;
    return (
      <div>
        <NavBar user={this.props.user} logout={this.props.logout} />
        <div id="menu_feature" style={{ marginLeft: '250px' }}>
          <div className="bg-content">
            <div className="container-fluid">
              <div className="content-title con-title_txt">
                <div className="inner-content in_txt">
                  <div className="container-fluid">
                    <div>
                      <Switch>
                        <Route exact path="/" render={() => <QuestionList userId={id} />} />
                        <Route
                          exact
                          path="/createQuestion"
                          render={() => (
                            <CreateQuestion
                              userId={id}
                              signedIn={signedIn}
                              credits={credits}
                              user={this.props.user}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/login"
                          render={() => {
                            {
                              if (!signedIn) {
                                return (
                                  <Login
                                    uiConfig={this.props.uiConfig}
                                    firebaseAuth={this.props.firebaseAuth}
                                  />
                                );
                              }
                              if (!username) {
                                return (
                                  <UsernameSubmit email={email} setUser={this.props.setUser} />
                                );
                              }
                              return <Redirect to="/" />;
                            }
                          }}
                        />
                        <Route
                          exact
                          path="/profileUser"
                          render={() => {
                            return <ProfileUser id={id} />;
                          }}
                        />
                        <Route
                          exact
                          path="/questionContent/:questionId"
                          render={({ match }) => {
                            return (
                              <QuestionContent
                                loggedId={id}
                                user={this.props.user}
                                id={match.params.questionId}
                              />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/search/:term"
                          render={({ match }) => {
                            return (
                              <SearchList
                                userId={id}
                                term={match.params.term}
                                user={this.props.user}
                              />
                            );
                          }}
                        />
                      </Switch>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
