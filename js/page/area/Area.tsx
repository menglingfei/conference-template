import React from 'react';
import { Component } from 'react';
import {StyleSheet, TouchableOpacity, View, Text, StatusBar, ToastAndroid} from 'react-native';
import Logo from '../../components/Logo/Logo';
import { BoxShadow } from 'react-native-shadow';
import DataStore from "../../common/js/DataStorage";
import ManipWrap from "../../components/ManipWrap/ManipWrap";
import Back from "../../components/Back/Back";
import TaskListHeader from "../../components/TaskListHeader/TaskListHeader";
import TaskList from "../../components/TaskList/TaskList";
import SceneList from "../../components/SceneList/SceneList";
import DevicePop from "../../components/DevicePop/DevicePop";
import { manipulate, sendCmdGroup, sendTask } from "../../common/js/utils";
import { AREA_MULTI_MACHINE, PLACE_ID } from "../../common/js/params";
import CmdIcon from "../../components/CmdIcon/CmdIcon";
import CmdGroupPop from "../../components/CmdGroupPop/CmdGroupPop";
import Mouse from "../../components/Mouse/Mouse";
import {string} from "prop-types";

let areaId: number = 0;
let areaName: string = '';
let planId: number = 0;
interface AreaProps {
    navigation: any
}
interface AreaState {
    isDevicePop: boolean,
    areaName: string,
    tasksList: Array<any>,
    currentTaskId: number,
    scenesList: Array<any>,
    currentSceneId: number,
    currentDeviceId: number,
    deviceList: Array<any>,
    groupList: Array<any>,
    isCmdGroupPop: boolean,
    currentDeviceName: string,
    currentDeviceIp: string
}
const shadowOpt = {
    width: 250, //包裹的子内容多宽这里必须多宽
    height: 300, //同上
    color: "#c1c0c0", //阴影颜色
    border: 8, //阴影宽度
    radius: 10, //包裹的子元素圆角多少这里必须是多少
    opacity: 0.5, //透明度
    x: 0,
    y: 0,
    style: {marginVertical: 5}
}
export default class AreaPage extends Component<AreaProps, AreaState> {
    state = {
        isDevicePop: false,
        areaName: '',
        tasksList: [],
        deviceList: [],
        scenesList: [],
        groupList: [],
        currentTaskId: 0,
        currentSceneId: 0,
        currentDeviceId: 0,
        isCmdGroupPop: false,
        currentDeviceName: '无',
        currentDeviceIp: ''
    };
    private static dataStore = new DataStore();
    componentDidMount() {
        areaId = this.props.navigation.getParam('areaId');
        areaName = this.props.navigation.getParam('areaName');
        planId = this.props.navigation.getParam('planId');
        this.setState({
            areaName
        }, () => {
            if (AREA_MULTI_MACHINE.indexOf(areaId) < 0) {
                this.getAreaTask();
            } else {
                this.getControlDevice();
            }
        })
    }
    getScene = (deviceId: number, deviceName: string, deviceIp: string) => {
        let postData = {
            area_id: areaId,
            plan_id: planId,
            device_id: deviceId
        };
        AreaPage.dataStore.fetchData('/api/scene/list', postData, JSON.stringify(postData))
            .then((data: any) => {
                let scenes = data.data.scenes;
                this.setState({
                    scenesList: scenes,
                    currentSceneId: scenes.length > 0 ? scenes[0].id : 0,
                    isDevicePop: false,
                    currentDeviceId: deviceId,
                    currentDeviceName: deviceName,
                    currentDeviceIp: deviceIp
                }, () => {
                    this.getTask();
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    transTracksToTasks = (tracks: Array<any>) => {
        let newData: Array<any> = [];
        for (let i: number = 0, length: number = tracks.length; i < length; i++) {
            for (let j: number = 0, _length: number = tracks[i]['tasks'].length; j < _length; j++) {
                newData.push(tracks[i]['tasks'][j]);
            }
        }
        return newData;
    }
    getTask = () => {
        let postData = {
            scene_id: this.state.currentSceneId
        };
        let deviceId = this.state.currentDeviceId;
        if (deviceId) {
            postData = Object.assign(postData, {
                device_id: deviceId
            })
        }
        AreaPage.dataStore.fetchData('/api/play_task/scene_tasks', postData, JSON.stringify(postData))
            .then((data: any) => {
                let tracks = data.data.tracks;
                let newData = this.transTracksToTasks(tracks);
                this.setState({
                    tasksList: newData,
                    currentTaskId: newData.length > 0 ? newData[0].id : 0,
                    isDevicePop: false
                }, () => {
                    if (0 === newData.length) return;
                    const taskId =  newData[0].id;
                    newData.length > 0 && manipulate('/api/ctrl_cmd/goto_task', {play: 1, progress: -1, task_id: taskId, device_id: deviceId})
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    getAreaTask = () => {
        const param = {
            area_id: areaId,
            plan_id: planId
        };
        AreaPage.dataStore.fetchData('/api/play_task/area_tasks', param, JSON.stringify(param))
            .then((data: any) => {
                let tasks = data.data.tasks;
                let newData = tasks.filter((item: any) => {
                    return item.invisible === 0
                })
                this.setState({
                    tasksList: newData,
                    currentTaskId: newData.length > 0 ? newData[0].id : 0,
                    isDevicePop: false
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    getControlDevice = () => {
        if (this.state.deviceList.length !== 0) {
            return;
        }
        const param = {
            area_id: areaId,
            place_id: PLACE_ID
        };
        AreaPage.dataStore.fetchData('/api/device/list', param, JSON.stringify(param))
            .then((data: any) => {
                let devices = data.data.devices;
                let newData = devices.filter((item: any) => {
                    return item.category_id === 2
                });
                // newData.unshift({id: 0, name: '默认所有'});
                this.setState({
                    deviceList: newData,
                    currentDeviceId: newData[0].id,
                    currentDeviceName: newData[0].name,
                    currentDeviceIp: newData[0].ip
                }, () => {
                    this.getScene(newData[0].id, newData[0].name, newData[0].ip);
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    back = () => {
        this.props.navigation.goBack();
    }
    onTaskChange = (taskId: number, taskName: string) => {
        this.setState({
            currentTaskId: taskId
        }, () => {
            manipulate('/api/ctrl_cmd/goto_task', {play: 1, progress: -1, task_id: taskId});
        })
    }
    onSceneChange = (sceneId: number) => {
        this.setState({
            currentSceneId: sceneId
        }, () => {
            this.getTask();
            // manipulate('/api/ctrl_cmd/goto_task', {play: 1, progress: -1, task_id: taskId});
        })
    }
    showDevicePop = () => {
        this.setState({
            isDevicePop: true
        })
    }
    hideDevicePop = () => {
        this.setState({
            isDevicePop: false
        })
    }
    getCmdGroup = () => {
        const param = {
            place_id: PLACE_ID,
            area_id: areaId
        };
        AreaPage.dataStore.fetchData('/api/cmd_grp/list', param, JSON.stringify(param))
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
    setCurrentDeviceId = (currentDeviceId) => {
        this.setState({
            currentDeviceId
        })
    }
    toScreen = () => {
        let currentDeviceIp = this.state.currentDeviceIp;
        console.log(currentDeviceIp);
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
        let isMultiMachine = AREA_MULTI_MACHINE.indexOf(areaId) >= 0;
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={true}
                />
                <Logo main={false} />
                <TouchableOpacity style={[styles.mouse, {right: 117}]} onPress={this.toScreen}>
                    <Mouse />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.icon, {right: 58}]} onPress={this.back}>
                    <Back />
                </TouchableOpacity>
                {/*
                <TouchableOpacity style={[styles.icon, {right: 117}]} onPress={this.getCmdGroup}>
                    <CmdIcon />
                </TouchableOpacity>
                */}
                <View style={styles.contentContainer}>
                    <View style={styles.content}>
                        <View style={styles.sceneWrap}>
                            <BoxShadow setting={shadowOpt}>
                                <View style={{
                                    width: 250,
                                    height: 300
                                }}>
                                    <TaskListHeader
                                        title='幕列表'
                                    />
                                    <SceneList
                                        sceneList={this.state.scenesList}
                                        onSceneChange={this.onSceneChange}
                                        currentSceneId={this.state.currentSceneId}
                                    ></SceneList>
                                </View>
                            </BoxShadow>
                            {
                                isMultiMachine &&
                                <Text style={styles.deviceName}>当前播控：{this.state.currentDeviceName}</Text>
                            }
                        </View>
                        <View style={styles.taskWrap}>
                            <BoxShadow setting={shadowOpt}>
                                <View style={{
                                    width: 250,
                                    height: 300
                                }}>
                                    <TaskListHeader
                                        title='内容列表'
                                    />
                                    <TaskList
                                        taskList={this.state.tasksList}
                                        onTaskChange={this.onTaskChange}
                                        currentTaskId={this.state.currentTaskId}
                                    ></TaskList>
                                </View>
                            </BoxShadow>
                        </View>
                        <View style={styles.manipWrap}>
                            <ManipWrap
                                areaId={areaId}
                                taskId={this.state.currentTaskId}
                                deviceId={this.state.currentDeviceId}
                                isList={isMultiMachine ? true : false}
                                openListPop={this.showDevicePop}
                            />
                        </View>
                    </View>
                </View>
                <DevicePop
                    visible={this.state.isDevicePop}
                    cbCancel={this.hideDevicePop}
                    deviceList={this.state.deviceList}
                    getScene={this.getScene}
                />
                {/*当前展区下的所有任务弹窗*/}
                {/*
                <CmdGroupPop
                    visible={this.state.isAreaTaskPop}
                    cbCancel={this.hideAreaTaskPop}
                    headerText='请选择一个任务：'
                    groupList={this.state.areaTaskList}
                    handleClick={sendTask}
                />
                */}
                {/*指令组弹窗*/}
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
        flex: 1,
        alignItems: 'center'
    },
    bg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        zIndex: 0
    },
    contentContainer: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%'
    },
    deviceName: {
        position: 'absolute',
        bottom: 60,
        left: 60,
        zIndex: 10,
        color: 'rgba(0,0,0,0.6)'
    },
    sceneWrap: {
        position: 'relative',
        width: 350,
        paddingLeft:60,
        paddingTop: 150
    },
    taskWrap: {
        width: 300,
        paddingTop: 150,
        paddingLeft: 0
    },
    manipWrap: {
        width: 420,
        paddingLeft: 0,
        paddingRight: 160,
        paddingTop: 80
    },
    btnRowWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 65,
        marginVertical: 10
    },
    btnWrap: {
        margin: 12
    },
    multiBtnWrap: {
        margin: 5
    },
    icon: {
        position: 'absolute',
        top: 58,
        width: 44,
        height: 44,
        zIndex: 100000
    },
    mouse: {
        position: 'absolute',
        top: 58,
        width: 44,
        height: 44,
        zIndex: 100000
    },
});
