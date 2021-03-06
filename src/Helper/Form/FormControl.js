import React from "react";
import { Input } from "./Input";
import { SelectOption } from "./SelectOption";
import { TextArea } from "./TextArea";

function FormControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "select":
      return <SelectOption {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    default:
      return null;
  }
}

export default FormControl;
