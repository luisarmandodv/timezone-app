import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';
import Home from './components/Home';
import Context from './utils/Context';

const Stack = createStackNavigator();

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <Context.Provider
      value={{
        isModalVisible,
        setIsModalVisible,
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Team Timezones',
              headerRight: (props) => (
                <View style={{marginRight: 20}}>
                  <Feather
                    name="plus"
                    size={30}
                    color="#3c6382"
                    onPress={() => setIsModalVisible(true)}
                  />
                </View>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}

export default App;
