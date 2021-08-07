import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableWithoutFeedback as TWF } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';
import { Checkbox } from 'react-native-paper';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import Header from '../../components/GrayHeader';

function Register() {

    const navigation = useNavigation();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [youAre, setYouAre] = useState<string>('player');
    const [checked, setChecked] = useState<boolean>(false);

    function handleToggleChecked() {
        setChecked(!checked);
    }

    function handleRegister() {
        navigation.navigate('drawer');
    }

    function handleLogIn() {
        navigation.navigate('login');
    }

    return <View style={styles.container}>
        <Header title="Sign up" unlogged/>
        <View style={styles.main}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={txt => setUsername(txt)}
                    placeholder="Type your username"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={txt => setEmail(txt)}
                    placeholder="Type your email"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={txt => setPassword(txt)}
                    secureTextEntry
                    placeholder="Type your password"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Repeat password</Text>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={txt => setConfirmPassword(txt)}
                    secureTextEntry
                    placeholder="Type your password again"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>You are?</Text>
                <Picker
                    style={styles.input}
                    selectedValue={youAre}
                    onValueChange={itemValue => setYouAre(itemValue as any)}
                    mode="dropdown"
                >
                    <Picker.Item label="Player" value="player"/>
                    <Picker.Item label="Evaluator" value="evaluator"/>
                </Picker>
            </View>
            <View style={styles.agreementsContainer}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={handleToggleChecked}
                    color="#000"
                    uncheckedColor="#000"
                />
                <TWF onPress={handleToggleChecked}>
                    <Text style={styles.agreements}>
                        By creating an account, you agree to our term & conditions
                    </Text>
                </TWF>
            </View>
        </View>
        <View style={styles.footer}>
            <RectButton style={styles.buttonRegister} onPress={handleRegister}>
                <Text style={styles.buttonRegisterText}>CREATE ACCOUNT</Text>
            </RectButton>
            <Text style={styles.footerText}>
                Already have an account?{' '}
                <TWF onPress={handleLogIn}>
                    <Text style={styles.footerTextButton}>Log in</Text>
                </TWF>
            </Text>
        </View>
    </View>
}

export default Register;