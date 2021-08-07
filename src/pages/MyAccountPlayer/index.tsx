import React, { useEffect, useState, Fragment } from 'react';
import { View, ScrollView, Text, TouchableOpacity as TO, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DataContainer from '../../components/DataContainer';
import Footer from '../../components/RedFooter';

import flagEmojis from './flag-emojis.json';
import playerCharacteristicsItems from './playerCharacteristics';
import styles from './styles';

interface PlayerCharacteristic {
    label: string
    id: string
    active: boolean
}

function About() {

    const nationalityItems: Array<any> = [];
    const genderItems = [{
        label: 'Male',
        value: 'male'
    }, {
        label: 'Female',
        value: 'female'
    }]
    const positionItems = [{
        label: 'Attacker',
        value: 'attacker'
    }, {
        label: 'Goalkeeper',
        value: 'goalkeeper'
    }, {
        label: 'Defender',
        value: 'defender'
    }, {
        label: 'Midfield',
        value: 'midfield'
    }]
    const footItems = [{
        label: 'Left',
        value: 'left'
    }, {
        label: 'Right',
        value: 'right'
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

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [saves, setSaves] = useState<number>(0);
    const [ready, setReady] = useState<boolean>(false);

    const [initialNationality, setInitialNationality] = useState<string>('');
    const [initialGender, setInitialGender] = useState<string>('');
    const [initialPosition, setInitialPosition] = useState<string>('');
    const [initialDOB, setInitialDOB] = useState<Date>(new Date());
    const [initialWeight, setInitialWeight] = useState<string>('');
    const [initialHeight, setInitialHeight] = useState<string>('');
    const [initialFoot, setInitialFoot] = useState('');
    const [initialCharacteristics, setInitialCharacteristics] = useState<Array<PlayerCharacteristic>>([]);

    const [nationality, setNationality] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [DOB, setDOB] = useState<Date>(new Date());
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [foot, setFoot] = useState<string>('');
    const [playerCharacteristics, setPlayerCharacteristics] = useState<Array<PlayerCharacteristic>>([])

    function verifyCanSave(): boolean {
        let canSave = false;
        if (initialNationality !== nationality) {
            canSave = true;
        }
        if (initialGender !== gender) {
            canSave = true;
        }
        if (initialPosition !== position) {
            canSave = true;
        }
        if (DOB !== initialDOB) {
            canSave = true;
        }
        if (weight !== initialWeight) {
            canSave = true;
        }
        if (height !== initialHeight) {
            canSave = true;
        }
        if (initialFoot !== foot) {
            canSave = true;
        }
        if (initialCharacteristics !== playerCharacteristics) {
            canSave = true;
        }
        return canSave;
    }

    async function handleSaveChanges() {
        try {
            const newPlayer: Player = {
                name: 'Chiara Bivitagirni',
                club: 'Football Club',
                height: parseInt(height),
                weight: parseInt(weight),
                DOB,
                position,
                nationality,
                gender,
                foot,
                characteristics: playerCharacteristics.filter(item => item.active).map(item => ({
                    id: item.id,
                    label: item.label
                }))
            }
            alert('Changes saves successfully');
            await AsyncStorage.setItem('player', JSON.stringify(newPlayer));
            setSaves(saves+1);
        } catch(err) {
            console.log(err);
            alert('An error occurred to save changes');
        }
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

    useEffect(() => {
        async function getPlayer() {
            try {
                setReady(false);
                const playerJSON = await AsyncStorage.getItem('player');
                if (!playerJSON) {
                    return alert('Erro ao carregar o player');
                }
                const player: Player = JSON.parse(playerJSON);
                setInitialNationality(player.nationality);
                setNationality(player.nationality);
                setInitialGender(player.gender);
                setGender(player.gender);
                setInitialPosition(player.position);
                setPosition(player.position);
                const dob = new Date(player.DOB);
                setInitialDOB(dob);
                setDOB(dob);
                setInitialWeight(player.weight.toString());
                setWeight(player.weight.toString());
                setInitialHeight(player.height.toString());
                setHeight(player.height.toString());
                setInitialFoot(player.foot);
                setFoot(player.foot);
                const newCharacteristics: Array<PlayerCharacteristic> = [];
                (playerCharacteristicsItems as any)[player.position].forEach((item: any) => {
                    const exists = player.characteristics.some(itemPlayer => itemPlayer.id === item.id);
                    if (exists) {
                        newCharacteristics.push({
                            id: item.id,
                            label: item.label,
                            active: true
                        })
                    } else {
                        newCharacteristics.push({
                            id: item.id,
                            label: item.label,
                            active: false
                        })
                    }
                })
                setInitialCharacteristics(newCharacteristics);
                setPlayerCharacteristics(newCharacteristics);

                setReady(true);
            } catch(err) {
                console.log(err);
                alert('Erro ao carregar o player');
            }
        }
        getPlayer();
    }, [saves])

    useEffect(() => {
        setPlayerCharacteristics((playerCharacteristicsItems as any)[position]);
    }, [position])

    return <View style={styles.container}>
        <ScrollView style={styles.main} contentContainerStyle={styles.mainContent}>
            {ready ? <Fragment>
                <View style={styles.profileContainer}>
                    <View style={styles.profileImageContainer}>
                        <View style={styles.profileImage}/>
                    </View>
                    <Text style={styles.profileName}>Chiara Bivitagirni</Text>
                    <Text style={styles.profilePosition}>Football Club</Text>
                </View>
                <DataContainer
                    value={nationality}
                    setValue={setNationality}
                    title="Gender"
                    type="picker"
                    pickerItems={nationalityItems}
                />
                <DataContainer
                    value={gender}
                    setValue={setGender}
                    title="Gender"
                    type="picker"
                    pickerItems={genderItems}
                />
                <DataContainer
                    value={position}
                    setValue={setPosition}
                    title="Position"
                    type="picker"
                    pickerItems={positionItems}
                />
                <DataContainer
                    value={DOB}
                    setValue={setDOB}
                    title="DOB"
                    type="date"
                />
                <DataContainer
                    value={weight}
                    setValue={setWeight}
                    title="Weight"
                    keyboardType="numeric"
                />
                <DataContainer
                    value={height}
                    setValue={setHeight}
                    title="Height"
                    keyboardType="numeric"
                />
                <DataContainer
                    value={foot}
                    setValue={setFoot}
                    title="Foot"
                    type="picker"
                    pickerItems={footItems}
                />
                <DataContainer
                    value={playerCharacteristics}
                    setValue={setPlayerCharacteristics}
                    title="Player Characteristics [Select 3]"
                    type="checkbox"
                />
            </Fragment> : <ActivityIndicator size="large" color="#000"/>}
        </ScrollView>
        <Footer>
            <TO disabled={!verifyCanSave()} onPress={handleSaveChanges}>
                <Text style={styles.footerText}>Save Changes</Text>
            </TO>
        </Footer>
    </View>
}

export default About;