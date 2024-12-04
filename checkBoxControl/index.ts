import * as React from "react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { createRoot, Root } from "react-dom/client";
import MultiSelectControl from "./MultiSelectControl";
import { CheckboxOnChangeData } from "@fluentui/react-components";

export class checkBoxControl
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private _root: Root;
  private _selected: number[] | undefined;
  private _notifyOutputChanged: () => void;
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this._root = createRoot(container);
    this._notifyOutputChanged = notifyOutputChanged;
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // const currentContext = {
    //   parameters: {
    //     MultiSelectColumn: {
    //       attributes: {
    //         Options: [
    //           { Value: 1, Label: "Option 1", Color: "#FF0000" },
    //           { Value: 2, Label: "Option 2", Color: "#00FF00" },
    //           { Value: 3, Label: "Option 3", Color: "#0000FF" },
    //           { Value: 4, Label: "Option 4", Color: "#FFFF00" },
    //           { Value: 5, Label: "Option 5", Color: "#FF00FF" },
    //         ],
    //       },
    //     },
    //     FluentUIV9Theme: { raw: "default" },
    //     CheckBoxSize: { raw: "medium" },
    //     CheckBoxShape: { raw: "square" },
    //   },
    // };
    this._selected = context.parameters.MultiSelectColumn.raw!;
    // Add code to update control view
    this._root.render(
      React.createElement(MultiSelectControl, {
        theme: context.parameters.FluentUIV9Theme.raw,
        size: context.parameters.CheckBoxSize.raw,
        shape: context.parameters.CheckBoxShape.raw,
        choices: context.parameters.MultiSelectColumn.attributes?.Options,
        //choices: currentContext.parameters.MultiSelectColumn.attributes.Options,
        selected: context.parameters.MultiSelectColumn.raw!,
        onChangeUpdate: this.onChangeSelect.bind(this),
        isDisabled : context.mode.isControlDisabled
      })
    );
  }

  public onChangeSelect(
    e: React.ChangeEvent<HTMLInputElement>,
    d: CheckboxOnChangeData
  ) {
    if (d.checked) {
      if (!this._selected) {
        this._selected = [];
      }
      const Val: number = Number(e.target.getAttribute("value"));
      const SelectedOptions = [...this._selected];
      (SelectedOptions as number[]).push(Val);
      this._selected = SelectedOptions;
    } else {
      if (!this._selected) {
        this._selected = [];
      }
      const Val: number = Number(e.target.getAttribute("value"));
      const SelectedOptions = [...this._selected];
      const filterdOptions = SelectedOptions.filter((number) => number !== Val);
      this._selected = filterdOptions;
    }
    this._notifyOutputChanged();
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
   */
  public getOutputs(): IOutputs {
    return {
      MultiSelectColumn: this._selected,
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
