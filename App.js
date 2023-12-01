import AppIndex from "./app/index";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Catalogs from "./app/catalogs"
import Calculator from "./app/calculator";
import Report from "./app/report";

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={AppIndex} options={{headerShown: false}} />
          <Stack.Screen name="Catalogs" component={Catalogs} />
          <Stack.Screen name="Calculator" component={Calculator} />
          <Stack.Screen name="Report" component={Report} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
