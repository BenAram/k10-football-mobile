import React from 'react';
import { View, TextInput, Image, Text, TouchableWithoutFeedback as TWF } from 'react-native';

import styles from './styles';

interface Input {
    name: String
    image: any
    id: string
    distance: number
    distanceInput: number
    count: number
    negative: boolean
}

interface AnalysisInputProps {
    input: Input
    value: string
    onChangeText: Function
    right?: boolean
    setValue: Function
    id: string
}

function AnalysisInput(props: AnalysisInputProps) {
                            
    const { input, value, onChangeText } = props;

    const marginStyle: any = {}

    const transformStyle: any= {
        transform: [
            {
                translateX: input.distanceInput
            }
        ]
    }

    if (props.right) {
        marginStyle.transform = [{
            translateX: input.distance
        }]
        transformStyle.textAlign = 'left';
    } else {
        marginStyle.marginLeft = input.distance
    }
    transformStyle.transform.push({translateY: -6});

    function handleAddValue() {
        props.setValue(props.id);
    }
    
    return <View style={[styles.inputContainer, marginStyle]}>
        <View>
            <Text style={styles.inputTitle}>{input.name.toUpperCase()}</Text>
            <TWF onPress={handleAddValue}>
                <Image style={props.right ? [styles.inputImage, styles.inputImageRight] : styles.inputImage} source={input.image}/>
            </TWF>
        </View>
        <TextInput
            style={[styles.inputDesign, transformStyle]}
            keyboardType="numeric"
            value={value}
            onChangeText={text => onChangeText(input.id, text)}
        />
    </View>
}

export default AnalysisInput;