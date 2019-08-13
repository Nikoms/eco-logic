import { fireEvent, RenderResult, waitForDomChange } from '@testing-library/react';

const basicEvent = () => {
  return {
    isPersisted: false,
    isPreventDefault: false,
    preventDefault: function() {
      this.isPreventDefault = true;
    },
    persist: function() {
      this.isPersisted = true;
    },
  };
};
const changeValueEvent = (name: string, value: string | number) => {
  return {
    ...basicEvent(),
    target: { name, value },
  };
};

class MaterialUISelect {
  constructor(private renderResult: RenderResult, private selectId: string) {

  }

  open() {
    fireEvent.click(this.renderResult.baseElement.querySelector('#select-' + this.selectId)!);
    return this;
  }

  close() {
    this.value(this.currentValue() || '');
    return this;
  }

  currentValue() {
    return this.renderResult.baseElement.querySelector('#' + this.selectId)!.getAttribute('value');
  }

  possibleValues() {
    this.open();
    const options = this.getSelectListBox().children;
    const values: any[] = [];
    for (let i = 0; i < options.length; i++) {
      values.push(options.item(i)!.getAttribute('data-value'));
    }
    this.close();
    return values;
  }

  value(value: string) {
    this.open();
    const option = this.getSelectListBox().querySelector('[data-value="' + value + '"]');
    if (option === null) {
      throw new Error('value "' + value + '" not found.');
    }
    fireEvent.click(option);
  }

  private getSelectListBox() {
    try {
      return this.renderResult.getByRole('listbox');
    } catch (e) {
      throw new Error('No listbox found: Please call "open" before asking the list');
    }
  }
}


class MaterialUIButton {

  constructor(private element: Element) {
  }

  static fromQuery(renderResult: RenderResult, query: string) {
    const element = renderResult.baseElement.querySelector(query);
    if (element === null) {
      throw new Error('Button "' + query + '" not found');
    }
    return new MaterialUIButton(element);
  }

  static fromText(renderResult: RenderResult, text: string) {
    return new MaterialUIButton(renderResult.getByText(text));
  }

  click() {
    fireEvent.click(this.element);
  }
}

class MaterialUIInput {
  constructor(private renderResult: RenderResult, private name: string) {
  }

  value(value: string | number) {
    const element = this.renderResult.baseElement.querySelector('[name="' + this.name + '"]');
    if (element === null) {
      throw new Error('Input "' + this.name + '" not found');
    }

    fireEvent.change(element, changeValueEvent(this.name, value));
  }
}

class MaterialUIDialog {
  constructor(private renderResult: RenderResult) {
  }

  isDisplayed() {
    return this.renderResult.queryByRole('dialog') !== null;
  }

  isHidden() {
    return !this.isDisplayed();
  }
}

export const wrapper = (o: RenderResult) => {
  return {
    base: o.baseElement,
    waitForDomChange,
    materialUi: {
      select: (name) => new MaterialUISelect(o, name),
      input: (name) => new MaterialUIInput(o, name),
      buttonFromQuery: (query) => MaterialUIButton.fromQuery(o, query),
      buttonWithText: (text) => MaterialUIButton.fromText(o, text),
      dialog: () => new MaterialUIDialog(o),
    },
  };
};
