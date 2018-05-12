import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateArticleTitle } from '../actions/index';

const mapStateToProps = state => ({
  articles: state.articles
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({updateArticleTitle: updateArticleTitle}, dispatch)
);

class ArticleList extends React.Component {

  createListOfArticles() {
    return this.props.articles.map((article) => {
      return (
        <li onClick={() => this.props.updateArticleTitle(article)} key={article.id}>
          <p>{article.title}</p>
          <a href={article.url} target="blank">See article</a>
        </li>
      )
    })
  }

  render() {
    return (
      <section className='display-item'>
        <div className="wrapper">
          <ul>
            {this.createListOfArticles()}
          </ul>
        </div>
      </section>
    )
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
