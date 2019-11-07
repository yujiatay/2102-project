import React from 'react';
import { Redirect } from 'react-router-dom';
import http from "http.js";
import { Spinner } from 'reactstrap';

export function requireAuthentication(Component, entityFunction, redirectLink="/", redirectFunction=null) {
  class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        user: null,
        userType: 0
      }
    }

    componentDidMount() {
      http.get("/session")
        .then((res) => {
          this.setState({
            loading: false,
            user: res.data.data.entity,
            userType: res.data.data.type
          })
        }).catch(() => {
        this.setState({
          loading: false,
          user: null,
          userType: 0
        })
      })
    }

    render() {
      const { loading, user, userType } = this.state;

      return (
        <div>
          {
            loading
              ? <><Spinner/></>
              : entityFunction(user, userType)
              ? <Component user={user} {...this.props}/>
              : <Redirect to={(redirectFunction ? redirectFunction(user, userType) : redirectLink)}/>
          }
        </div>
      )
    }
  }

  return AuthenticatedComponent;
}