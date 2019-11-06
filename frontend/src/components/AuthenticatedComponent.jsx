import React from 'react';
import { Redirect } from 'react-router-dom';
import http from "http.js";
import { Spinner } from 'reactstrap';

export function requireAuthentication(Component, dinerAllowed, restaurantAllowed) {

  class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        auth: false,
        diner: false,
        restaurant: false
      }
    }

    componentDidMount() {
      http.get("/session")
        .then((res) => {
            const accountType = res.data.data.type;
            if (accountType === 1) {
              this.setState({
                loading: false,
                auth: true,
                diner: true,
                restaurant: false
              })
            } else if (accountType === 2) {
              this.setState({
                loading: false,
                auth: true,
                diner: false,
                restaurant: true
              })
            } else {
              this.setState({
                loading: false,
                auth: false,
                diner: false,
                restaurant: false
              })
            }
          }
        ).catch(() => {
        this.setState({
          loading: false,
          auth: false,
          diner: false,
          restaurant: false
        })
      })
    }

    render() {
      const {loading, auth, diner, restaurant} = this.state;

      return (
        <div>
          {
            loading
              ? <Spinner/>
              : auth && ((diner && dinerAllowed) || (restaurant && restaurantAllowed))
              ? <Component {...this.props}/>
              : <Redirect to={"/"}/>
          }
        </div>
      )
    }
  }

  return AuthenticatedComponent;
}