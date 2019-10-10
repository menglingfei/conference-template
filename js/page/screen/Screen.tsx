import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    PanResponder,
    Image,
    Text, ToastAndroid, TouchableOpacity
} from 'react-native';
import KeyBoardBtnItem from './KeyBoardBtnItem';
import { KEYCODE } from '../../common/js/keyCode';
import { SOCKET_IP, SOCKET_PORT } from '../../common/js/params';
import Back from "../../components/Back/Back";

const LINEHEIGHT: number = 50;
const MOUSESPEED: number = 20;
let IP: string = '';

interface screenProps {
    navigation: any
}
interface screenStates {
    isCapsClicked: boolean,
    isControlClicked: boolean,
    isWinClicked: boolean,
    isAltClicked: boolean,
    isShiftClicked: boolean,
    isWsConnect: boolean,
    [index: string]: any
}
export default class Screen extends Component<screenProps, screenStates> {
    ws: any;
    _panResponder: any;
    constructor(props: any) {
        super(props);
        this.ws = null; // new WebSocket(`ws://${IP}:${SOCKET_PORT}`);
        this.state = {
            isCapsClicked: false,
            isControlClicked: false,
            isWinClicked: false,
            isAltClicked: false,
            isShiftClicked: false,
            isWsConnect: false
        };
    }
    componentWillMount() {
        // let left = true;
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderStart: (evt, gestureState) => {
            },
            onPanResponderGrant: (evt, gestureState) => {
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
                // alert(gestureState.numberActiveTouches);
            },
            onPanResponderMove: (evt, gestureState) => {
                let {vx, vy} = gestureState;
                if (vx === 0 && vy === 0) {
                    return;
                }
                this.sendMouseMoveMsg({
                    x: Math.ceil(vx * MOUSESPEED),
                    y: Math.ceil(vy * MOUSESPEED),
                    l: 0
                });
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {

                debugger;
                let {dx, dy} = gestureState;
                if (dx === 0 && dy === 0) {
                    // send left button command
                    this.ws.send(JSON.stringify({
                        'ip' : IP,
                        'cmd': 17,
                        'x': 0,
                        'y': 0,
                        'l': 1,
                        'r': 0
                    }));
                    this.ws.send(JSON.stringify({
                        'ip' : IP,
                        'cmd': 17,
                        'x': 0,
                        'y': 0,
                        'l': 0,
                        'r': 0
                    }));
                }
            }
        });
    }
    componentDidMount() {
        IP = this.props.navigation.getParam('ip');
        this.connect();
    }
    componentWillUnmount() {
        this.ws.close();
    }
    connect = () => {
        this.ws = new WebSocket(`ws://${SOCKET_IP}:${SOCKET_PORT}`);
        this.ws.onopen = (evt: any) => {
            console.log('连接成功！');
            this.setState({
                isWsConnect: true
            })
        };
        this.ws.onclose = (evt: any) => {
            console.log('连接关闭！');
            this.setState({
                isWsConnect: false
            })
        };
        this.ws.onerror = (evt: any) => {
            this.reconnect();
        }
    }
    sendMouseMoveMsg = ({x, y, l, r}: any) => {
        if (false === this.state.isWsConnect) {
            return false;
        }
        this.ws.send(JSON.stringify({
            'ip' : IP,
            'cmd': 17,
            'x': x,
            'y': y,
            'l': l,
            'r': r
        }));
    }
    reconnect = () => {
        let that = this;
        setTimeout(function () {   //没连接上会一直重连，设置延迟避免请求过多
            that.connect();
        }, 1000);
    }
    beforeSendWxActionMsg = (val: number) => {
        if (false === this.state.isWsConnect) {
            ToastAndroid.showWithGravity(
                '服务器异常，请检查是否开启服务器！',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false;
        }
        if ( val === KEYCODE.shiftLeft || val === KEYCODE.shiftRight ) {
            this.setState({
                isShiftClicked: !this.state.isShiftClicked
            }, () => {
                this.sendWxActionMsg(val, 'isShiftClicked');
            });
            return;
        }
        if ( val === KEYCODE.controlLeft || val === KEYCODE.controlRight ) {
            this.setState({
                isControlClicked: !this.state.isControlClicked
            }, () => {
                this.sendWxActionMsg(val, 'isControlClicked');
            });
            return;
        }
        if ( val === KEYCODE.altLeft || val === KEYCODE.altRight ) {
            this.setState({
                isAltClicked: !this.state.isAltClicked
            }, () => {
                this.sendWxActionMsg(val, 'isAltClicked');
            });
            return;
        }
        if ( val === KEYCODE.windows ) {
            this.setState({
                isWinClicked: !this.state.isWinClicked
            }, () => {
                this.sendWxActionMsg(val, 'isWinClicked');
            });
            return;
        }
    }
    /**
     * 对Shift,Ctrl,Win,Alt等按钮发送指令的特殊处理
     */
    sendWxActionMsg = (val: number, type: any) => {
        if (false === this.state.isWsConnect) {
            ToastAndroid.showWithGravity(
                '服务器异常，请检查是否开启服务器！',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false;
        }
        let down = !type ? type : this.state[type];
        this.ws.send(JSON.stringify({
            'ip' : IP,
            'cmd': 18,
            'k': val,
            'd': down
        }));
    }
    sendWsMsg = (val: number) => {
        if (false === this.state.isWsConnect) {
            ToastAndroid.showWithGravity(
                '服务器异常，请检查是否开启服务器！',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false;
        }
        if (val === KEYCODE.capital) {
            this.setState({
                isCapsClicked: !this.state.isCapsClicked
            }, () => {
            });
        } else {
            this.setState({
                isShiftClicked: false,
                isAltClicked: false,
                isWinClicked: false,
                isControlClicked: false
            }, () => {
                // this.sendWxActionMsg();
            });
        }
        this.ws.send(JSON.stringify({
            'ip' : IP,
            'cmd': 18,
            'k': val
        }));
        let dataArr = [KEYCODE.shiftLeft, KEYCODE.altLeft, KEYCODE.controlLeft, KEYCODE.windows];
        for (let i = 0; i < 4; i++) {
            this.sendWxActionMsg(dataArr[i], false);
        }
    }
    letterValueIndex = () => {
        if ( this.state.isCapsClicked || this.state.isShiftClicked ) {
            return 1;
        } else {
            return 0;
        }
    }
    back = () => {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.bg} source={require('../../common/image/bg.png')} />
                <TouchableOpacity style={styles.back} onPress={this.back}>
                    <Back />
                </TouchableOpacity>
                <View style={styles.contentContainer}>
                    <View style={styles.touchWrap}>
                        <View
                            style={styles.touchArea}
                            {...this._panResponder.panHandlers}
                        >
                        </View>
                    </View>
                    <View
                        style={styles.keyboardWrap}
                    >
                        <View style={styles.keyboard}>
                            <View style={styles.lineSmall}>
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.esc]}
                                    title = {['Esc']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.F1]}
                                    title = {['F1']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.F2]}
                                    title = {['F2']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.F3]}
                                    title = {['F3']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.F4]}
                                    title = {['F4']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.F5]}
                                    title = {['F5']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.F6]}
                                    title = {['F6']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.F7]}
                                    title = {['F7']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.F8]}
                                    title = {['F8']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.F9]}
                                    title = {['F9']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.F10]}
                                    title = {['F10']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.F11]}
                                    title = {['F11']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.F12]}
                                    title = {['F12']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.numlock]}
                                    title = {['Nlk']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.printScreen]}
                                    title = {['Psc']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.insert]}
                                    title = {['Ins']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.delete]}
                                    title = {['Del']}
                                    size="small"
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                            </View>
                            <View style={styles.line}>
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.tmplQuotation, KEYCODE.wave]}
                                    title = {['`', '~']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.one, KEYCODE.exclamation]}
                                    title = {['1', '!']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.two, KEYCODE.at]}
                                    title = {['2', '@']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.three, KEYCODE.pound]}
                                    title = {['3', '#']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.four, KEYCODE.dollar]}
                                    title = {['4', '$']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.five, KEYCODE.percent]}
                                    title = {['5', '%']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.six, KEYCODE.angle]}
                                    title = {['6', '^']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.seven, KEYCODE.and]}
                                    title = {['7', '&']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.eight, KEYCODE.star]}
                                    title = {['8', '*']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.nine, KEYCODE.parenthesisLeft]}
                                    title = {['9', '(']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.zero, KEYCODE.parenthesisRight]}
                                    title = {['0', ')']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.minus, KEYCODE.underline]}
                                    title = {['-', '_']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.equal, KEYCODE.plus]}
                                    title = {['=', '+']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.backSpace]}
                                    title = {['返回']}
                                    flex={2}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.home]}
                                    title = {['Home']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                            </View>
                            <View style={styles.line}>
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.tab]}
                                    title = {['Tab']}
                                    flex={2}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.q, KEYCODE.Q]}
                                    title = {['Q']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.w, KEYCODE.W]}
                                    title = {['W']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.e, KEYCODE.E]}
                                    title = {['E']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.r, KEYCODE.R]}
                                    title = {['R']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.t, KEYCODE.T]}
                                    title = {['T']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.y, KEYCODE.Y]}
                                    title = {['Y']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.u, KEYCODE.U]}
                                    title = {['U']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.i, KEYCODE.I]}
                                    title = {['I']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.o, KEYCODE.O]}
                                    title = {['O']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.p, KEYCODE.P]}
                                    title = {['P']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.middleLeft, KEYCODE.flowerParenthesisLeft]}
                                    title = {['[', '{']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.middleRight, KEYCODE.flowerParenthesisRight]}
                                    title = {[']', '}']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.antiLine, KEYCODE.line]}
                                    title = {['\\','|']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.pageUp]}
                                    title = {['Up', 'Page']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                            </View>
                            <View style={styles.line}>
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.capital]}
                                    title = {['Caps']}
                                    isDown = {this.state.isCapsClicked}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.a, KEYCODE.A]}
                                    title = {['A']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.s, KEYCODE.S]}
                                    title = {['S']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.d, KEYCODE.D]}
                                    title = {['D']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.f, KEYCODE.F]}
                                    title = {['F']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.g, KEYCODE.G]}
                                    title = {['G']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.h, KEYCODE.H]}
                                    title = {['H']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.j, KEYCODE.J]}
                                    title = {['J']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.k, KEYCODE.K]}
                                    title = {['K']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.l, KEYCODE.L]}
                                    title = {['L']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.divider, KEYCODE.colon]}
                                    title = {[';', ':']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.quotation, KEYCODE.doubleQuotation]}
                                    title = {['\'', '"']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.enter]}
                                    title = {['回车']}
                                    flex={2}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.pageDown]}
                                    title = {['Down', 'Page']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                            </View>
                            <View style={styles.line}>
                                <KeyBoardBtnItem
                                    flex={2}
                                    key={KEYCODE.shiftLeft}
                                    value = {[KEYCODE.shiftLeft]}
                                    title = {['Shift']}
                                    isDown = {this.state.isShiftClicked}
                                    current = {this.letterValueIndex()}
                                    handleClick = {() => this.beforeSendWxActionMsg(KEYCODE.shiftLeft)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.z, KEYCODE.z]}
                                    title = {['Z']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.x, KEYCODE.X]}
                                    title = {['X']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.k, KEYCODE.K]}
                                    title = {['K']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.v, KEYCODE.V]}
                                    title = {['V']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.b, KEYCODE.B]}
                                    title = {['B']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.n, KEYCODE.N]}
                                    title = {['N']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.m, KEYCODE.M]}
                                    title = {['M']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.apostrophe, KEYCODE.arrowLeft]}
                                    title = {[',', '<']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.point, KEYCODE.arrowRight]}
                                    title = {['.', '>']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.slash, KEYCODE.question]}
                                    title = {['/', '?']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    flex = {2}
                                    key = {KEYCODE.shiftRight}
                                    value = {[KEYCODE.shiftRight]}
                                    title = {['Shift']}
                                    isDown = {this.state.isShiftClicked}
                                    current = {this.letterValueIndex()}
                                    handleClick = {() => {this.beforeSendWxActionMsg(KEYCODE.shiftRight)}}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.up]}
                                    title = {['Up']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.end]}
                                    title = {['End']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                            </View>
                            <View style={styles.line}>
                                <KeyBoardBtnItem
                                    flex={2}
                                    key={KEYCODE.controlLeft}
                                    value = {[KEYCODE.controlLeft]}
                                    title = {['Ctrl']}
                                    isDown = {this.state.isControlClicked}
                                    current = {this.letterValueIndex()}
                                    handleClick = {() => {this.beforeSendWxActionMsg(KEYCODE.controlLeft)}}
                                />
                                <KeyBoardBtnItem
                                    key={KEYCODE.windows}
                                    value = {[KEYCODE.windows]}
                                    title = {['Win']}
                                    isDown = {this.state.isWinClicked}
                                    current = {this.letterValueIndex()}
                                    handleClick = {() => {this.beforeSendWxActionMsg(KEYCODE.windows)}}
                                />
                                <KeyBoardBtnItem
                                    key={KEYCODE.altLeft}
                                    value = {[KEYCODE.altLeft]}
                                    title = {['Alt']}
                                    isDown = {this.state.isAltClicked}
                                    current = {this.letterValueIndex()}
                                    handleClick = {() => {this.beforeSendWxActionMsg(KEYCODE.altLeft)}}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.space]}
                                    title = {['']}
                                    flex = {6}
                                    handleClick = {(value: number) => {this.sendWsMsg(value)}}
                                />
                                <KeyBoardBtnItem
                                    key={KEYCODE.altRight}
                                    value = {[KEYCODE.altRight]}
                                    title = {['Alt']}
                                    isDown = {this.state.isAltClicked}
                                    current = {this.letterValueIndex()}
                                    handleClick = {() => {this.beforeSendWxActionMsg(KEYCODE.altRight)}}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.menu]}
                                    title = {['Menu']}
                                    handleClick = {(value: number) => {this.sendWsMsg(value)}}
                                />
                                <KeyBoardBtnItem
                                    flex={2}
                                    key={KEYCODE.controlRight}
                                    value = {[KEYCODE.controlRight]}
                                    title = {['Ctrl']}
                                    isDown = {this.state.isControlClicked}
                                    current = {this.letterValueIndex()}
                                    handleClick = {() => {this.beforeSendWxActionMsg(KEYCODE.controlRight)}}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.left]}
                                    title = {['Left']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.down]}
                                    title = {['Down']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                                <KeyBoardBtnItem
                                    value = {[KEYCODE.right]}
                                    title = {['Right']}
                                    current = {this.letterValueIndex()}
                                    handleClick = {(value: number) => this.sendWsMsg(value)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    back: {
        position: 'absolute',
        top: 44,
        right: 58,
        width: 40,
        height: 40,
        zIndex: 1000000
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
    touchWrap: {
        flex: 1,
        width: "75%",
        alignItems: "center",
        justifyContent: "center"
    },
    touchArea: {
        width: "100%",
        height: 200,
        borderRadius: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        shadowColor: "black",
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 0.8
    },
    keyboardWrap: {
        width: "100%",
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.8)'
    },
    keyboard: {
        width: "100%"
    },
    line: {
        width: "100%",
        height: LINEHEIGHT,
        flexDirection: "row"
    },
    lineSmall: {
        width: "100%",
        height: LINEHEIGHT * 2 / 3,
        flexDirection: "row"
    }
});
