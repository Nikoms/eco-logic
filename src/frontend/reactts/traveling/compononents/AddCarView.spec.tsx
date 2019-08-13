import AddCarView from './AddCarView';
import React from 'react';
import { AddCarViewModel } from '../../../interface-adapter/Traveling/AddCarViewModel';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { wrapper } from '../../../__tests__utils__/wrapper';

let addCarArgs: any = [];
let hideWasCalled = false;
const addCar = (...args) => {
  addCarArgs = args;
};
const hide = () => {
  hideWasCalled = true;
};
beforeEach(() => {
  addCarArgs = [];
  hideWasCalled = false;
});

describe('AddCarView', () => {
  let viewModel: AddCarViewModel;
  let ui: ReturnType<typeof wrapper>;

  beforeEach(() => {
    viewModel = new AddCarViewModel();
    viewModel.setDisplayed(true);
    act(() => {
      ui = wrapper(render(<AddCarView addCar={addCar} hide={hide} viewModel={viewModel}/>));
    });
  });

  it('Clicking on "Cancel" hides the modal', async () => {
    expect(hideWasCalled).toBe(false);
    ui.materialUi.buttonWithText('Cancel').click();
    expect(hideWasCalled).toBe(true);
  });

  it('engine field: contains a list of engines and "gasoline" is the default value', async () => {
    const engine = ui.materialUi.select('engine');
    expect(engine.currentValue()).toBe('gasoline');
    expect(engine.possibleValues()).toEqual(viewModel.engines);
  });

  it('Click on "Submit" calls "addCar" with name, engine, consumption and km', async () => {
    ui.materialUi.input('name').value('My new car');
    ui.materialUi.input('consumption').value('6');
    ui.materialUi.select('engine').value('CNG');
    ui.materialUi.input('km').value('100');
    ui.materialUi.buttonFromQuery('[type="submit"]').click();

    expect(addCarArgs).toEqual(['My new car', '6', 'CNG', '100']);
  });

  it('The modal is linked to the viewModel "displayed" attribute', async () => {
    const dialog = ui.materialUi.dialog();
    expect(dialog.isDisplayed()).toBe(true);

    act(() => viewModel.setDisplayed(false));
    await ui.waitForDomChange();

    expect(dialog.isHidden()).toBe(true);
  });
});
