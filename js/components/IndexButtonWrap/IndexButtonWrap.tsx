import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
interface ButtonProps {
    titleCn: string,
    titleEn: string,
    children: any
}
export default function IndexButtonWrap(ButtonProps: ButtonProps) {
    return (
        <View style={styles.container}>
            <View style={styles.titleWrap}>
                <Text style={styles.title}>{ButtonProps.titleCn}</Text>
                <Text style={styles.titleEn}>{ButtonProps.titleEn}</Text>
            </View>
            <View>
                {ButtonProps.children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    titleWrap: {
        flexDirection: 'row',
        paddingBottom: 3,
        borderBottomColor: 'rgba(151, 151, 151, 1)',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(51, 51, 51, 1)'
    },
    titleEn: {
        marginLeft: 6,
        marginTop: 5,
        fontSize: 10,
        color: 'rgba(51, 51, 51, 1)'
    }
})