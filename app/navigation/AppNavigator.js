import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Landing from '../modules/main/Landing';
import Home from '../modules/main/Home';
import Login from '../modules/auth/Login';
import Signup from '../modules/auth/Signup';
import Register from '../modules/auth/Register';
import SelectCountry from '../modules/auth/SelectCountry';

const AppNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Main: { screen: Landing },
    Home: { screen: Home },
    Signup: { screen: Signup },
    Register: { screen: Register },
    SelectCountry: { screen: SelectCountry },
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
  }
);

export default createAppContainer(AppNavigator);
