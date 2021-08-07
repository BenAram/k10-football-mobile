import React, { useState, useEffect, Fragment } from 'react';
import { ScrollView, KeyboardAvoidingView, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import DataContainer from '../../components/DataContainer';
import Footer from '../../components/RedFooter';

import flagEmojis from './flag-emojis.json';
import styles from './styles';

function AddMatch() {

    const nationalityItems: Array<any> = [];
    const weatherItems: Array<{
        label: string
        value: string
    }> =  [{
        label: 'Rainy 19°C',
        value: 'rainy'
    }, {
        label: 'Cloudy 25°C',
        value: 'cloudy'
    }, {
        label: 'Sunny 28°C',
        value: 'sunny'
    }]
    flagEmojis.sort((flagEmoji1, flagEmoji2) => {
        if (flagEmoji1.name > flagEmoji2.name) {
            return 1
        }
        if (flagEmoji1.name < flagEmoji2.name) {
            return -1
        }
        return 0
    }).forEach(flagEmoji => {
        nationalityItems.push({
            label: `${flagEmoji.emoji} ${flagEmoji.name}`,
            value: flagEmoji.code
        })
    })

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [ready, setReady] = useState<boolean>(false);

    const [scoutName, setScoutName] = useState<string>('');
    const [gameDate, setGameDate] = useState<Date>(new Date());
    const [gameLocation, setGameLocation] = useState<string>('BR');
    const [gameType, setGameType] = useState<string>('');
    const [gameWeather, setGameWeather] = useState<string>('rainy');
    const [addEvaluator, setAddEvaluator] = useState<string>('');

    function handleSaveChanges() {
        if (!scoutName) {
            return alert('Scout name is missing');
        }
        if (!gameDate) {
            return alert('Date is missing');
        }
        if (!gameLocation) {
            return alert('Location is missing');
        }
        if (!gameType) {
            return alert('Type is missing');
        }
        if (!gameWeather) {
            return alert('Weather is missing');
        }
        if (!addEvaluator) {
            return alert('Evaluator is missing');
        }
        const match: Match  =  {
            date: gameDate,
            evaluator: addEvaluator,
            location: gameLocation,
            scoutName: scoutName,
            type: gameType,
            weather: gameWeather
        }
        const matchJSON = JSON.stringify(match);
        AsyncStorage.setItem('match', matchJSON).then(() => {
            alert('Changes saves sucessfully');
        }).catch(err => {
            console.log(err);
            alert('An error occurred');
        })
    }

    useEffect(() => {
        async function load() {
            try {
                dispatch({
                    type: 'change-drawer-title',
                    value: 'Add Match'
                })
                const matchJSON = await AsyncStorage.getItem('match');
                if (matchJSON) {
                    const match: Match = JSON.parse(matchJSON);
                    setScoutName(match.scoutName);
                    setGameDate(new Date(match.date));
                    setGameLocation(match.location);
                    setGameType(match.type);
                    setGameWeather(match.weather);
                    setAddEvaluator(match.evaluator);
                }
                setReady(true);
            } catch(err) {
                alert('An error occurred to load match');
            }
        }
        navigation.addListener('focus', load)
        load();
    }, [])

    return <KeyboardAvoidingView style={styles.container}>
        <ScrollView style={styles.main} contentContainerStyle={styles.mainContent}>
            {ready ? <Fragment>
                <DataContainer
                    title="Scout Name"
                    value={scoutName}
                    setValue={setScoutName}
                    placeholder="Type your scout"
                />
                <DataContainer
                    title="Game Date"
                    value={gameDate}
                    setValue={setGameDate}
                    type="date"
                />
                <DataContainer
                    title="Game Location"
                    value={gameLocation}
                    setValue={setGameLocation}
                    type="picker"
                    pickerItems={nationalityItems}
                />
                <DataContainer
                    title="Game Type"
                    value={gameType}
                    setValue={setGameType}
                    placeholder="Type game type"
                />
                <DataContainer
                    title="Weather"
                    value={gameWeather}
                    setValue={setGameWeather}
                    type="picker"
                    pickerItems={weatherItems}
                />
                <DataContainer
                    title="Add Evaluator"
                    value={addEvaluator}
                    setValue={setAddEvaluator}
                    placeholder="Type your evaluator"
                />
            </Fragment> : <ActivityIndicator size="large" color="#000" />}
        </ScrollView>
        <Footer>
            <RectButton  onPress={handleSaveChanges}>
                <Text style={styles.footerText}>Save Changes</Text>
            </RectButton>
        </Footer>
    </KeyboardAvoidingView>
}

export default AddMatch;