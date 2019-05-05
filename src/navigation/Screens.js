import React from 'react';
import { Easing, Animated, Platform } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Block, Text, theme } from "galio-framework";

import Menu from './Menu';

// Screens 
import ExpensesScreen from '../screens/Expenses';
import HomeScreen from '../screens/Home';
import SigninScreen from '../screens/Signin';
import SignupScreen from '../screens/Signup';
import TripScreen from '../screens/Trip';
import SettingsScreen from '../screens/Settings';
import ReportsScreen from '../screens/Reports';
import NewExpenseScreen from '../screens/NewExpense';
import NewReportScreen from '../screens/NewReport';


// Components 
import Header from '../components/Header';
import { Drawer } from '../components/';

// Transitions when switch between screens
const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index
    const width = layout.initWidth
    
    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    })
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1],
    })
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    })

    const scaleWithOpacity = { opacity }
    const screenName = "N/A"

    if (screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] }
  }
})


const AuthenticationStack = createStackNavigator({
  Signin: {
    screen: SigninScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
    })
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
})

const ExpensesStack = createStackNavigator({
  Expenses: {
    screen: ExpensesScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header tabs title="Expenses" navigation={navigation} />,
    })
  },
  NewExpense: {
    screen: NewExpenseScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="New Expense" navigation={navigation} />,
    })
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Settings" navigation={navigation} />,
    })
  }
  }, 
  {
    cardStyle: { backgroundColor: '#EEEEEE', },
    transitionConfig,
  }
)

const ReportsStack = createStackNavigator({
  Reports: {
    screen: ReportsScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header title="Reports" navigation={navigation} />,
    })
  },
  NewReport: {
    screen: NewReportScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="New Report" navigation={navigation} />,
    })
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Settings" navigation={navigation} />,
    })
  }
  }, 
  {
    cardStyle: { backgroundColor: '#EEEEEE', },
    transitionConfig,
  }
)


const TripStack = createStackNavigator({
  Trip: {
    screen: TripScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header title="Trip" navigation={navigation} />,
    })
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Settings" navigation={navigation} />,
    })
  }
  },
  {
    cardStyle: { backgroundColor: '#EEEEEE', },
    transitionConfig,
  }
)

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Settings" navigation={navigation} />,
    })
  }},
  {
    cardStyle: { backgroundColor: '#EEEEEE', },
    transitionConfig,
  }
)


const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header tabs title="Home" navigation={navigation} />,
    })
  },
  NewExpense: {
    screen: NewExpenseScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="New Expense" navigation={navigation} />,
    })
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Settings" navigation={navigation} />,
    })
  }
  // Expenses: {
  //   screen: ExpensesStack,
  //   // navigationOptions: ({navigation}) => ({
  //   //   header: <Header tabs title="Expenses" navigation={navigation} />,
  //   // })
  // },
  // Profile: {
  //   screen: ProfileScreen,
  //   navigationOptions: ({navigation}) => ({
  //     header: <Header white transparent title="Profile" navigation={navigation} />,
  //     headerTransparent: true,
  //   })
  // },
},
{
  cardStyle: { 
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const AppStack = createDrawerNavigator(
  {
    // Authentication: {
    //   screen: AuthenticationStack,
    //   navigationOptions: {
    //     drawerLabel: () => {},
    //   },
    // },
    Dashboard: {
      screen: HomeStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Home" title="Home" />
        ),
      }),
    },
    Expenses: {
      screen: ExpensesStack,
      navigationOptions: (navOp) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Expenses" title="Expenses" />
        ),
      }),
    },
    Reports: {
      screen: ReportsStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Reports" title="Reports" />
        ),
      }),
    },
    Trip: {
      screen: TripStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Trip" title="Trip" />
        ),
      }),
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Settings" title="Settings" />
        ),
      }),
    },
    MenuDivider: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: () => <Block style={{marginVertical: 64}}><Text>{` `}</Text></Block>,
      },
    },
    SignOut: {
      screen: AuthenticationStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Authentication" title="Sign Out" />
        ),
      }),
    },
  },
  Menu
);

export default createSwitchNavigator(
  {
    // Authentication: AuthenticationStack,
    App: AppStack,
    Home: HomeStack,
  },
  {
    initialRouteName: 'App',
  }
);