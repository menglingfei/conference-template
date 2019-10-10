import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ButtonProps {
    title: string,
    icon: string,
    color: any,
    handleClick: any
}
export default function ManipulateButton(ButtonProps: ButtonProps) {
    return (
        <TouchableOpacity style={{flex:1}} activeOpacity = { .5 } onPress={ButtonProps.handleClick}>
            <LinearGradient
                colors={ButtonProps.color}
                style={styles.LinearGradientStyle}
                start={{x: 1, y: 0}}
                end={{x: 1, y: 1}}
                locations={[0, 1]} >
                <Icon name={ButtonProps.icon} size={24} color="#fff" />
                <Text style={styles.buttonText}>{ButtonProps.title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    LinearGradientStyle: {
        justifyContent: 'center',
        borderRadius: 4,
        marginHorizontal: 8,
        textAlign:'center',
        alignItems:'center',
        textAlignVertical:'center',
        height: '100%'
    },
    buttonText: {
        fontSize: 14,
        color : '#fff',
        backgroundColor: 'transparent'
    }
});
