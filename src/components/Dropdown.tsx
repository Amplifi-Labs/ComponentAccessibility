import {faArrowsUpDown, faCheck} from '@fortawesome/free-solid-svg-icons';
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
  data: Array<{label: String, value: String | Number}>;
  value?: string;
  styles?: Style;
};

const Dropdown: FC<Props> = ({label, data, styles}) => {
  const DropdownButton = useRef<ReactElement>();
  const SearchInput = useRef<ReactElement>();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<{label: String, value: String | Number}>({label: '', value: ''});
  const [dropdownTop, setDropdownTop] = useState(0);
  const [query, setQuery] = useState('');
  const [list, setList] = useState(data);
  
  const defaultStyles = tw``;
  
  const onFilter = (query: string) => {
    setQuery(query);
    data = data.filter(value => {
      return value.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
    setList(data);
    openDropdown();
  };

  // const toggleDropdown = (): void => {
  //   visible ? setVisible(false) : openDropdown();
  // };

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
        setDropdownTop(py + h * 2);
      },
    );
    setVisible(true);
  };

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        style={tw`h-full w-5`}
        onShow={() => SearchInput.current.focus()}
      >
        <TouchableOpacity onPress={() => setVisible(false)}>
          <View
            style={[
              tw`w-[100%] bg-white w-full items-center`,
              { top: dropdownTop },
            ]}
          >
            <FlatList
              style={tw`w-[100%] border border-indigo-600 h-100 rounded-md`}
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

  const renderItem = ({item}: any): ReactElement<any, any> => (
    <TouchableOpacity
      accessible={true}
      style={tw`px-[10] py-[10] flex-row items-center justify-between`}
      onPress={() => onItemPress(item)}
      accessibilityLabel={item.label}
    >
      <Text style={tw.style(`text-base`, selected.value == item.value && `text-indigo-600`)}>{item.label}</Text>
      {selected.value == item.value && <FontAwesomeIcon color='#3949AB' style={tw`py-3`} icon={faCheck} />}
    </TouchableOpacity>
  );

  const onItemPress = (item: any): void => {
    setSelected(item);
    setQuery(item.label);
    onFilter(item.label);
    setVisible(false);
  };

  return (
    <>
      <Text accessible={true} accessibilityLabel={label} style={tw`text-sm font-medium text-gray-700`}>{label}</Text>
      <View style={tw.style(`flex-row justify-between border-2 border-gray-500 p-2 rounded-md`, visible && `border border-indigo-600`)}
            onTouchStart={openDropdown}
      >
        <TextInput
          ref={SearchInput}
          accessible={true}
          accessibilityHint="Type for search countries"
          accessibilityRole="search"
          placeholder="Search..."
          autoCapitalize="none"
          style={tw`rounded-md`}
          onChangeText={onFilter}
          value={query}
        />
        <TouchableOpacity
          ref={DropdownButton}
          accessible={true}
          accessibilityHint="Open combobox's options"
          accessibilityRole="combobox"
        >
          {renderDropdown()}
          <FontAwesomeIcon color='#adb5bd' style={tw`py-3`} icon={faArrowsUpDown} />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Dropdown;
