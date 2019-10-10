import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';
import HomePage from '../page/index/Index';
import AreaPage from '../page/area/Area';
import DevicePage from '../page/device/Device';
import ScreenPage from '../page/screen/Screen';
const MainNavigator  = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
    },
    AreaPage: {
        screen: AreaPage,
        navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
    },
    DevicePage: {
        screen: DevicePage,
        navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
    },
    ScreenPage: {
        screen: ScreenPage,
        navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
    }
}, {
    initialRouteName: 'HomePage'
});

export default createAppContainer(createSwitchNavigator({
    Main: MainNavigator
}))
