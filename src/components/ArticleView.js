import React from 'react';
import NavBar from './NavBar';

class ArticleView extends React.Component {
  componentDidMount() {
    const { articleId } = this.props.match.params
  }
  render() {
    const { article } = this.props.location.state;
    return (
      <div>
        <NavBar />
        <h1>Article Title: {article.title}</h1>
        <h1>User: {article.user.displayName}</h1>
      </div>
    );
  }
}

export default ArticleView;
