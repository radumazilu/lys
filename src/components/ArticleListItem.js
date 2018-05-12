import React from "react";
import { connect } from "react-redux";
import { deleteArticle } from "../actions";
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ArticleListItem extends React.Component {
  handleDeleteClick = articleId => {
    const { deleteArticle } = this.props;
    deleteArticle(articleId);
  };

  render() {
    const { articleId, article } = this.props;
    return (
      <MuiThemeProvider>
        <Card className="article-card">
          <CardHeader
            title={article.title}
            subtitle={article.user.displayName || "no-username-available"}
            avatar="http://i.pravatar.cc/300"
          />
          <CardTitle title={article.title} subtitle={article.link} />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          {article.recordedBlob ? (
            <audio controls src={article.recordedBlob.blobURL}></audio>
          ) : (<p>No recording yet</p>)}
          <CardActions>
            <FlatButton onClick={() => this.handleDeleteClick(articleId)} label="Delete" />
          </CardActions>
        </Card>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
});

// do this with MapDispatchToProps()
export default connect(mapStateToProps, { deleteArticle })(ArticleListItem);
