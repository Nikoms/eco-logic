import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { TravelingController, TravelingUI, TravelingViewModel } from '../../../interface-adapter';
import { AddFlightRequest } from '../../../../eco/domain';

interface AddFlightViewProps {
  controller: TravelingController;
  viewModel: TravelingViewModel;
  presenter: TravelingUI;
}

export default class AddFlightView extends React.Component<AddFlightViewProps> {

  state: {
    km: string,
    seat: string,
    description: string,
  };

  constructor(props: AddFlightViewProps) {
    super(props);
    this.state = {
      km: '',
      seat: props.viewModel.addFlightView.seats[0],
      description: '',
    };
  }

  handleSubmit(event: any) {
    const request = new AddFlightRequest(this.state.seat, this.state.km, this.state.description);
    this.props.controller.addFlight(request);
    event.preventDefault();
  }

  handleChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
    event.persist();
    this.setState(oldValues => ({
      ...oldValues,
      [event.target.name as string]: event.target.value,
    }));
    console.log(this.state);
  }

  render() {
    return (<Dialog open={this.props.viewModel.addFlightView.displayed}
                    onClose={() => this.props.presenter.cancelAddFlight()}
                    aria-labelledby="form-dialog-title">
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <DialogTitle id="form-dialog-title">{this.props.viewModel.addFlightView.titleLabel}</DialogTitle>
        <DialogContent>
          <TextField autoFocus name="km" label="Distance" value={this.state.km} type="number" fullWidth
                     onChange={(e) => this.handleChange(e)}/>
          <FormControl fullWidth>
            <InputLabel htmlFor="seat">{this.props.viewModel.addFlightView.seatsLabel}</InputLabel>
            <Select id="seat" name="seat" value={this.state.seat} onChange={(e) => this.handleChange(e)}>
              {
                this.props.viewModel.addFlightView.seats.map((seat) => <MenuItem key={'seat_' + seat}
                                                                                 value={seat}>{seat}</MenuItem>)
              }

            </Select>
          </FormControl>
          <TextField name="description" label={this.props.viewModel.addFlightView.descriptionLabel} fullWidth
                     value={this.state.description}
                     onChange={(e) => this.handleChange(e)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.presenter.cancelAddFlight()}
                  color="primary">{this.props.viewModel.addFlightView.cancelLabel}</Button>
          <Button color="primary" type="submit">{this.props.viewModel.addFlightView.saveLabel}</Button>
        </DialogActions>
      </form>
    </Dialog>);
  }
}
