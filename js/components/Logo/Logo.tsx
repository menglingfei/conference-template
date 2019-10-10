import React from 'react';
import { StyleSheet, Image } from 'react-native';

interface LogoProps {
    main: boolean
}
export default function Main(LogoProps: LogoProps) {
    return (
        <Image style={[styles.bg, {zIndex: 0}]} source={require('../../common/image/bg.png') } />
    )
}

const styles = StyleSheet.create({
    bg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    }
})
