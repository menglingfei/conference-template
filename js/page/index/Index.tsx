import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import { Animated, StyleSheet, View, Image, Text, StatusBar, ToastAndroid } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import IndexButtonWrap from '../../components/IndexButtonWrap/IndexButtonWrap';
import IndexButton from '../../components/IndexButton/IndexButton';
import AreaButton from '../../components/AreaButton/AreaButton';
import CmdGroupPop from '../../components/CmdGroupPop/CmdGroupPop';
import PasswordPop from '../../components/PasswordPop/PasswordPop';
import { Loading } from '../../components/Loading/Loading';
import Logo from '../../components/Logo/Logo';
import DataStore from '../../common/js/DataStorage';
import {
    AREA_LIST,
    DEVICE_ALL_ID,
    PLAN_ID,
} from '../../common/js/params';
import { sendCmdGroup } from '../../common/js/utils';

interface MainProps {
    navigation: any
}
interface MainStates {
    isCmdPop: boolean,
    isAreaPagePop: boolean,
    isDevicePagePop: boolean,
    currentAreaName: string,
    currentAreaId: number,
    opacity: any,
    groupList: Array<any>,
    isConfirmPop: boolean,
    currentManipId: number,
    currentManipType: string,
    timer: any,
    progress: number,
    /**
     * MAIN    open dialog when initialising APP
     * COMMAND open dialog when sending commands like open and close
     * DEVICE  open dialog when opening device page
     */
    passwordRouter: string,
    footType: number,
}
const shadowOpt = {
    width: 260, //包裹的子内容多宽这里必须多宽
    height: 460, //同上
    color: "#c1c0c0", //阴影颜色
    border: 8, //阴影宽度
    radius: 10, //包裹的子元素圆角多少这里必须是多少
    opacity: 0.5, //透明度
    x: 0,
    y: 0,
    style: {marginVertical: 5}
}
export default class Main extends Component<MainProps, MainStates> {
    state = {
        isAreaPagePop: false,
        isDevicePagePop: false,
        isCmdPop: false,
        currentAreaName: '',
        currentAreaId: 0,
        opacity: new Animated.Value(0),
        groupList: [],
        isConfirmPop: false,
        currentManipId: 0,
        currentManipType: '',
        timer: undefined,
        progress: 0,
        passwordRouter: 'MAIN',
        footType: 1
    }
    public static fadeAnimation: any = new Animated.Value(0);
    public static dataStore:any = new DataStore();
    componentDidMount() {
        Orientation.lockToLandscape();
    }
    sendCmdGroup = () => {
        let that = this;
        this.setState({
            isConfirmPop: false,
            timer: setInterval(() => {
                let progress = this.state.progress;
                if (progress > 0.96) {
                    clearTimeout(that.state.timer);
                }
                that.setState({
                    progress: progress + 0.002
                }, () => {
                    let message = this.state.currentManipType === 'ON' ? '正在开启' : '正在关闭';
                    Loading.showProgress(this.state.progress, message);
                })
            }, 50)
        }, () => {
            let toastMessage = this.state.currentManipType === 'ON' ? '开启成功' : '关闭成功';
            Main.dataStore.fetchNetDataWithProgress('/api/ctrl_cmd/run_command_group', {
                id: this.state.currentManipId
            })
                .then((data: any) => {
                    clearTimeout(that.state.timer);
                    Loading.hide();
                    ToastAndroid.showWithGravity(
                        toastMessage,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                    this.setState({
                        progress: 0
                    });
                })
                .catch((error: any) => {
                    error && console.log(error.toString());
                })
        })
    }
    renderAreaList = () => {
        let areaList = AREA_LIST;
        return (
            areaList.map((item) => {
                return (
                    <AreaButton key={item.id} x={item.x} y={item.y} width={item.width} height={item.height} title={item.name} handleClick={() => {this.openAreaLayer(item.name, item.id)}} />
                )
            })
        )
    }
    openAreaLayer = (areaName, areaId) => {
        if (areaId === 148 || areaId === 146) {
            return;
        }
        const planId = PLAN_ID;
        this.props.navigation.navigate('AreaPage', {
            areaId,
            areaName,
            planId
        });
    }
    openDeviceLayer = () => {
        this.setState({
            isConfirmPop: false
        }, () => {
            this.props.navigation.navigate('DevicePage');
        })
    }
    closeCmd = () => {
        this.setState({
            isCmdPop: false
        })
    }
    openCmd = () => {
        this.setState({
            isCmdPop: true
        })
    }
    openConfirmPop = (id: number, type: string) => {
        this.setState({
            isConfirmPop: true,
            currentManipId: id,
            currentManipType: type,
            passwordRouter: 'COMMAND',
            footType: 2
        })
    }
    openPasswordPop = () => {
        this.setState({
            isConfirmPop: true,
            passwordRouter: 'DEVICE',
            footType: 2
        })
    }
    closeConfirmPop = () => {
        this.setState({
            isConfirmPop: false
        })
    }
    beforeCloseAllDevice = () => {
        this.setState({
            isConfirmPop: false
        }, () => {
            this.sendCmdGroup();
        })
    }
    clearStorage = () => {
        Main.dataStore.deleteData(() => {
            ToastAndroid.showWithGravity(
                '清除成功！',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        });
    }
    beforePassWordSuccess = () => {
        const { passwordRouter } = this.state;
        switch (passwordRouter) {
            case 'MAIN':
                this.closeConfirmPop();
                break;
            case 'COMMAND':
                this.sendCmdGroup();
                break;
            case 'DEVICE':
                this.openDeviceLayer();
                break;
        }
    }
    render() {
        const { footType } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={true}
                />
                <Logo main={false}/>
                <View style={styles.contentContainer}>
                    <View style={styles.contentArea}>
                        <Image style={[styles.bg, {zIndex: 1}]} source={ require('./displayBg.png')} />
                        <View style={styles.areaWrapper}>
                            <View style={[styles.areaList]}>
                                {this.renderAreaList()}
                            </View>
                        </View>
                    </View>
                    <BoxShadow setting={shadowOpt}>
                        <View style={styles.contentIndex}>
                            <View style={styles.header}>
                                <Image style={styles.totalLogo} source={require('./logo.png')} />
                                <Text style={styles.total}>天津网安博览会通服网安展区</Text>
                            </View>
                            <View style={styles.headerEn}>
                                <Text style={styles.headerEnLine}>TIANJIN NET</Text>
                                <Text style={styles.headerEnLine}>OF NINGBO INTELLIGENT INDUSTRY EXPO</Text>
                            </View>
                            <IndexButtonWrap titleCn='展厅导览' titleEn='Exhibition Hall Guide'>
                                <View style={styles.marT2}>
                                    <IndexButton titleCn='设备管理' titleEn='Equipment Management' icon='desktop-mac' handleClick={this.openPasswordPop}/>
                                </View>
                            </IndexButtonWrap>
                            <IndexButtonWrap titleCn='公共设施' titleEn='Public Facilities'>
                                <View style={styles.marT1}>
                                    <IndexButton titleCn='展厅全开' titleEn='Power On' icon='power' handleClick={() => {this.openConfirmPop(DEVICE_ALL_ID.ON, 'ON')}}/>
                                </View>
                                <View style={styles.marT1}>
                                    <IndexButton titleCn='展厅全关' titleEn='Power Off' icon='power-off' handleClick={() => {this.openConfirmPop(DEVICE_ALL_ID.OFF, 'OFF')}}/>
                                </View>
                                <View style={styles.marT1}>
                                    <IndexButton titleCn="清除缓存" titleEn='Clear' icon='buffer' handleClick={this.clearStorage}/>
                                </View>
                            </IndexButtonWrap>
                        </View>
                    </BoxShadow>
                </View>
                <CmdGroupPop
                    visible={this.state.isCmdPop}
                    cbCancel={this.closeCmd}
                    groupList={this.state.groupList}
                    handleClick={sendCmdGroup}
                />
                <PasswordPop
                    visible={this.state.isConfirmPop}
                    cbCancel={this.closeConfirmPop}
                    cbConfirm={this.beforePassWordSuccess}
                    footType={footType}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: 1,
        top: 0,
        bottom: 0,
        right: 40,
        left: 0
    },
    bg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    contentArea: {
        width: 650,
        height: '100%'
    },
    contentIndex: {
        width: 260,
        height: 480,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingLeft: 27,
        paddingRight: 27
    },
    areaWrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1000
    },
    areaList: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 10000
    },
    areaBg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        zIndex: 100
    },
    marT1: {
        marginTop: 6
    },
    marT2: {
        marginTop: 4
    },
    header: {
        marginTop: 13
    },
    total: {
        height: 40,
        lineHeight: 40,
        fontSize: 18,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 1)',
        marginTop: -8
    },
    totalLogo: {
        width: 102,
        height: 26
    },
    headerEn: {
        marginTop: 5,
        marginBottom: 20
    },
    headerEnLine: {
        fontSize: 10,
        color: 'rgba(51, 51, 51, 1)',
        height: 10,
        lineHeight: 10
    },
    test: {
        width: 315,
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 22
    },
    powerWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 195
    }
});
