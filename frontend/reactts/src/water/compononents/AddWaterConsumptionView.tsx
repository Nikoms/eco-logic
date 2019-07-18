import { WaterController } from '@eco/frontend-interface-adapter/src/Water/WaterController';
import * as React from 'react';
import { ViewModel } from '@eco/frontend-interface-adapter/src/Water/ViewModel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { WaterUI } from '@eco/frontend-interface-adapter/src/Water/WaterUI';

interface AddWaterConsumptionViewProps {
  controller: WaterController;
  viewModel: ViewModel;
  presenter: WaterUI;
}

export default class AddWaterConsumptionView extends React.Component<AddWaterConsumptionViewProps> {
  forms: {
    ref: any,
    meterId: string,
    name: string,
    quantity: string,
  }[] = [];

  constructor(props: AddWaterConsumptionViewProps) {
    super(props);

    this.forms = this.props.viewModel.meters.map(meter => ({
      ref: React.createRef(),
      meterId: meter.id,
      name: meter.name,
      quantity: '',
    }));
  }

  handleSubmit(event: any) {
    this.props.controller.addConsumption(this.forms.map(form => ({
      meterId: form.meterId,
      quantity: form.ref.current.value,
    })));
    event.preventDefault();
  }

  render() {
    return (
      <Dialog open={this.props.viewModel.displayed}
              onClose={() => this.props.presenter.hideAddWaterConsumption()}
              aria-labelledby="form-dialog-title">
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <DialogTitle id="form-dialog-title">Insert your updated consumptions</DialogTitle>
          <DialogContent>
            {this.forms.map((meter, i) => (<TextField
              inputRef={meter.ref}
              autoFocus={i === 0}
              key={meter.meterId}
              label={meter.name}
              InputProps={{
                endAdornment: <InputAdornment position="end">m3</InputAdornment>,
              }}
              type="number"
              fullWidth
            />))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.presenter.hideAddWaterConsumption()} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save consumption
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
