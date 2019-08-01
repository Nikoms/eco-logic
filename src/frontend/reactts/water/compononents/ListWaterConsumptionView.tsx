import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { WaterConsumptionViewModel, WaterController, WaterViewModel } from '../../../interface-adapter';


interface ListWaterMeterViewProps {
  label: Pick<WaterViewModel, 'noConsumptionsMessage' | 'headerM3Label' | 'headerMeterNameLabel' | 'headerDateLabel'>;
  consumptions: WaterConsumptionViewModel[];
  controller: WaterController;
}

export default class ListWaterMeterView extends React.Component<ListWaterMeterViewProps> {
  constructor(props: ListWaterMeterViewProps) {
    super(props);
    this.props.controller.refreshConsumptions();
  }

  render() {
    return (
      <div><Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{this.props.label.headerM3Label}</TableCell>
              <TableCell>{this.props.label.headerMeterNameLabel}</TableCell>
              <TableCell>{this.props.label.headerDateLabel}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.consumptions.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.meterId}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
        {this.props.consumptions.length === 0 && <h2>{this.props.label.noConsumptionsMessage}</h2>}
      </div>
    );
  }
}
