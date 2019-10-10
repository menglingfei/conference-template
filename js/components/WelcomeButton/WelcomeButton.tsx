import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
interface ButtonProps {
    title: string,
    color: any,
    handleClick: any
}
export default function WelcomeButton(ButtonProps: ButtonProps) {
    return (
        <TouchableOpacity style={{flex:1}} activeOpacity = { .5 } onPress={ButtonProps.handleClick}>
            <LinearGradient
                colors={ButtonProps.color}
                style={styles.LinearGradientStyle}
                start={{x: 1, y: 0}}
                end={{x: 1, y: 1}}
                locations={[0, 1]}
            >
                <Text style={styles.buttonText}>{ButtonProps.title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    LinearGradientStyle: {
        justifyContent: 'center',
        borderRadius: 18,
        width: 108,
        textAlign:'center',
        alignItems:'center',
        textAlignVertical:'center',
        height: '100%'
    },
    buttonText: {
        fontSize: 19,
        fontWeight: '600',
        color : '#fff',
        backgroundColor: 'transparent'
    }
});