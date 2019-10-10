import React from 'react';
import { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import DataStore from "../../common/js/DataStorage";
import AreaButton from "./AreaButton";
import { PLACE_ID } from "../../common/js/params";

interface AreaProps {
    areaList: any,
    setDevicesData: any,
    setCurrentAreaId: any
}
interface AreaStates {
    currentArea: number,
    deviceData: Array<any>
}

export default class AreaList extends Component<AreaProps, AreaStates> {
    state = {
        currentArea: 0,
        deviceData: []
    };
    public static dataStore:any = new DataStore();
    componentDidMount() {
        this.getDevicesList(0);
    }
    handleAreaChange = (areaId: number) => {
        this.setState({
            currentArea: areaId
        }, () => {
            this.props.setCurrentAreaId(areaId);
            this.getDevicesList(areaId);
        })
    }
    getCmdGroupList = (areaId: number) => {
        const param = {
            place_id: PLACE_ID,
            area_id: areaId
        };
        const that = this;
        AreaList.dataStore.fetchData('/api/cmd_grp/list', param, JSON.stringify(param))
            .then((data: any) => {
                let preData = this.state.deviceData;
                this.setState({
                    deviceData: preData.concat(data.data.commands)
                }, () => {
                    // let newData = getSpecialDevice(this.state.deviceData, false);
                    // let swiperData = this.setSwiperData(this.state.deviceData);
                    that.props.setDevicesData(this.state.deviceData);
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    getDevicesList = (areaId: number) => {
        const that = this;
        let data = {};
        if (areaId !== 0) {
            data = Object.assign({}, {area_id: areaId});
        } else {
            data = Object.assign({}, {place_id: PLACE_ID});
        }
        AreaList.dataStore.fetchData('/api/device/list', data, JSON.stringify(data))
            .then((data: any) => {
                this.setState({
                    deviceData: data.data.devices
                }, () => {
                    // let swiperData = this.setSwiperData(this.state.deviceData);
                    that.props.setDevicesData(this.state.deviceData);
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    renderAreaList = (data: any) => {
        return (
            data.map((item: any) => {
                return (
                    <View key={item.id} style={styles.itemWrap}>
                        <AreaButton
                            key={item.id}
                            title={item.name}
                            current={item.id === this.state.currentArea ? true : false}
                            handlePress={() => this.handleAreaChange(item.id)}
                        />
                    </View>
                );
            })
        )
    }
    render() {
        let areaList = this.props.areaList;
        return (
            <View style={styles.container}>
                { areaList.length > 0 && this.renderAreaList(areaList) }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 30,
        width: '100%',
        height: 300
    },
    itemWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        lineHeight: 40,
        width: '100%',
    }
});
