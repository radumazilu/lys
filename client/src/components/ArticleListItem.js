import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteArticle } from "../actions";

// icons
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdPause from 'react-icons/lib/md/pause';
import MdDelete from 'react-icons/lib/md/delete';
import MdOpenInNew from 'react-icons/lib/md/open-in-new';

// Material UI Next v1.0.0-rc.0
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import $ from 'jquery';

class ArticleListItem extends React.Component {

  state = {
    recordingIsPlaying: false
  }

  componentDidMount() {
    // this prevents buttons from remaining focused
    $("button").mouseup(function() {
      $(this).blur();
    })
  }

  play = (sound) => {
    console.log(sound);
    sound.play();
    // this.setState({recordingIsPlaying: true});
  }

  pause = (sound) => {
    sound.pause();
    // this.setState({recordingIsPlaying: false});
  }

  render() {
    const { article, deleteArticle } = this.props;
    // make the recording available to this environment
    let sound = new Audio(article.recordingRef);
    sound.type = 'audio/wav';
    return (
      <Grid item xs={12} sm={6} md={6}>
        <Card className="article-card">
          <CardHeader
            avatar={
              <Avatar aria-label="user" src="http://i.pravatar.cc/300"/>
            }
            title={article.title}
            subheader={article.user.displayName || "No username available"}
            action={
              <Link to={{
                      pathname: `/app/${article.title}`,
                      state: {
                        article: article,
                        articleId: article.id
                      }
                    }}>
                <IconButton color="default">
                  <MdOpenInNew />
                </IconButton>
              </Link>
            }
          />
          <div className="details">
            <CardContent className="content">
              { article.scrapedContent ? (
                <Typography component="p">
                  {String(article.scrapedContent).split(' ').slice(0, 30).join(' ') + ' ...'}
                </Typography>
              ) : (
                <Typography component="p">
                  No caption available
                </Typography>
              ) }
            </CardContent>
            <div className="controls" style={{display: "flex", alignItems: 'center', padding: 10}}>
              <IconButton aria-label="Delete" onClick={() => deleteArticle(article.id)}>
                <MdDelete />
              </IconButton>
              {article.recording ? (
                <IconButton onClick={() => this.play(sound)} aria-label="Play">
                  <MdPlayArrow className="play-icon" />
                </IconButton>
              ) : (<p></p>)}
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
