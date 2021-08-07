import React from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';

import coin from '../../images/coin.png';
import playerRating from '../../images/player-rating.png';

function RatingPlayer() {
    return <View style={styles.container}>
        <Image
            style={styles.playerImage}
            source={playerRating}
        />
        <View style={styles.main}>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>Jhonatan Melo</Text>
                <Text style={styles.matchType}>Friendly Cup</Text>
            </View>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingTitle}>Player Rating</Text>
                <View style={styles.coinContainer}>
                    <Text style={styles.coinText}>10</Text>
                    <Image
                        style={styles.coinImage}
                        source={coin}
                    />
                </View>
            </View>
        </View>
        <View style={styles.rightButtonContainer}>
            <RectButton>
                <FontAwesome5
                    name="arrow-right"
                    size={30}
                    color="#000"
                />
            </RectButton>
        </View>
    </View>
}

export default RatingPlayer;