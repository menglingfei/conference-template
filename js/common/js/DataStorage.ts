import { AsyncStorage } from 'react-native';
import { URL, TOKEN } from './params';
import { Loading } from '../../components/Loading/Loading';
export default class DataStore {
    /**
     * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
     * @param url
     * @returns {Promise}
     */
    fetchData(api: string, data: any, param: string, net?: boolean) {
        let newApi = param ? api + param : api;
        return new Promise((resolve, reject) => {
            this.fetchLocalData(newApi).then((wrapData: any) => {
                if ((wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) && !net) {
                    resolve(wrapData);
                } else {
                    this.fetchNetData(api, data).then((_data) => {
                        resolve(this._wrapData(_data));
                    }).catch((error) => {
                        reject(error);
                    })
                }
            }).catch((error) => {
                this.fetchNetData(api, data).then((_data) => {
                    resolve(this._wrapData(_data));
                }).catch((error => {
                    reject(error);
                }))
            })
        })
    }
    /**
     * 保存数据
     * @param url
     * @param data
     * @param callback
     */
    saveData(url: string, data: any, callback: any, param: string) {
        let newUrl = '';
        if (!data || !url) return;
        newUrl = param ? url + param : url;
        AsyncStorage.setItem(newUrl, JSON.stringify(this._wrapData(data)), callback);
    }
    /**
     * 删除数据
     * @param url
     * @param data
     * @param callback
     */
    deleteData(callback: any) {
        AsyncStorage.clear(callback);
    }
    /**
     * 获取本地数据
     * @param url
     * @returns {Promise}
     */
    fetchLocalData(url:string) {
        return new Promise((resolve:any, reject:any) => {
            AsyncStorage.getItem(url, (error:any, result:any) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }

    /**
     * 获取网络数据
     * @param url
     * @returns {Promise}
     */
    async fetchNetData(api: string, data: any) {
        Loading.show();
        let url = await AsyncStorage.getItem('URL');
        url = url ? url : URL;
        // multipart/form-data
        let formData  = new FormData();
        for (let name in data) {
            formData.append(name, data[name]);
        }
        return new Promise((resolve, reject) => {
            fetch(`${url}${api}`, {
                method: "POST",
                headers: {
                    "Authorization": `${TOKEN}` || ''
                },
                body: formData // JSON.stringify(data)
            })
                .then((response) => {
                    debugger;
                    Loading.hide();
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((responseData) => {
                    debugger;
                    // this.saveData(api, responseData, null, param)
                    resolve(responseData);
                })
                .catch((error) => {
                    Loading.hide();
                    reject(error);
                })
        })
    }
    fetchNetDataWithProgress(api: string, data: any) {
        return new Promise((resolve, reject) => {
            fetch(`${URL}${api}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                    "Authorization": `${TOKEN}` || ''
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                    // Loading.hide();
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((responseData) => {
                    // this.saveData(api, responseData, null, param)
                    resolve(responseData);
                })
                .catch((error) => {
                    // Loading.hide();
                    reject(error);
                })
        })
    }
    _wrapData(data:Object) {
        return {data: data, timestamp: new Date().getTime()};
    }

    /**
     * 检查timestamp是否在有效期内
     * @param timestamp 项目更新时间
     * @return {boolean} true 不需要更新,false需要更新
     */
    static checkTimestampValid(timestamp:number) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() - targetDate.getHours() > 0.5) return false;//有效期0.5个小时
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
        return true;
    }
}
