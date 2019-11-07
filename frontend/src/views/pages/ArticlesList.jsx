import React from 'react';

import { Container } from "reactstrap";

import Navbar from "components/Navbars/DarkNavbar.jsx";
import ArticleCard from "components/ArticleCard";
import { requireAuthentication } from "../../components/AuthenticatedComponent";

class ArticlesList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }


  render() {
    const { user } = this.props;
    return (
      <>
        <Navbar user={user} history={this.props.history} />
        <main ref="main">
          <section className="section h-100vh">
            <Container className="my-lg">
              <h2>All Articles</h2>
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
            </Container>
          </section>
        </main>
      </>
    );
  }
}

function checkAuth() {
  return true;
}

export default requireAuthentication(ArticlesList, checkAuth);