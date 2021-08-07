import React, { useEffect } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

import coin from '../../images/coin.png';

function About() {

    const dispatch = useDispatch();
    const coins = useSelector((store: any) => store.coins);

    const navigation = useNavigation();

    function handleBuyCoins() {
        dispatch({
            type: 'add-coins',
            value: 4
        })
    }

    useEffect(() => {
        dispatch({
            type: 'change-drawer-title',
            value: 'Wallet'
        })
        navigation.addListener('focus', () => {
            dispatch({
                type: 'change-drawer-title',
                value: 'Wallet'
            })
        })
    }, [])

    return <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
        <View style={styles.coinsContainer}>
            <Text style={styles.coinsText}>{coins}</Text>
            <Image style={styles.coinsImage} source={coin}/>
        </View>
        {coins > 0 ? <Text style={styles.warnText}>
            Você possui {coins} moedas
        </Text> : <Text style={styles.warnText}>
            Você não possui moedas
        </Text>}
        <RectButton onPress={handleBuyCoins}>
            <View style={styles.purchaseContainer}>
                <Image
                    style={styles.purchaseIcon}
                    source={{ uri: 'https://logodownload.org/wp-content/uploads/2014/10/paypal-logo-0.png' }}
                />
                <View style={styles.purchaseContent}>
                    <Text style={styles.purchaseContentTitle}>Pacote de moedas</Text>
                    <View style={styles.purchaseContentValue}>
                        <View style={styles.purchaseContentValueCoinContainer}>
                            <Text style={styles.purchaseContentValueCoinText}>4</Text>
                            <Image
                                style={styles.purchaseContentValueCoinImage}
                                source={coin}
                            />
                        </View>
                        <Text style={styles.purchaseContentValueText}>R$3,99</Text>
                    </View>
                </View>
                <View style={styles.purchaseFooter}>
                    <RectButton>
                        <Feather
                            name="arrow-right"
                            size={30}
                            color="#000"
                        />
                    </RectButton>
                </View>
            </View>
        </RectButton>
    </ScrollView>
}

export default About;