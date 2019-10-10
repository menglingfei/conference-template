import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import {Animated, StyleSheet, View, Image, Text, StatusBar, ToastAndroid, AsyncStorage} from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import IndexButtonWrap from '../../components/IndexButtonWrap/IndexButtonWrap';
import IndexButton from '../../components/IndexButton/IndexButton';
import AreaButton from '../../components/AreaButton/AreaButton';
import CmdGroupPop from '../../components/CmdGroupPop/CmdGroupPop';
import { Loading } from '../../components/Loading/Loading';
import Logo from '../../components/Logo/Logo';
import DataStore from '../../common/js/DataStorage';
import { AREA_LIST, PLACE_ID } from '../../common/js/params';
import { sendCmdGroup } from '../../common/js/utils';
import PasswordPop from '../../components/PasswordPop/PasswordPop';
import URLPop from '../../components/URLPop/URLPop';

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
     * WEB     open dialog when switching web pattern
     * COMMAND open dialog when sending commands like open and close
     * DEVICE  open dialog when opening device page
     * GROUP   open dialog when getting commands group
     */
    passwordRouter: string,
    footType: number,
    // close all or open all
    commandType: string,
    isUrlPop: boolean,
    /**
     * OFFLINE 离线
     * WIFI 无线
     */
    currentWebType: string
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
        passwordRouter: '',
        footType: 1,
        commandType: '',
        isUrlPop: false,
        currentWebType: 'WIFI'
    }
    public static dataStore:any = new DataStore();
    async componentDidMount() {
        Orientation.lockToLandscape();
        const url = await AsyncStorage.getItem('URL');
        const currentWebType = url ? 'OFFLINE' : 'WIFI';
        this.setState({
            currentWebType
        })
    }
    sendCmdGroup = () => {
        let that = this;
        this.setState({
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
                    // debugger;
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
        this.props.navigation.navigate('AreaPage', {
            areaId,
            areaName
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
    getGroupList = () => {
        this.setState({
            isConfirmPop: false
        }, () => {
            Main.dataStore.fetchNetData('/api/cmd_grp/list', {
                place_id: PLACE_ID
            })
                .then((data: any) => {
                    let commands = data.commands;
                    this.setState({
                        groupList: commands,
                        isCmdPop: true
                    })
                })
                .catch((error: any) => {
                    error && console.log(error.toString());
                })
        })
    }
    openCmd = () => {
        this.setState({
            isCmdPop: true
        })
    }
    beforeCloseAllDevice = () => {
        this.setState({
            isConfirmPop: false
        }, () => {
            this.sendCmdGroup();
        })
    }
    openPasswordPop = (route: string, command: string) => {
        this.setState({
            isConfirmPop: true,
            passwordRouter: route,
            commandType: command,
            footType: 2
        })
    }
    closeConfirmPop = () => {
        this.setState({
            isConfirmPop: false
        })
    }
    closeUrlPop = () => {
        this.setState({
            isUrlPop: false
        })
    }
    beforePassWordSuccess = () => {
        const { passwordRouter } = this.state;
        switch (passwordRouter) {
            case 'WEB':
                // this.closeConfirmPop();
                this.openURLPop();
                break;
            case 'COMMAND':
                this.sendCmdGroup();
                break;
            case 'DEVICE':
                this.openDeviceLayer();
                break;
            case 'GROUP':
                this.getGroupList();
                break;
            default:
                break;
        }
    }
    openURLPop = () => {
        this.setState({
            isConfirmPop: false,
            isUrlPop: true
        })
    }
    cbUrlConfirm = async (currentWebType) => {
        this.setState({
            isUrlPop: false,
            currentWebType
        })
    }
    render() {
        const { footType, isUrlPop, currentWebType } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={true}
                />
                <Logo main={false}/>
                <View style={styles.contentContainer}>
                    <View style={styles.contentArea}>
                        <Image style={[styles.bg, {zIndex: 1}]} source={require('./displayBg.png')} />
                        <View style={[styles.areaList]}>
                            {this.renderAreaList()}
                        </View>
                    </View>
                    <BoxShadow setting={shadowOpt}>
                        <Text style={styles.currentWeb}>当前网络：{ currentWebType === 'WIFI' ? '无线网络' : '离线模式' }</Text>
                        <View style={styles.contentIndex}>
                            <View style={styles.header}>
                                <Text style={styles.totalEn}>INTERNET</Text>
                                <Text style={styles.total}>互联网大会</Text>
                            </View>
                            <View style={styles.headerEn}>
                                <Text style={styles.headerEnLine}>Integrated Pipeline</Text>
                                <Text style={styles.headerEnLine}>Gallery Exhibition Hall</Text>
                            </View>
                            <IndexButtonWrap titleCn='公共设施' titleEn='Public Facilities'>
                                <View style={styles.marT1}>
                                    <IndexButton titleCn='设备管理' titleEn='Equipment Management' icon='desktop-mac' handleClick={this.openPasswordPop.bind(this, 'DEVICE')}/>
                                </View>
                                <View style={styles.marT1}>
                                    <IndexButton titleCn='指令组' titleEn='Command' icon='cards-variant' handleClick={this.openPasswordPop.bind(this, 'GROUP')}/>
                                </View>
                                <View style={styles.marT1}>
                                    <IndexButton titleCn='切换网络' titleEn='Web' icon='web' handleClick={this.openPasswordPop.bind(this, 'WEB')} />
                                </View>
                                <View style={styles.marT1}>
                                    <IndexButton titleCn='全开' titleEn='Power On' icon='power' handleClick={this.openPasswordPop.bind(this, 'COMMAND', 'ON')}/>
                                </View>
                                <View style={styles.marT1}>
                                    <IndexButton titleCn='全关' titleEn='Power Off' icon='power-off' handleClick={this.openPasswordPop.bind(this, 'COMMAND', 'OFF')}/>
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
                <URLPop
                    prevWebType={currentWebType}
                    visible={isUrlPop}
                    cbCancel={this.closeUrlPop}
                    cbConfirm={this.cbUrlConfirm}
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
        height: 460,
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
        marginTop: 10
    },
    marT2: {
        marginTop: 6
    },
    header: {
        marginTop: 13
    },
    total: {
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 1)',
        marginTop: -8
    },
    totalEn: {
        fontSize: 32,
        color: 'rgba(153, 153, 153, 1)'
    },
    headerEn: {
        marginTop: 10,
        marginBottom: 25
    },
    headerEnLine: {
        fontSize: 9,
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
    },
    currentWeb: {
        position: 'absolute',
        top: -30,
        left: 0,
        zIndex: 1000,
        color: '#d1d1d1',
        fontSize: 12
    }
});
