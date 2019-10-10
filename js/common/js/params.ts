// 1708测试
/*
export const URL: string = 'https://api.yunzhizhan.cn';
export const TOKEN: string = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQyNjBmODUzYzVmMDNkZjIwN2YwYTMzMWRkMGQ1MWEzY2U2YjU4N2VkODNlM2M5NjQxODkxZDdkZTkwN2I0ZmU2ODQyZjA4ZDM3NTAzOTVmIn0.eyJhdWQiOiIxIiwianRpIjoiZDI2MGY4NTNjNWYwM2RmMjA3ZjBhMzMxZGQwZDUxYTNjZTZiNTg3ZWQ4M2UzYzk2NDE4OTFkN2RlOTA3YjRmZTY4NDJmMDhkMzc1MDM5NWYiLCJpYXQiOjE1NTgwMDUxMTgsIm5iZiI6MTU1ODAwNTExOCwiZXhwIjoxNTg5NjI3NTE4LCJzdWIiOiI0OSIsInNjb3BlcyI6W119.E6Ijg5h9iXSuIiaicpC50ooX3C7sQZs7gAUuHoyvWXWl8tPu-20Wih_xVM0Z1ddZq3hvdXKABVPxbyjGpQyd7v5QOHl2UQ-pBvAPbh8U6IpTCVnRdESBuJTNsSzTHzxrSF0XB8M-5xsIg2AF9ZFrwuS3ld96usXbPBIHs7T1fJWHcFK72blDXhABd4UQ2ekQGTMYeuhthZxuLdCKV4Hrka26CqcvrvqOgn5tB_mE4-fzOnNUlNiwI3_WRYV-JkPzM52ttW5MsllkFssbnVokGjZ6prP5e-7EYF282IdsQ4Ttz9R2k62ZqVrha2eIeDeRVVazqbkdtNHsZDpddMdXjI3kWRht40wbcWYIokOLXpRROELFpI5iiplgW27bwNrj18mVOsdp19wO_SUKH8FNQOj6aRFll2pndbh47EAl7YojxVT-FhcsQBOLtWCOK4xurwf9DIdiaSS_qjE-aqIwgy080U3kFixgqOHRMphgui1tmBgSv9yapNJx4vANEw0DO5pmkUx1Qk_YXjZo1AAX_1ey6LWVV6wMVgbW3jEy1oKnIxbdbsHmv5gtZUb_4imAJ8yoG_3c3bArj_vp8Qh_dtLjRaDi0-tf3srGs73uNC9ciibNWwSsna6z6g3CpbVyQ3IUMNvGLugd1C00QfroaVz-G0I5VmQnoU6Lru7fq8Q';
export const PLACE_ID: number = 7;
// 需要做分屏的展区ID的数组
export const AREA_SCREEN_LIST = [];
// 预案ID，固定
export const PLAN_ID: number = 12;
export const SOCKET_IP: string = '192.168.1.246';
export const SOCKET_PORT: string = '9002';
// 多播控展区
export const AREA_MULTI_MACHINE:Array<number> = [10];
// 设备全开，全关指令ID
export const AREA_LIST: Array<any> = [
    {
        id: 11,
        name: '投影区',
        x: 32,
        y: 22,
        width: 70,
        height: 22
    },
    {
        id: 10,
        name: '拼接屏区',
        x: 69,
        y: 60,
        width: 70,
        height: 22
    },
    {
        id: 16,
        name: '滑轨屏区',
        x: 100,
        y: 300,
        width: 70,
        height: 22
    }
];
// 设备全开，全关指令ID
export const DEVICE_ALL_ID = {
    ON: 192,
    OFF: 193
};
*/

// 正式

