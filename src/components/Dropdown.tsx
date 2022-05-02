import {faArrowsUpDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC, ReactElement, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  TextInput,
} from 'react-native';
import { Style } from 'twrnc/dist/esm/types';
import tw from '../../services/tw';

type Props = {
  label: string;
  data: Array<{label: string; value: string}>;
  styles?: Style;
};

const Dropdown: FC<Props> = ({label, data, styles}) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [text, onChangeText] = React.useState('');
  const [list, setList] = useState(data);

  const defaultStyles = tw``;


  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure(
      (
        _fx: number,
        _fy: number,
        _w: number,
        h: number,
        _px: number,
        py: number,
      ) => {
        setDropdownTop(py);
      },
    );
    setVisible(true);
  };

  const onItemPress = (item: any): void => {
    setSelected(item);
    setVisible(false);
  };

  const renderItem = ({item}: any): ReactElement<any, any> => (
    <TouchableOpacity
      accessible={true}
      style={tw`px-[10] py-[10]`}
      onPress={() => onItemPress(item)}
      accessibilityLabel={item.label}>
      <Text style={tw`font-semibold`}>{item.label}</Text>
    </TouchableOpacity>
  );

  const onFilter = query => {
    onChangeText(query);
    data = data.filter(value => {
      return value.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
    setList(data);
  };

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        style={tw`h-full`}
      >
        <TouchableOpacity onPress={() => setVisible(false)}>
          <View
            style={[
              tw`w-[100%] bg-white w-full shadow-black items-center`,
              { top: dropdownTop },
            ]}
          >
            <FlatList
              style={tw`w-[100%] border-2 h-100 rounded-md`}
              data={list}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              nestedScrollEnabled
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={tw`flex-row justify-between border-2 p-2 rounded-md`}>
      {/* <FontAwesomeIcon icon={faArrowDown} /> */}
      <TextInput
        accessible={true}
        style={tw`rounded-md`}
        onChangeText={onFilter}
        placeholder="Search..."
        autoCapitalize="none"
        value={selected}
        accessibilityLabel="Search!"
        accessibilityHint="Type for search countries"
        accessibilityRole="search"
      />
      <TouchableOpacity
        ref={DropdownButton}
        accessible={true}
        accessibilityLabel="Click to open!"
        accessibilityHint="Open the options"
        onPress={toggleDropdown}
        accessibilityRole="combobox">
        {renderDropdown()}
        <FontAwesomeIcon style={tw`py-3 border-indigo-600`} icon={faArrowsUpDown} />
      </TouchableOpacity>
    </View>
  );
};
export default Dropdown;
