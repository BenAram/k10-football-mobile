import React, { useRef, useState, Fragment } from 'react';
import { View, Text, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

interface Props {
    value: any
    setValue: Function
    title: string
    placeholder?: string
    keyboardType?: string
    type?: 'textinput' | 'date' | 'picker' | 'checkbox'
    pickerItems?: Array<{
        label: string
        value: string
    }>
}

function treatDate(date: number) {
    if (date > 9) {
        return `${date}`;
    } else {
        return `0${date}`;
    }
}
function getDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${treatDate(day)}-${treatDate(month+1)}-${year}`;
}

interface PlayerCharacteristic {
    label: string
    id: string
    active: boolean
}

function DataContainer(props: Props) {

    const textInput = useRef<TextInput>();
    const [activeDate, setActiveDate] = useState<boolean>(false);

    function handleToggleDate() {
        setActiveDate(!activeDate);
    }

    function handleDate(evt: any) {
        if (evt.type !== 'dismissed') {
            setActiveDate(false);
            props.setValue(new Date(evt.nativeEvent.timestamp));
        } else {
            setActiveDate(false);
        }
    }

    function handleToggleCheckbox(index: number) {
        const newValue = [...props.value];
        let count = 0;
        newValue.forEach((value: any) => {
            if (value) {
                if (value.active) {
                    count++;
                }
            }
        })
        if (newValue[index].active) {
            newValue[index].active = false;
        } else {
            if (count < 3) {
                newValue[index].active = true;
            }
        }
        props.setValue(newValue);
    }

    function verifyType() {
        if (!props.type || props.type === 'textinput') {
            return <TextInput
                style={styles.dataInput}
                ref={textInput as any}
                value={props.value}
                onChangeText={txt => props.setValue(txt)}
                placeholder={props.placeholder}
                keyboardType={props.keyboardType ? (props.keyboardType as any) : 'default'}
            />
        }
        if (props.type === 'date') {
            return <Fragment>
                <RectButton onPress={handleToggleDate}>
                    <Text style={styles.dataInput}>{getDate(props.value)}</Text>
                </RectButton>
                {activeDate ? <DateTimePicker
                    mode="date"
                    maximumDate={new Date(Date.now() - (1000 * 60 * 60 * 24 * 365 * 18))}
                    value={props.value}
                    onChange={handleDate}
                /> : null}
            </Fragment>
        }
        if (props.type === 'picker') {
            return <Picker
                style={styles.dataInput}
                selectedValue={props.value}
                onValueChange={itemValue => props.setValue(itemValue as any)}
                mode="dropdown"
            >
                {props.pickerItems?.map(pickerItem => {
                    return <Picker.Item key={pickerItem.value} label={pickerItem.label} value={pickerItem.value} />
                })}
            </Picker>
        }
        if (props.type === 'checkbox') {
            return <View>
                {props.value.map((player: PlayerCharacteristic, index: number) => {
                    return <RectButton key={index} onPress={() => handleToggleCheckbox(index)}>
                        <View style={styles.dataCheckboxItem}>
                            <Text style={styles.dataCheckboxText}>{player.label}</Text>
                            <View style={[
                                styles.dataCheckboxCircle,
                                {
                                    backgroundColor: player.active ? 'lightgreen' : 'transparent'
                                }
                            ]}/>
                        </View>
                    </RectButton>
                })}
            </View>
        }
    }

    return <View style={styles.dataContainer}>
        <View style={styles.dataTitleContainer}>
            <Text style={styles.dataTitle}>{props.title}</Text>
            <RectButton onPress={() => textInput.current?.focus()}>
                <Feather
                    name="edit"
                    color="#007bff"
                    size={16}
                />
            </RectButton>
        </View>
        {verifyType()}
    </View>
}

export default DataContainer;