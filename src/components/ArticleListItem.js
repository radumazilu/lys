import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteArticle } from "../actions";

// icons
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdPause from 'react-icons/lib/md/pause';
import MdDelete from 'react-icons/lib/md/delete';
import MdOpenInNew from 'react-icons/lib/md/open-in-new';

// updating to Material UI v1.0.0-rc.0
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class ArticleListItem extends React.Component {
  state = {
    recordingIsPlaying: false
  }

  play = (sound) => {
    sound.play();
    // this.setState({recordingIsPlaying: true});
  }

  pause = (sound) => {
    sound.pause();
    // this.setState({recordingIsPlaying: false});
  }

  render() {
    const { articleId, article, deleteArticle } = this.props;
    // make the recording available to this environment
    const sound = new Audio(article.recording);
    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card className="article-card">
          <CardHeader
            avatar={
              <Avatar aria-label="user" src="http://i.pravatar.cc/300"/>
            }
            title={article.title}
            subheader={article.user.displayName || "No username available"}
            action={
              <Link to={{
                      pathname: `/app/${articleId}`,
                      state: { article: article }
                    }}>
                <IconButton color="default">
                  <MdOpenInNew />
                </IconButton>
              </Link>
            }
          />
          <div className="details">
            <CardContent className="content">
              <Typography component="p">
                This impressive paella is a perfect party dish and a fun meal to cook together with
                your guests. Add 1 cup of frozen peas along with the mussels, if you like.
              </Typography>
            </CardContent>
            <div className="controls" style={{display: "flex", alignItems: 'center', padding: 10}}>
              <IconButton aria-label="Delete" onClick={() => deleteArticle(articleId)}>
                <MdDelete />
              </IconButton>
              {article.recording ? (
                <IconButton onClick={() => this.play(sound)} aria-label="Play">
                  <MdPlayArrow className="play-icon" />
                </IconButton>
              ) : (<p>No recording yet</p>)}
              {article.recording ? (
                <IconButton onClick={() => this.pause(sound)} aria-label="Pause">
                  <MdPause />
                </IconButton>
              ) : (<p>No recording yet</p>)}
              {this.state.recordingIsPlaying ? (
                <Button disabled>
                  This article is playing
                </Button>
              ) : (<div></div>)}
            </div>
          </div>
        </Card>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
});

// do this with MapDispatchToProps()
export default connect(mapStateToProps, { deleteArticle })(ArticleListItem);
