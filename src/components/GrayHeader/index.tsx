import React from 'react';
import { View, Text, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

import coin from '../../images/coin.png';

interface Props {
    title?: String
    unlogged?: boolean
}

function GrayHeader(props: Props) {

    const coins = useSelector((store: any) => store.coins);
    const navigation = useSelector((store: any) => store.drawerNavigation);
    const title = useSelector((store: any) => store.drawerTitle)

    const navigation2 = useNavigation();

    function handlePress() {
        if (props.unlogged) {
            navigation2.goBack();
        } else {
            (navigation as any).toggleDrawer();
        }
    }

    return <View style={styles.container}>
        <View style={styles.buttonMenuContainer}>
            <RectButton onPress={handlePress}>
                <Feather
                    name={props.unlogged ? 'chevron-left' : 'menu'}
                    color="#F7F7F7"
                    size={40}
                />
            </RectButton>
        </View>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title || title}</Text>
        </View>
        <View style={styles.buttonMenuContainer}>
            {!props.unlogged ? <View style={styles.coinContainer}>
                <Text style={styles.coinText}>{coins}</Text>
                <Image source={coin} style={styles.coinImage}/>
            </View> : null}
        </View>
    </View>
}

export default GrayHeader;