import React from 'react';

import {
  Row,
  Col,
  Container,
} from "reactstrap";

import Navbar from "components/Navbars/DarkNavbar.jsx";
import http from "http.js";
import { requireAuthentication } from "../../components/AuthenticatedComponent";

class InviteFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: []
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    if (this.props.user) {
      // console.log(this.props.user)
    }
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <Navbar user={user} history={this.props.history}/>
        <main ref="main">
          <section className="section">
            <Container className="pt-md">
              <div>
                <h2>BookLah! Points</h2>
                <p>You currently have <b><u>{user.points}</u></b> points.</p>
              </div>
              <div>
                <p>Invite your friends using this code: <h4><mark>{user.referralCode}</mark></h4></p>
              </div>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

function checkAuth(user, userType) {
  return !!(user && userType === 1);
}

export default requireAuthentication(InviteFriends, checkAuth, "/");