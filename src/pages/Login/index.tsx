import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableWithoutFeedback  as TWF,
    Keyboard
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

import logo from '../../images/logo-text.png';

import Header from '../../components/GrayHeader';

function Login() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activedKeyboard, setActivedKeyboard] = useState<boolean>(false);

    function handleLogin() {
        navigation.navigate('drawer');
    }

    function handleRegister() {
        navigation.navigate('register');
    }

    function handleResetPassword() {
        navigation.navigate('reset-password');
    }

    useEffect(() => {
        function keyboardDidHide() {
            setActivedKeyboard(false);
        }
        function keyboardDidShow() {
            setActivedKeyboard(true);
        }
        Keyboard.addListener('keyboardDidHide', keyboardDidHide);
        Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        return () => {
            Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
            Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
        }
    }, [])

    return <View style={styles.container}>
        <Header title="Login" unlogged/>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={logo}/>
        </View>
        <KeyboardAvoidingView style={styles.interfaceInputs}>
            <View style={styles.inputContainer}>
                <Feather
                    name="mail"
                    size={30}
                    color="#292C2F"
                    style={styles.inputIcon}
                />
                <View style={styles.inputView}>
                    <Text style={styles.inputTitle}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={txt => setEmail(txt)}
                        placeholder="Type your email"
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Feather
                    name="lock"
                    size={30}
                    color="#292C2F"
                    style={styles.inputIcon}
                />
                <View style={styles.inputView}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={txt => setPassword(txt)}
                        secureTextEntry
                        placeholder="Type your password"
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
        {!activedKeyboard ? <View style={styles.buttonsContainer}>
            <RectButton style={styles.buttonLogin} onPress={handleLogin}>
                <Text style={styles.buttonLoginText}>Login</Text>
            </RectButton>
            <Text style={styles.text}>
                Don't you have an account yet?{' '}
                <TWF onPress={handleRegister}>
                    <Text style={styles.textButton}>
                        Sign Up
                    </Text>
                </TWF>
            </Text>
            <RectButton onPress={handleResetPassword}>
                <Text style={styles.textForgotPassword}>Forgot password?</Text>
            </RectButton>
        </View> : null}
    </View>
}

export default Login;