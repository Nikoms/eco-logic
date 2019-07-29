import * as React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { AddCarRequest } from '@eco/domain';
import { TravelingViewModel, TravelingController, TravelingUI } from '@eco/frontend-interface-adapter';

interface AddCarViewProps {
  controller: TravelingController;
  viewModel: TravelingViewModel;
  presenter: TravelingUI;
}

export default class AddCarView extends React.Component<AddCarViewProps> {

  state = {
    name: '',
    engine: '',
    consumption: '',
    km: '0',
  };

  handleSubmit(event: any) {
    const request = new AddCarRequest(this.state.name, this.state.consumption, this.state.engine, this.state.km);
    this.props.controller.addCar(request);
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
    return (<Dialog open={this.props.viewModel.addCarView.displayed}
                    onClose={() => this.props.presenter.hideAddCar()}
                    aria-labelledby="form-dialog-title">
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <DialogTitle id="form-dialog-title">{this.props.viewModel.addCarView.titleLabel}</DialogTitle>
        <DialogContent>
          <TextField autoFocus name="name" label={this.props.viewModel.addCarView.nameLabel} type="text" fullWidth
                     onChange={(e) => this.handleChange(e)}/>
          <TextField name="consumption" label={this.props.viewModel.addCarView.consumptionLabel} type="number" fullWidth
                     onChange={(e) => this.handleChange(e)}
                     InputProps={{
                       endAdornment: <InputAdornment
                         position="end">{this.props.viewModel.addCarView.consumptionSuffix}</InputAdornment>,
                     }}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="age-simple">{this.props.viewModel.addCarView.engineLabel}</InputLabel>
            <Select id="age-simple" name="engine" value={this.state.engine} onChange={(e) => this.handleChange(e)}>
              {
                this.props.viewModel.addCarView.engines.map((engine) => <MenuItem key={'engine_' + engine}
                                                                                  value={engine}>{engine}</MenuItem>)
              }

            </Select>
          </FormControl>
          <TextField name="km" label={this.props.viewModel.addCarView.kmLabel} type="number" fullWidth
                     value={this.state.km}
                     onChange={(e) => this.handleChange(e)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.presenter.hideAddCar()}
                  color="primary">{this.props.viewModel.addCarView.cancelLabel}</Button>
          <Button color="primary" type="submit">{this.props.viewModel.addCarView.saveLabel}</Button>
        </DialogActions>
      </form>
    </Dialog>);
  }
}
