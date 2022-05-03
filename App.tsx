import {SafeAreaView, TextInput} from 'react-native';
import tw from './services/tw';
import Dropdown from './src/components/Dropdown';
import countries from './src/countries/index.json';
import React from 'react';

const App = () => {
  return (
    <SafeAreaView style={tw`w-100%`}>  
      <Dropdown label="Countries" data={countries} />
    </SafeAreaView>
  );
};

export default App;
