import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Drawer from './Drawer';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';

function Stack() {
    const { Navigator, Screen } = createStackNavigator();

    return <View style={{ width: '100%', height: '100%' }}>
        <NavigationContainer>
            <Navigator headerMode="none" initialRouteName="landing">
                <Screen name="landing" component={Landing} />
                <Screen name="login" component={Login} />
                <Screen name="drawer" component={Drawer} />
                <Screen name="register" component={Register} />
                <Screen name="reset-password" component={ResetPassword} />
            </Navigator>
        </NavigationContainer>
    </View>
}

export default Stack;