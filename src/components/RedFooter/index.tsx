import React from 'react';
import { View } from 'react-native';

import styles from './styles';

interface Props {
    children: any
}

function RedFooter(props: Props) {
    return <View style={styles.container}>
        {props.children}
    </View>
}

export default RedFooter;