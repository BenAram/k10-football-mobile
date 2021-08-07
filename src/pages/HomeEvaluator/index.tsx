import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';

import RatingPlayer from '../../components/RatingPlayer';
import Footer from '../../components/RedFooter';

import golf from '../../images/golf.png';

function Home() {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    function handleWallet() {
        navigation.navigate('wallet');
    }

    function handleSeeHistory() {
        navigation.navigate('history');
    }

    function handleRatePlayer() {
        navigation.navigate('player-analysis');
    }

    useEffect(() => {
        dispatch({
            type: 'change-drawer-navigation',
            value: navigation
        })
        dispatch({
            type: 'change-drawer-title',
            value: 'Home'
        })
        async function run() {
            try {
                const matchJSON = await AsyncStorage.getItem('match');
                const playerJSON = await AsyncStorage.getItem('player');
                if (!matchJSON) {
                    const match: Match  = {
                        date: new Date(),
                        evaluator: 'Jason',
                        location: 'BR',
                        scoutName: 'Daniel',
                        type: 'Friendly',
                        weather: 'rainy'
                    }
                    AsyncStorage.setItem('match', JSON.stringify(match))
                }
                if (!playerJSON) {
                    const player: Player = {
                        name: 'Chiara Bivitagirni',
                        club: 'Football Club',
                        DOB: new Date(),
                        height: 1,
                        characteristics: [],
                        foot: 'left',
                        gender: 'male',
                        nationality: 'BR',
                        position: 'attacker',
                        weight: 1
                    }
                    AsyncStorage.setItem('player', JSON.stringify(player));
                }
            } catch(err) {
                console.log(err);
            }
        }
        run()
        navigation.addListener('focus', () => {
            dispatch({
                type: 'change-drawer-title',
                value: 'Home'
            })
        })
    }, [])

    return <View style={styles.container}>
        <View style={styles.main}>
            <View style={styles.contentContainer}>
                <View style={styles.buttonsContainer}>
                    <RectButton style={styles.button}>
                        <View style={styles.buttonView}>
                            <View style={styles.buttonValueContainer}>
                                <FontAwesome5
                                    name="user-check"
                                    size={30}
                                    color="blue"
                                />
                                <Text style={styles.buttonValue}>2</Text>
                            </View>
                            <Text style={styles.buttonTitle}>Players to rate</Text>
                        </View>
                    </RectButton>
                    <RectButton style={styles.button}>
                        <View style={styles.buttonView}>
                            <View style={styles.buttonValueContainer}>
                                <Image
                                    source={golf}
                                    style={{ width: 30, height: 30 }}
                                />
                                <Text style={styles.buttonValue}>3</Text>
                            </View>
                            <Text style={styles.buttonTitle}>Analysis to download</Text>
                        </View>
                    </RectButton>
                </View>
                <RectButton style={styles.buttonWallet} onPress={handleWallet}>
                    <Text style={styles.buttonWalletText}>My Wallet</Text>
                    <FontAwesome5
                        name="wallet"
                        size={30}
                        color="#FFF"
                        style={{ position: 'relative', left: 30 }}
                    />
                </RectButton>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.historyTitleContainer}>
                    <Text style={styles.historyTitle}>History</Text>
                    <RectButton onPress={handleSeeHistory}>
                        <Text style={styles.historySeeAll}>See All</Text>
                    </RectButton>
                </View>
                <ScrollView style={styles.historyContainer} contentContainerStyle={{ alignItems: 'center' }}>
                    <RatingPlayer/>
                    <RatingPlayer/>
                </ScrollView>
            </View>
        </View>
        <Footer>
            <View style={styles.footer}>
                <RectButton onPress={handleRatePlayer}>
                    <Text style={styles.footerText}>Rate Player</Text>
                </RectButton>
                <RectButton>
                    <FontAwesome5
                        name="bolt"
                        color="#FFF"
                        size={24}
                    />
                </RectButton>
            </View>
        </Footer>
    </View>
}

export default Home;