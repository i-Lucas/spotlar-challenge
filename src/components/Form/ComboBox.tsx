import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface ComboBoxProps {
  options: ICurrency[];
  label: "From" | "To";
  disabled: boolean;
  isSmallScreen: boolean;
  setFromTo: (option: "from" | "to", value: string) => void;
};

export default function ComboBox(props: ComboBoxProps) {

  const { options, label, disabled, isSmallScreen, setFromTo } = props;
  const uniqueOptions = Array.from(new Set(options.map(option => option.code))).map(code => {
    return options.find(option => option.code === code);
  });

  const filteredOptions = uniqueOptions.filter(option => option?.name?.trim() !== "");

  const formatOption = (option: ICurrency | undefined) => {
    if (!option) return "";
    return `${option?.name} [ ${option?.code.toUpperCase()} ]`;
  };

  return (
    <Autocomplete
      size="small"
      disablePortal
      disabled={disabled}
      sx={{ width: isSmallScreen ? "90%" : "25%" }}
      id="combo-box-demo"
      options={filteredOptions}
      renderInput={(params) => <TextField {...params} label={label} />}
      getOptionLabel={(option: ICurrency | undefined) => formatOption(option)}
      onChange={(event, value) => setFromTo(label.toLowerCase() as "from" | "to", value?.code ?? "")}
    />
  );
};
