import * as React from 'react';
import { useEffect, useState } from 'react';
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
import { AddCarViewModel } from '../../../interface-adapter/Traveling/AddCarViewModel';
import { travelFactory } from '../../../interface-adapter';

interface AddCarViewProps {
  addCar: (name: string, consumption: string, engine: string, km: string) => any;
  hide: () => any;
  viewModel: AddCarViewModel;
}

const PureAddCarView: React.FC<AddCarViewProps> = (props: AddCarViewProps) => {
  const [state, setState] = useState({ name: '', engine: props.viewModel.engines[0], consumption: '', km: '0' });
  const [isDisplayed, setIsDisplayed] = useState(props.viewModel.displayed);

  useEffect(function listenToViewModelEvents() {
    props.viewModel.on(AddCarViewModel.events.displayChanged, ({ displayed }) => {
      setIsDisplayed(displayed);
    });
  }, [props.viewModel]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.addCar(state.name, state.consumption, state.engine, state.km);
  };

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    event.persist();
    setState({ ...state, [event.target.name as string]: event.target.value });
  };

  return (
    <Dialog open={isDisplayed} onClose={() => props.hide()}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <DialogTitle id="form-dialog-title">{props.viewModel.titleLabel}</DialogTitle>
        <DialogContent>
          <TextField autoFocus name="name" label={props.viewModel.nameLabel} type="text" fullWidth
                     onChange={(e) => handleChange(e)}/>
          <TextField name="consumption" label={props.viewModel.consumptionLabel} type="number" fullWidth
                     onChange={(e) => handleChange(e)}
                     InputProps={{
                       endAdornment: <InputAdornment
                         position="end">{props.viewModel.consumptionSuffix}</InputAdornment>,
                     }}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="engine">{props.viewModel.engineLabel}</InputLabel>
            <Select id="engine" name="engine" value={state.engine} onChange={(e) => handleChange(e)}>
              {
                props.viewModel.engines.map((engine) => <MenuItem key={'engine_' + engine}
                                                                  value={engine}>{engine}</MenuItem>)
              }

            </Select>
          </FormControl>
          <TextField name="km" label={props.viewModel.kmLabel} type="number" fullWidth
                     value={state.km}
                     onChange={(e) => handleChange(e)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.hide()}
                  color="primary">{props.viewModel.cancelLabel}</Button>
          <Button color="primary" type="submit">{props.viewModel.saveLabel}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default (
  {
    hide = () => travelFactory.presenter.hideAddCar(),
    addCar = (name, consumption, engine, km) => travelFactory.controller.addCar(name, consumption, engine, km),
    viewModel = travelFactory.viewModel.addCarView,
  }: Partial<AddCarViewProps>,
) => {
  return (<PureAddCarView {...{ hide, addCar, viewModel }}/>);
};
