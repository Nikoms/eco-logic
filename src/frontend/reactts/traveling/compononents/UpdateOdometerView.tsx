import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TravelingController, TravelingUI, TravelingViewModel } from '../../../interface-adapter';
import { ViewModel } from '../../../interface-adapter/Traveling/ViewModel';
import { OdometerForm } from '../../../interface-adapter/Traveling/UpdateOdometerViewModel';

interface UpdateOdometerViewProps {
  controller: TravelingController;
  viewModel: TravelingViewModel;
  presenter: TravelingUI;
}

export default class UpdateOdometerView extends React.Component<UpdateOdometerViewProps> {
  state = {
    km: '',
    displayed: false,
    previouslyPlaceHolder: '',
    carName: '',
    carId: '',
  };

  componentDidMount() {
    this.props.viewModel.on(ViewModel.events.formChanged, (payload: OdometerForm) => {
      this.setState({
        ...this.state,
        displayed: payload.displayed,
        previouslyPlaceHolder: payload.previouslyPlaceHolder,
        carName: payload.carName,
        carId: payload.carId,
      });
    });
  }

  handleSubmit(event: any) {
    this.props.controller.updateOdometer(this.state.carId, this.state.km);
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
    const vm = this.props.viewModel.updateOdometerView;
    return (<Dialog open={this.state.displayed}
                    onClose={() => this.props.presenter.hideUpdateOdometer()}
                    aria-labelledby="form-dialog-title">
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <DialogTitle id="form-dialog-title">{vm.titleText}</DialogTitle>
        <DialogContent>
          <TextField name="km" label={this.state.carName}
                     type="number"
                     autoFocus
                     fullWidth
                     onChange={(e) => this.handleChange(e)}
                     placeholder={this.state.previouslyPlaceHolder}
                     InputProps={{ endAdornment: <InputAdornment position="end">km</InputAdornment> }}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.presenter.hideUpdateOdometer()} color="primary">{vm.cancelText}</Button>
          <Button color="primary" type="submit">{vm.saveText}</Button>
        </DialogActions>
      </form>
    </Dialog>);
  }
}
