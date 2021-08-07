import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity as TO } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import DataContainer from '../../components/DataContainer';
import Footer from '../../components/RedFooter';

import styles from './styles';

function About() {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [initialEmail, setInitialEmail] = useState<string>('chiarabivitagirni@mail.com');
    const [initialPhone, setInitialPhone] = useState<string>('+ 0908 8000 7005');
    const [initialAddress, setInitialAddress] = useState<string>('South of Canada');
    const [initialClub, setInitialClub] = useState<string>('Club');

    const [email, setEmail] = useState<string>('chiarabivitagirni@mail.com');
    const [phone, setPhone] = useState<string>('+ 0908 8000 7005');
    const [address, setAddress] = useState<string>('South of Canada');
    const [club, setClub] = useState<string>('Club');

    const emailInput = useRef<TextInput>();
    const phoneInput = useRef<TextInput>();
    const addressInput = useRef<TextInput>();
    const clubInput = useRef<TextInput>();

    function verifyCanSave() {
        if (email !== initialEmail) {
            return true;
        }
        if (phone !== initialPhone) {
            return true;
        }
        if (address !== initialAddress) {
            return true;
        }
        if (club !== initialClub) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        dispatch({
            type: 'change-drawer-title',
            value: 'My Account'
        })
        navigation.addListener('focus', () => {
            dispatch({
                type: 'change-drawer-title',
                value: 'My Account'
            })
        })
    }, [])

    return <View style={styles.container}>
        <ScrollView style={styles.main} contentContainerStyle={styles.mainContent}>
            <View style={styles.profileContainer}>
                <View style={styles.profileImageContainer}>
                    <View style={styles.profileImage}/>
                </View>
                <Text style={styles.profileName}>Chiara Bivitagirni</Text>
                <Text style={styles.profilePosition}>Football Club</Text>
            </View>
            <DataContainer
                value={email}
                setValue={setEmail}
                placeholder="Your email"
                title="E-mail:"
                keyboardType="email-address"
            />
            <DataContainer
                value={phone}
                setValue={setPhone}
                placeholder="Your phone"
                title="Phone:"
                keyboardType="numeric"
            />
            <DataContainer
                value={address}
                setValue={setAddress}
                placeholder="Your address"
                title="Address:"
            />
            <DataContainer
                value={club}
                setValue={setClub}
                placeholder="Your club"
                title="Club:"
            />
        </ScrollView>
        <Footer>
            <TO disabled={!verifyCanSave()}>
                <Text style={styles.footerText}>Save Changes</Text>
            </TO>
        </Footer>
    </View>
}

export default About;