import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import ManipulateButton from "../ManipulateButton/ManipulateButton";
import { manipulate } from '../../common/js/utils';
import WelcomeWrap from "../WelcomeWrap/WelcomeWrap";
import PageLayer from "../PageLayer/PageLayer";
import {PLAN_ID} from "../../common/js/params";

interface ManipProps {
    areaId: number,
    taskId: number,
    isList?: boolean,
    openListPop: any,
    deviceId?: number
}
interface ManipStates {
    isWelcomePop: boolean
}
export default class ManipWrap extends Component<ManipProps, ManipStates> {
    state = {
        isWelcomePop: false
    }
    openWelcomeLayer = () => {
        if (!this.props.taskId) {
            ToastAndroid.showWithGravity(
                '请选择一个内容!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false;
        }
        this.setState({
            isWelcomePop: true
        })
    }
    closeWelcome = () => {
        this.setState({
            isWelcomePop: false
        })
    }
    render() {
        let areaId = this.props.areaId;
        let taskId = this.props.taskId;
        let deviceId = this.props.deviceId;
        const color = ['rgba(197, 154, 222, 1)', 'rgba(136, 93, 173, 1)'];
        return (
            <View style={styles.manipWrap}>
                <View style={styles.btnRowWrap}>
                    <ManipulateButton title='播放' color={color} handleClick={() => {manipulate('/api/ctrl_cmd/goto_task', {play: 1, progress: -1, task_id: taskId, device_id: deviceId})}} icon='play' />
                    <ManipulateButton title='暂停' color={color} handleClick={() => {manipulate('/api/ctrl_cmd/goto_task', {play: 0, progress: -1, task_id: taskId, device_id: deviceId})}} icon='pause' />
                </View>
                <View style={styles.btnRowWrap}>
                    <ManipulateButton title='音量-' color={color} handleClick={() => {manipulate('/api/ctrl_cmd/volume_down', {area_id: areaId, step: 10, device_id: deviceId})}} icon='volume-down' />
                    <ManipulateButton title='音量+' color={color} handleClick={() => {manipulate('/api/ctrl_cmd/volume_up', {area_id: areaId, step: 10, device_id: deviceId})}} icon='volume-up' />
                    <ManipulateButton title='静音' color={color} handleClick={() => {manipulate('/api/ctrl_cmd/set_volume', {volume: 0, area_id: areaId, device_id: deviceId})}} icon='volume-off' />
                </View>
                <View style={styles.btnRowWrap}>
                    <ManipulateButton title='上一页' color={color} handleClick={() => {manipulate('/api/ctrl_cmd/page_up', {area_id: areaId, device_id: deviceId})}} icon='step-backward' />
                    <ManipulateButton title='下一页' color={color} handleClick={() => {manipulate('/api/ctrl_cmd/page_down', {area_id: areaId, device_id: deviceId})}} icon='step-forward' />
                </View>
                <View style={styles.btnRowWrap}>
                    <ManipulateButton title='上一幕' color={color} handleClick={() => {manipulate('/api/ctrl_cmd/prev_scene', {area_id: areaId, plan_id: PLAN_ID})}} icon='fast-backward' />
                    <ManipulateButton title='下一幕' color={color} handleClick={() => {manipulate('/api/ctrl_cmd/next_scene', {area_id: areaId, plan_id: PLAN_ID})}} icon='fast-forward' />
                </View>
                <View style={styles.btnRowWrap}>
                    <ManipulateButton title='重播' color={color} handleClick={() => {manipulate('/api/ctrl_cmd/goto_task', {progress: 0, play: 1, task_id: taskId, device_id: deviceId})}} icon='repeat' />
                    {
                        this.props.isList &&
                        <ManipulateButton title='列表' color={color} handleClick={this.props.openListPop} icon='list' />
                    }
                </View>
                <PageLayer
                    visible={this.state.isWelcomePop}
                    title='欢迎词'
                    onCancel={this.closeWelcome}
                >
                    <WelcomeWrap
                        taskId={this.props.taskId}
                        cbCancel={this.closeWelcome}
                        cbConfirm={this.closeWelcome}
                    />
                </PageLayer>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    manipWrap: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: "100%"
    },
    btnRowWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 65,
        marginVertical: 8
    }
});
