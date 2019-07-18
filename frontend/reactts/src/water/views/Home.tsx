import * as React from 'react';
import { ViewModel } from '@eco/frontend-interface-adapter/src/Water/ViewModel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core';
import { NonFunctionProperties } from '../../shared-kernel/type/NonFunctionProperties';
import InitWaterMeterView from '../compononents/InitWaterMeterView';
import ListWaterMeterView from '../compononents/ListWaterConsumptionView';
import AddWaterConsumptionView from '../compononents/AddWaterConsumptionView';
import { WaterFactory } from '@eco/frontend-interface-adapter/src/Water/WaterFactory';

const styles = (theme: Theme) => {
  return {
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  };
};

interface HomeProps {
  waterFactory: WaterFactory;
}

@withStyles(styles)
export default class Home extends React.Component<HomeProps> {
  state: NonFunctionProperties<ViewModel> = { ...new ViewModel() };

  constructor(props: HomeProps) {
    super(props);
    this.props.waterFactory.viewModel.onChange((viewModel, newValues) => {
      this.setState({ ...newValues });
    });
    this.props.waterFactory.controller.refreshSummary();
  }

  render() {
    if (!this.state.hasMeter) {
      return (<InitWaterMeterView controller={this.props.waterFactory.controller}/>);
    }

    return (<div>
      <ListWaterMeterView label={this.props.waterFactory.viewModel}
                          consumptions={this.props.waterFactory.viewModel.consumptions}
                          controller={this.props.waterFactory.controller}/>
      <AddWaterConsumptionView
        controller={this.props.waterFactory.controller}
        viewModel={this.props.waterFactory.viewModel}
        presenter={this.props.waterFactory.presenter}/>

      <Fab color="primary" aria-label="Add" className={this.props.classes.fab}
           onClick={() => this.props.waterFactory.presenter.showAddWaterConsumption()}>
        <AddIcon/>
      </Fab>
    </div>);
  }
}