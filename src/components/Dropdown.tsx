import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
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
        setDropdownTop(py + h);
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
      style={tw`px-[10] py-[10] border-b`}
      onPress={() => onItemPress(item)}
      accessibilityLabel={item.label}>
      <Text style={tw`font-bold`}>{item.label}</Text>
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
        style={tw`h-full`}>
        <TouchableOpacity
          onPress={() => setVisible(false)}>
          <View style={[tw`w-[80%] bg-white w-full shadow-black items-center`, {top: dropdownTop}]}>
            <TextInput
              accessible={true}
              style={tw`w-[80%] border-gray-300 border-2 h-12 rounded-md`}
              onChangeText={onFilter}
              placeholder="Search..."
              autoCapitalize="none"
              value={text}
              accessibilityLabel="Search!"
              accessibilityHint="Type for search countries"
              accessibilityRole="search"
            />
            <FlatList
              style={tw`w-[80%] border-gray-300 border-2 h-100 rounded-md`}
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
    <TouchableOpacity
      ref={DropdownButton}
      style={tw`flex-row justify-between items-center bg-white`}
      accessible={true}
      accessibilityLabel="Click to open!"
      accessibilityHint="Open the options"
      onPress={toggleDropdown}
      accessibilityRole="combobox">
      {renderDropdown()}
      <Text style={tw`text-sm font-medium text-gray-700`}>      
        {(!!selected && selected.label) || label}
      </Text>
      <FontAwesomeIcon icon={faArrowDown} />
    </TouchableOpacity>
  );
};
export default Dropdown;
