import * as React from 'react';
import { WaterController } from '@eco/frontend-interface-adapter/src/Water/WaterController';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

export default class InitWaterMeterView extends React.Component<{ controller: WaterController }> {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Do you have different water meters for cold and hot water?
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            In some house, you can have 2 water meters, one for the cold water, the other for hot water.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => this.props.controller.initialize(true)}>
            Cold-Hot
          </Button>
          <Button size="small" color="primary" onClick={() => this.props.controller.initialize(false)}>
            Standard
          </Button>
        </CardActions>
      </Card>
    );
  }
}
