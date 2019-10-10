import React from 'react';
import { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView
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

export default class AreaListRow extends Component<AreaProps, AreaStates> {
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
        const that = this;
        const param = {
            place_id: PLACE_ID,
            area_id: areaId
        };
        AreaListRow.dataStore.fetchData('/api/cmd_grp/list', param, JSON.stringify(param))
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
        AreaListRow.dataStore.fetchData('/api/device/list', data, JSON.stringify(data))
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
                    <View key={item.id} style={{marginHorizontal: 15, marginVertical: 4}}>
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
                <ScrollView horizontal={true}>
                    { areaList.length > 0 && this.renderAreaList(areaList) }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }
});
