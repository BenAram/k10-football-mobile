import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import RatingPlayer from '../../components/RatingPlayer';

function History() {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    useEffect(() => {
        dispatch({
            type: 'change-drawer-title',
            value: 'History'
        })
        navigation.addListener('focus', () => {
            dispatch({
                type: 'change-drawer-title',
                value: 'History'
            })
        })
    }, [])

    return <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
        <RatingPlayer/>
        <RatingPlayer/>
        <RatingPlayer/>
        <RatingPlayer/>
        <RatingPlayer/>
        <RatingPlayer/>
        <RatingPlayer/>
        <RatingPlayer/>
        <RatingPlayer/>
        <RatingPlayer/>
        <RatingPlayer/>
        <RatingPlayer/>
        <RatingPlayer/>
        <RatingPlayer/>
        <RatingPlayer/>
        <RatingPlayer/>
    </ScrollView>
}

export default History;