import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import styles from './styles';

import logo from '../../images/logo-text.png';

function About() {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    useEffect(() => {
        dispatch({
            type: 'change-drawer-title',
            value: 'About'
        })
        navigation.addListener('focus', () => {
            dispatch({
                type: 'change-drawer-title',
                value: 'About'
            })
        })
    }, [])

    return <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
        <Image source={logo}/>
        <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus sodales tellus ut pretium. Ut sed vulputate neque, eu luctus augue. Nullam id erat elit. Fusce egestas nisl at leo tempus, eget lobortis ipsum feugiat. Sed ornare et eros non porta. Ut orci magna, hendrerit ac nulla id, elementum efficitur lorem. Vestibulum ante erat, semper et suscipit varius, rhoncus at lorem. Duis feugiat malesuada mi id mattis. Aenean bibendum ligula efficitur neque lacinia pulvinar. Maecenas sollicitudin nisl et turpis elementum porta. Donec vitae dapibus justo. Maecenas semper arcu lorem, ac suscipit nulla efficitur a. Nulla facilisi. Suspendisse a diam a nisl aliquet sodales.</Text>
    </ScrollView>
}

export default About;