export const URL: string = 'https://api.yunzhizhan.cn'; // 'https://api.yunzhizhan.cn';
export const TOKEN: string = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjhlZTBjYjUzNGI2NzU3YjJhOTdkNDJlZDRiOTI1YmQwNjE5YjY0NjBhZmI1NTllNzMyN2ZjN2QwNjJkYjdiOGFlZWViZWUwMjQ0MTk5MGQ4In0.eyJhdWQiOiIxIiwianRpIjoiOGVlMGNiNTM0YjY3NTdiMmE5N2Q0MmVkNGI5MjViZDA2MTliNjQ2MGFmYjU1OWU3MzI3ZmM3ZDA2MmRiN2I4YWVlZWJlZTAyNDQxOTkwZDgiLCJpYXQiOjE1NjgzNDAxMDUsIm5iZiI6MTU2ODM0MDEwNSwiZXhwIjoxNTk5OTYyNTA1LCJzdWIiOiI4NyIsInNjb3BlcyI6W119.Eb0vIgafZe1xS5_t5fQJ-9KFk4cnwW67bG4yti5pCD5H_dJrpwal7y-6TUI7LiEOQ80jIh261GQ5eTsT4jl8oySybbfwLSneVlUQOypBnGUBaPRzUBfvS4ghmVjcsFAZMXvctIS8wkWbi4dh1umF2KD6ul1jxXzjwxmdmxA8HJR80Jmxl_PWuK-OcvJlMoTPGnfGQfUZNe_f8zbjZFRlkJgLSIyUdhDCAPhCajUp6sRbcsf-GoUfjbHyrLwiEVrbz3qrnl9wK7wPdZpPFkpCIvQjjo4C8SG_3CWlVbNcYbAXsTRh6YYLvxi0y_SIoq99kvH26o56U_rcY6p4f0FH_RKCMuJm40nxacuhkVC2GgiEu88-SjnHUZMaiL3CQLSBDK-gZn9kkc_a6E62GtY1o0Md5FmcGAl3EBPaHpwMpLJdxyqwRSPvSV-72s8B4atO8f6RG7mzRrBRycfvhBaXoStzDO2m8xdBt6qXZA-gnZMeRyFyzx2DSn9xSbAllStV2x9VvKU1wK_NXdOb1zIbR7KfBy5Jl8Ob20vMw9hUQZqryiDEaIoVgoMdlToOJSBD034pAHOLdwM_lgV6doMUTuGVtJjd7R1wLiPCv3Lu3zyHyH_RkxpQPvxu8JYPHZBReN7X8EBuNvjpVHHL9TP6F7qDc0yZoL8JUAk_EGY6IIU';
export const PLACE_ID: number = 39;
// 需要做分屏的展区ID的数组
export const AREA_SCREEN_LIST = [];
// 预案ID，固定
export const SOCKET_IP = '192.168.100.104';
export const SOCKET_PORT = '9002';
// 多播控展区
export const AREA_MULTI_MACHINE = [172, 173, 174, 175, 176, 177, 178];
// 设备全开，全关指令ID
export const DEVICE_ALL_ID = {
    // TODO
    ON: -1,
    OFF: -2
};
export const IS_LOCAL_STORAGE = false;
export const AREA_LIST: Array<any> = [
    {
        id: 177,
        name: '联盟生态',
        x: 105,
        y: 150,
        width: 90,
        height: 40
    },
    {
        id: 176,
        name: '一体化安全服务',
        x: 240,
        y: 160,
        width: 120,
        height: 40
    },
    {
        id: 173,
        name: '安全监测与防护',
        x: 508,
        y: 90,
        width: 120,
        height: 40
    },
    {
        id: 174,
        name: '数据安全',
        x: 60,
        y: 415,
        width: 85,
        height: 40
    },
    {
        id: 175,
        name: '前沿技术',
        x: 150,
        y: 495,
        width: 95,
        height: 40
    },
    {
        id: 172,
        name: '形象展示区',
        x: 452,
        y: 452,
        width: 110,
        height: 40
    },
    {
        id: 178,
        name: '安全科普',
        x: 0,
        y: 0,
        width: 110,
        height: 40
    },
];
export const PASSWORD: string =  '1';
export const PLAN_ID = 95;
/************************* Common ************************/
export const DEST = "16_05541352";
// 中控服务ID
export const DEVICE_SN = "2FEEE1A00BB90A12";
// 需要做Websocket连接的展区ID
export const AREA_ID = 77;
