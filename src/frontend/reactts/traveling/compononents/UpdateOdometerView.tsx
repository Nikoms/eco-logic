import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TravelingController, TravelingUI, TravelingViewModel } from '../../../interface-adapter';

interface UpdateOdometerViewProps {
  controller: TravelingController;
  viewModel: TravelingViewModel;
  presenter: TravelingUI;
}

export default class UpdateOdometerView extends React.Component<UpdateOdometerViewProps> {
  state = {
    km: '',
  };

  handleSubmit(event: any) {
    const carId = this.props.viewModel.updateOdometerView.selectedCar
      ? this.props.viewModel.updateOdometerView.selectedCar.id
      : '';
    this.props.controller.updateOdometer(carId, this.state.km);

    event.preventDefault();
  }

  handleChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
    event.persist();
    this.setState(oldValues => ({
      ...oldValues,
      [event.target.name as string]: event.target.value,
    }));
  }

  render() {
    const carName = this.props.viewModel.updateOdometerView.selectedCar
      ? this.props.viewModel.updateOdometerView.selectedCar.name
      : '';
    const previously = this.props.viewModel.updateOdometerView.selectedCar
      ? this.props.viewModel.updateOdometerView.selectedCar.distance
      : '0';

    return (<Dialog open={this.props.viewModel.updateOdometerView.displayed}
                    onClose={() => this.props.presenter.hideUpdateOdometer()}
                    aria-labelledby="form-dialog-title">
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <DialogTitle id="form-dialog-title">{this.props.viewModel.updateOdometerView.titleText}</DialogTitle>
        <DialogContent>
          <TextField name="km" label={carName} fullWidth
                     type="number"
                     onChange={(e) => this.handleChange(e)}
                     placeholder={'Previously: ' + previously}
                     InputProps={{
                       endAdornment: <InputAdornment
                         position="end">km</InputAdornment>,
                     }}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.presenter.hideUpdateOdometer()}
                  color="primary">{this.props.viewModel.updateOdometerView.cancelText}</Button>
          <Button color="primary" type="submit">{this.props.viewModel.updateOdometerView.saveText}</Button>
        </DialogActions>
      </form>
    </Dialog>);
  }
}
