import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export default function Nav(props) {
    return (
        <View style={styles.header}>
            <Image
                style={{width: 200, height: 36}}
                source={require('./logo.png')}
                resizeMode="center"
            />
            <View style={styles.indexBtnWrap}>{props.children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 40,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 15,
        marginBottom: 20
    },
    indexBtnWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});