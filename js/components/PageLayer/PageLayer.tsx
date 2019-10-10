import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Dialog, { DialogHeader, DialogContent, SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
interface PageProps {
    visible: boolean,
    title: string,
    onCancel: any,
    children: any
}
export default function PageLayer(PageProps: PageProps) {
    return (
        <Dialog
            width={880}
            height={500}
            visible={PageProps.visible}
            dialogTitle={
                <View style={styles.header}>
                    <Text style={styles.title}>{PageProps.title}</Text>
                    <TouchableOpacity style={styles.close} onPress={PageProps.onCancel}>
                        <Icon name='close' size={25} color='#fff' />
                    </TouchableOpacity>
                </View>
            }
            dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom'
            })}
        >
            <DialogContent style={{alignItems: 'center'}}>
                {PageProps.children}
            </DialogContent>
        </Dialog>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'relative',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#9C191A'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: 'rgba(255,255,255,1)',
        textAlign: 'center'
    },
    close: {
        position: 'absolute',
        right: 30
    }
})