import React, { useState } from 'react';
import { View, Image, Text, TextInput, ScrollView, TouchableWithoutFeedback as TWF } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import Header from '../../components/GrayHeader';

import styles from './styles';

import logo from '../../images/logo-text.png';

function ResetPassword() {

    const navigation = useNavigation();

    const [email, setEmail] = useState<string>('');

    function handleRegister() {
        navigation.navigate('register');
    }

    return <View style={styles.container}>
        <Header unlogged title="Password Reset" />
        <ScrollView style={styles.main} contentContainerStyle={styles.mainContent}>
            <Image style={styles.logo} source={logo}/>
            <Text style={styles.title}>Enter your email id to reset your password</Text>
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
            <RectButton style={styles.buttonLogin}>
                <Text style={styles.buttonLoginText}>Continue</Text>
            </RectButton>
            <Text style={styles.text}>
                Don't you have an account yet?{' '}
                <TWF onPress={handleRegister}>
                    <Text style={styles.textButton}>
                        Sign Up
                    </Text>
                </TWF>
            </Text>
        </ScrollView>
    </View>
}

export default ResetPassword;