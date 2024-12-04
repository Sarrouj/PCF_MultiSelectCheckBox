import { Checkbox, CheckboxOnChangeData } from "@fluentui/react-components";
import {
  FluentProvider,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  Theme,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";

import * as React from "react";

interface props {
  theme: string;
  size: "medium" | "large" | undefined;
  shape: "square" | "circular" | undefined;
  choices: ComponentFramework.PropertyHelper.OptionMetadata[] | undefined;
  selected: number[];
  isDisabled : boolean;
  onChangeUpdate: (
    e: React.ChangeEvent<HTMLInputElement>,
    d: CheckboxOnChangeData
  ) => void;
}

const MultiSelectControl: React.FC<props> = ({
  choices,
  selected,
  theme,
  size,
  shape,
  onChangeUpdate,
  isDisabled
}) => {
  const themeProps: Record<string, Theme> = {
    webLightTheme: webLightTheme,
    webDarkTheme: webDarkTheme,
    teamsLightTheme: teamsLightTheme,
    teamsHighContrastTheme: teamsHighContrastTheme,
    teamsDarkTheme: teamsDarkTheme,
  };
  const selectedOptions = selected;

  function isCheckedChecker(selecetedValue: number): boolean {
    if (
      selectedOptions &&
      (selectedOptions as number[]).indexOf(selecetedValue) !== -1
    ) {
      return true;
    } else {
      return false;
    }
  }

  if (!choices) {
    return <>****</>;
  }

  return (
    <FluentProvider theme={themeProps[theme]}>
      {choices?.map((choice, index) => (
        <React.Fragment key={index}>
          <Checkbox
            size={size}
            value={choice.Value}
            shape={shape}
            label={choice.Label}
            checked={isCheckedChecker(choice.Value)}
            onChange={(e, d) => onChangeUpdate(e, d)}
            disabled={isDisabled}
          />
          <br />
        </React.Fragment>
      ))}
    </FluentProvider>
  );
};

export default MultiSelectControl;
