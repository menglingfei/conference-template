import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, ToastAndroid } from 'react-native';
import AreaList from '../../components/AreaList/AreaList';
import DeviceSwiperWrap from "../../components/DeviceSwiperWrap/DeviceSwiperWrap";
import { AREA_LIST, PLACE_ID } from "../../common/js/params";
import DataStore from '../../common/js/DataStorage';
import { AppContext } from '../../common/js/context';
import CommandListWrap from "../../components/CommandListWrap/CommandListWrap";
import CmdGroupPop from "../../components/CmdGroupPop/CmdGroupPop";
import Back from "../../components/Back/Back";
import Mouse from "../../components/Mouse/Mouse";
import CmdIcon from "../../components/CmdIcon/CmdIcon";
import Logo from '../../components/Logo/Logo';
import { sendCmdGroup } from "../../common/js/utils";

interface DeviceProps {
    navigation: any
}
interface DeviceStates {
    currentAreaId: number,
    currentDeviceId: number,
    deviceList: Array<any>,
    functionList: Array<any>,
    isCmdGroupPop: boolean,
    groupList: Array<any>,
    currentDeviceIp: string,
}
export default class DevicePage extends Component<DeviceProps, DeviceStates> {
    state = {
        currentAreaId: 0,
        deviceList: [],
        functionList: [],
        currentDeviceId: 0,
        isCmdGroupPop: false,
        groupList: [],
        currentDeviceIp: ''
    }
    DeviceSwiperWrap: any;
    public static dataStore:any = new DataStore();
    setDevicesData = (deviceData: Array<any>) => {
        this.setState({
            deviceList: deviceData
        })
    }
    setCurrentAreaId = (areaId: number) => {
        this.setState({
            currentAreaId: areaId,
            currentDeviceId: 0,
            functionList: []
        },() => {
            this.DeviceSwiperWrap.resetCurrentDeviceInfo();
        })
    }
    getAreaListContainAll = (areaList: Array<any>) => {
        if (0 === areaList[0].id) return areaList;
        let newData = [...areaList];
        newData.unshift({
            id: 0,
            name: '所有展区'
        })
        return newData;
    }
    beforeGetFunctionList = (deviceId: number, deviceName: string, deviceIp: string) => {
        this.setState({
            currentDeviceId: deviceId,
            currentDeviceIp: deviceIp
        }, () => {
            this.getFunctionList(deviceId);
        })
    }
    getFunctionList = (deviceId: number) => {
        const param = {
            device_id: deviceId
        };
        DevicePage.dataStore.fetchData('/api/device_model_function/list', param, JSON.stringify(param))
            .then((data: any) => {
                this.setState({
                    functionList: data.data.deviceModelFunction
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    back = () => {
        this.props.navigation.goBack();
    }
    getCmdGroup = () => {
        const param = {
            place_id: PLACE_ID,
            area_id: this.state.currentAreaId
        };
        DevicePage.dataStore.fetchData('/api/cmd_grp/list', param, JSON.stringify(param))
            .then((data: any) => {
                this.setState({
                    groupList: data.data.commands,
                    isCmdGroupPop: true
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    hideCmdGroupPop = () => {
        this.setState({
            isCmdGroupPop: false
        })
    }
    toScreen = () => {
        let currentDeviceIp = this.state.currentDeviceIp;
        if (currentDeviceIp) {
            this.props.navigation.navigate('ScreenPage', {
                ip: currentDeviceIp
            });
        } else {
            ToastAndroid.showWithGravity(
                '请选择一个有键鼠功能的设备!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false;
        }
    }
    render() {
        let areaList = this.getAreaListContainAll(AREA_LIST);
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={true}
                />
                <Logo main={false} />
                {/*
                <TouchableOpacity style={styles.cmdGroup} onPress={this.getCmdGroup}>
                    <CmdIcon />
                </TouchableOpacity>
                */}
                <TouchableOpacity style={styles.mouse} onPress={this.toScreen}>
                    <Mouse />
                </TouchableOpacity>
                <TouchableOpacity style={styles.back} onPress={this.back}>
                    <Back />
                </TouchableOpacity>
                <View style={styles.main}>
                    <View style={{
                        width: 195
                    }}>
                        <AreaList
                            areaList={areaList}
                            setDevicesData={this.setDevicesData}
                            setCurrentAreaId={this.setCurrentAreaId}
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        marginLeft: 45,
                        overflow: 'hidden'
                    }}>
                        <DeviceSwiperWrap
                            deviceList={this.state.deviceList}
                            beforeGetFunctionList={this.beforeGetFunctionList}
                            ref={(child)=>{this.DeviceSwiperWrap = child}}
                        ></DeviceSwiperWrap>
                    </View>
                </View>
                <AppContext.Provider value={this.state}>
                    <View style={styles.commandWrap}>
                        <CommandListWrap commandList={this.state.functionList} setDevicesData={() => {}} setCurrentAreaId={() => {}}/>
                    </View>
                </AppContext.Provider>
                <CmdGroupPop
                    visible={this.state.isCmdGroupPop}
                    cbCancel={this.hideCmdGroupPop}
                    groupList={this.state.groupList}
                    handleClick={sendCmdGroup}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    main: {
        flexDirection: 'row',
        width: '100%',
        height: 300,
        marginTop: 150,
        paddingHorizontal: 80,
    },
    areaWrap: {
        width: '93%',
        height: 90,
        marginTop: 60
    },
    deviceWrap: {
        flex: 1,
        width: '88%',
        overflow: 'hidden'
    },
    commandWrap: {
        width: '90%',
        height: 40,
        marginTop: 40,
    },
    back: {
        position: 'absolute',
        top: 44,
        right: 58,
        width: 40,
        height: 40,
        zIndex: 100000
    },
    cmdGroup: {
        position: 'absolute',
        top: 44,
        width: 40,
        height: 40,
        right: 117,
        zIndex: 100000
    },
    mouse: {
        position: 'absolute',
        top: 44,
        right: 177,
        width: 40,
        height: 40,
        zIndex: 100000
    },
})
