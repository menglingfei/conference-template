import {ToastAndroid} from "react-native";
import DataStore from "../../common/js/DataStorage";

/**
 * 在设备列表中过滤灯控和非灯控
 * data {array} 设备列表数据
 * isLight {boolean} 是否获取灯光
 */
export function getSpecialDevice(data: any, isLight: boolean = false) {
    if (!isLight) {
        return data.filter((item: any) => item.category_id !== 31);
    } else {
        return data.filter((item: any) => item.category_id === 31);
    }
}

export function filterArrayFromName(data: Array<any>): Array<any> {
    let newData: Array<any> = [];
    let arrName: Array<string> = [];
    if (0 === data.length) return [];
    for (let i = 0; i < data.length; i++) {
        if (arrName.indexOf(data[i].name) < 0 ) {
            newData.push(data[i]);
            arrName.push(data[i].name);
        }
    }
    return newData;
}

export function manipulate(api: string, data: any) {
    let dataStore = new DataStore();
    if (!data.task_id) {
        if (api.indexOf('volume') < 0 &&
            api.indexOf('page') < 0 &&
            api.indexOf('scene') < 0
        ) {
            ToastAndroid.showWithGravity(
                '请先选择一个播放内容！',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false;
        }
    }
    dataStore.fetchData(api, data, '', true)
        .then((data: any) => {
            // TODO
        })
        .catch((error: any) => {
            error && console.log(error.toString());
        })
}
export function getAreaListContainAll(areaList: any) {
    areaList.unshift({
        id: 0,
        name: '所有展区'
    })
    return areaList;
}
export function sendTask(taskId: number) {
    let dataStore = new DataStore();
    dataStore.fetchNetData('/api/ctrl_cmd/goto_task', {
        task_id: taskId,
        play: 1,
        progress: -1
    })
        .then((data: any) => {
        })
        .catch((error: any) => {
            error && console.log(error.toString());
        })
}
export function sendCmdGroup(id: number) {
    let dataStore = new DataStore();
    dataStore.fetchNetData('/api/ctrl_cmd/run_command_group', {
        id: id
    })
        .then((data: any) => {
        })
        .catch((error: any) => {
            error && console.log(error.toString());
        })
}
