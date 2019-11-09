import React from 'react';
import axios from "axios";

import {
  Container,
  Button,
  Modal
} from "reactstrap";

import Navbar from "components/Navbars/DarkNavbar.jsx";
import ArticleCard from "components/ArticleCard";
import NewArticleModal from "components/NewArticleModal";
import { requireAuthentication } from "../../components/AuthenticatedComponent";

class ArticlesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      articles: [],
      modalVisibility: false
  }
}

  componentDidMount() {
    // Fetch articles from the API and update state
    this.fetchArticles();

    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  fetchArticles() {
    // The API where we're fetching data from
    axios.get(`http://localhost:8000/api/v1.0/articles`)
      // We get a response and receive the data in JSON format...
      .then(response => response.data.data)
      // ...then we update the state of our application
      .then(
        data =>
          this.setState({
            isLoading: false,
            articles: data
          })
      )
      // If we catch errors instead of a response, let's update the app
      .catch(error => {
        alert("Error fetching articles :( " + error);
        this.setState({
          isLoading: false,
        });
      });
  }

  toggleModal = () => {
    this.setState({ modalVisibility: !this.state.modalVisibility});
  }

  render() {
    const { isLoading, articles } = this.state;
    const { user } = this.props;
    console.log("User is " + user);
    return (
      <>
        <Navbar user={user} history={this.props.history} />
        <main ref="main">
          <p></p>
          <Container className="my-lg">
            <div align='right'><Button onClick={this.toggleModal}>Write a new article!</Button></div>
            <h2>All Articles</h2>
            <p></p>
            <div>
              {!isLoading ? (
                articles.map(article => {
                  const { username, title, content, createdAt, updatedAt } = article;
                  return (
                    <div key={createdAt}>
                      <ArticleCard title={title} content={content} username = {username} createdAt={createdAt} />
                    </div>
                  );
                })
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </Container>
          <NewArticleModal isOpen={this.state.modalVisibility} toggleModal={this.toggleModal}/>
        </main>
      </>
    );
  }
}

function checkAuth() {
  return true;
}

export default requireAuthentication(ArticlesList, checkAuth);