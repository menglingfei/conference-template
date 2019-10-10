import React from 'react'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import ProgressBar from "../../components/ProgressBar/ProgressBar";

let elements: Array<any> = [];

export const Loading = {
    show: () => {
        let sibling = new RootSiblings(
            <View style={styles.maskStyle}>
                <View style={styles.backViewStyle}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            </View>
        )
        elements.push(sibling);
    },
    showProgress: (progress: number, message: string) => {
        Loading.hide();
        let sibling = new RootSiblings(
            <View style={styles.maskStyle}>
                <View style={styles.backViewStyleProgress}>
                    <Text style={styles.text}>{message}</Text>
                    <View style={{width: 160}}>
                        <ProgressBar
                            color='rgba(36, 109, 168, 1)'
                            progress={progress}
                        />
                    </View>
                </View>
            </View>
        )
        elements.push(sibling);
    },
    hide: ()=> {
        let lastSibling = elements.pop();
        lastSibling && lastSibling.destroy();
    }
}

const styles = StyleSheet.create({
        maskStyle: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            width: "100%",
            height: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000000
        },
        backViewStyle: {
            backgroundColor: '#111',
            width: 120,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        },
        backViewStyleProgress: {
            flexDirection: 'row',
            backgroundColor: '#111',
            width: 300,
            height: 100,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        },
        text: {
            fontSize: 14,
            color: '#fff',
            marginRight: 10
        }
    }
)
