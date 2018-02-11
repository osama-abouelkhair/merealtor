import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import './Item.css'

const styles = {
  card: {
    maxWidth: 345,
    marginBottom: 10
  },
  media: {
    height: 200,
  },
};
const item = (  props ) => {
    const { classes } = props;    
    return (

        <div className="Item">
            <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/components/assets/images/project_img.png"
              title={props.name}
            />
            <CardContent>
              <Typography type="headline" component="h2">
              {props.name}
              </Typography>
              <Typography component="p">
                {props.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button dense color="primary">
                Details
              </Button>
            </CardActions>
          </Card>
            {/*<Button raised color="primary" to="/login">Details</Button>*/}

        </div>

    )
}

item.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(item);