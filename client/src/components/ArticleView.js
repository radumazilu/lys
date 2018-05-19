import React from 'react';
import NavBar from './NavBar';

// Material UI Next v1.0.0-rc.0
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ArticleView extends React.Component {
  extractHostname(url) {
    let hostname = '';
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  }
  componentDidMount() {
    const { articleId } = this.props.match.params
  }
  render() {
    const { article } = this.props.location.state;
    const bull = <span style={{display: 'inline-block', margin: '0 2px', transform: 'scale(0.8)'}}>•</span>;
    return (
      <div>
        <NavBar articleView={true} article={article} />
        <div className="content-wrapper">
          <Card style={{maxWidth: 730, padding: 30, boxShadow: 'none', minWidth: '50%'}}>
            <CardContent>
              <Typography style={{marginBottom: 16, fontSize: 14}} color="textSecondary">
                by {article.user.displayName}
              </Typography>
              <Typography variant="headline" component="h2">
                {article.title}
              </Typography>
              <Typography style={{marginBottom: 18, marginTop: 6}} color="textSecondary">
                from <a href={article.link}>{this.extractHostname(article.link)}</a>
              </Typography>
              {article.scrapedContent ? (
                <Typography component="p" style={{lineHeight: '1.7em'}}>
                  {article.scrapedContent}
                </Typography>
              ) : (
                <Typography component="p" style={{lineHeight: '1.7em'}}>
                  no content here yet :(
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

export default ArticleView;
