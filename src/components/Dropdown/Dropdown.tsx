import {Dispatch, SetStateAction, useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface DropdownProps {
  open: boolean;
  value: string | null;
  items: Array<any>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<null>>;
  setItems: Dispatch<SetStateAction<{label: string; value: string}[]>>;
  placeholder: string;
}

const Dropdown = ({
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  placeholder,
}: DropdownProps) => {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      disableBorderRadius={true}
      placeholder={placeholder}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({});
