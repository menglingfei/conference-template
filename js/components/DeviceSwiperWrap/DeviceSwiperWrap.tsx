import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
interface SwiperProps {
    deviceList: Array<any>,
    beforeGetFunctionList: any
}
interface SwiperStates {
    currentDeviceId: number,
    currentDeviceName: string
}
export default class DeviceSwiperWrap extends Component<SwiperProps, SwiperStates> {
    state = {
        currentDeviceId: 0,
        currentDeviceName: ''
    }
    setSwiperData = (data: any = []) => {
        let newData: any = [];
        // devices amount per swiper page
        let NUM = 8;
        let len: number = Math.ceil(data.length / NUM);
        for (let i:number = 0; i < len; i++) {
            newData[i] = data.slice(i * NUM, (i + 1) * NUM);
        }
        return newData;
    }
    renderSwiper = (data: any) => {
        return (
            data.map((item: any, index: number) => {
                return (
                    <View key={index} style={styles.slide}>{this.renderSwiperItem(item)}</View>
                )
            })
        )
    }
    resetCurrentDeviceInfo = () => {
        this.setState({
            currentDeviceId: 0,
            currentDeviceName: ''
        })
    }
    renderSwiperItem = (data: any) => {
        return (
            data.map((item: any) => {
                return (
                    <View key={item.id} style={styles.deviceItemWrap}>
                        <TouchableOpacity
                            style={this.state.currentDeviceId === item.id ? styles.deviceItemSelected : styles.deviceItem}
                            onPress={() => {this.handleDevicePress(item.id, item.name, item.ip)}}
                        >
                            <View style={styles.deviceIcon}>
                                <Icon name='desktop' size={50} color="#fff" />
                            </View>
                            <Text numberOfLines={1} ellipsizeMode='middle' style={styles.deviceName}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                )
            })
        )
    }
    handleDevicePress = (deviceId: number, deviceName: string, deviceIp: string) => {
        this.setState({
            currentDeviceId: deviceId,
            currentDeviceName: deviceName
        }, () => {
            this.props.beforeGetFunctionList(deviceId, deviceName, deviceIp);
        });
    }
    render() {
        let _data = this.setSwiperData(this.props.deviceList);
        return (
            <Swiper
                style={styles.wrapper}
                loop={false}
                paginationStyle={{ bottom: 0 }}
                dotColor='#ccc'
                activeDotColor='rgba(136, 93, 173, 1)'
            >
                {_data.length > 0 && this.renderSwiper(_data)}
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    slide: {
        width: '100%',
        height: 200,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        marginBottom: 20
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    deviceItemWrap: {
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
        width: 120,
        height: 120
    },
    deviceItem: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderColor: '#rgba(184, 184, 184, 1)',
        backgroundColor: 'rgba(184, 184, 184, 1)',
        borderWidth: 1
    },
    deviceItemSelected: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(136, 93, 173, 1)'
    },
    deviceIcon: {
        flex: 1,
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deviceName: {
        justifyContent: 'center',
        height: 20,
        color: '#fff',
        fontSize: 12
    }
});
