import React, { useState } from "react";
import {
  ExpandIcon,
  SelectContainer,
  SelectDropdown,
  SelectDropdownOption,
  SelectText,
} from "./Styles";
import { FiChevronDown } from "react-icons/fi";
import { IconContext } from "react-icons";

const Select = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  return (
    <SelectContainer onClick={() => setIsOpen(!isOpen)}>
      <SelectText>{selected}</SelectText>
      <IconContext.Provider value={{ color: "blue", size: "1.5em" }}>
        <FiChevronDown />
      </IconContext.Provider>
      {isOpen && (
        <SelectDropdown>
          {options.map((option, idx) => {
            return (
              <SelectDropdownOption
                onClick={() => setSelected(option)}
                key={idx}
              >
                {option}
              </SelectDropdownOption>
            );
          })}
        </SelectDropdown>
      )}
    </SelectContainer>
  );
};

export default Select;
