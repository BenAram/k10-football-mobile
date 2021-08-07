import React from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles'

import bg from '../../images/background-landing.png';

function Landing() {

    const navigation = useNavigation();

    function handleLogin() {
        navigation.navigate('login');
    }

    function handleRegister() {
        navigation.navigate('register');
    }

    return <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={bg}/>
        </View>
        <View style={styles.buttonsContainer}>
            <RectButton style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginText}>Login</Text>
            </RectButton>
            <RectButton style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerText}>Sign up</Text>
            </RectButton>
        </View>
    </View>
}

export default Landing;