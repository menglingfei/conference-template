// 1708测试
/*
export const URL: string = 'https://api.yunzhizhan.cn';
export const TOKEN: string = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ0NjI1MTAwMTA3M2IyYzBhYjdhNzdiOWM4ZTYyYWM4NzBhZmM5MjgxZjI1Y2RlZDFiM2VmNmEwNzdkYjA4MGY1ZTI1ZmI1MzU3ODc4ZjY0In0.eyJhdWQiOiIxIiwianRpIjoiNDQ2MjUxMDAxMDczYjJjMGFiN2E3N2I5YzhlNjJhYzg3MGFmYzkyODFmMjVjZGVkMWIzZWY2YTA3N2RiMDgwZjVlMjVmYjUzNTc4NzhmNjQiLCJpYXQiOjE1NjU2ODMxMjEsIm5iZiI6MTU2NTY4MzEyMSwiZXhwIjoxNTk3MzA1NTIxLCJzdWIiOiIyOSIsInNjb3BlcyI6W119.orxN9wP_TwkloWFdf7TZ0WYQaM-WiLcq4DxvlmGmcbaaF855McoePK7zjcJL7DKS00UYK7ZhwROpKdTkePBpQCiL5FyhS8pNHq2baaURpiuZtEkURTnc87BEDrvae2hqQQsMv_zxNnOFymgAKlL8n8DlKwwKoW7o9WPlWaBlgsZYHMLywYlqg4KzbkpWNhx6AoteicwvYZX7S0leq1KbB74kytu7qZfX15wkeVwHWYGvG3gfxIoQCeeCP3e2W3qq41taSc2RavLxd7xnR9ALg3wdgp4ISO_yGKCbciKxIrAThimN5MOf1fUiprgDrPtQrDTGJIwDKGVOakOts7j94vwMFsQQupMLE6ThTJ3pCDNC95X2bho6vcjxyt-fhH9i9mO-D0CqfqbIsRefvScVRbhfBNexSbslF7BU0LLQazdZIPGp3dHl6C4EjFdRcsv4ip6qHGUk4Ri41MwuLFIq073UAQ2M9nqYbvB1WFU7R6gMIDKDDtAw2yWMrHRLRRzDs_9HX8OjD-f2tjxbw6qN-7yWysjxXrTphk22dj1Dp2Nj3k_J-TMqSD_sccbCrJt26ygV6xrWNyEzzQdqMps1LdAfn2jzNtpD-p0AL1xzOGPkdKkXCaeZsr6gOOkMw09W1BI32spYArN2GNDU1z3L7VBuaIpUFMcnVBJ_Bk3dXj8';
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
export const PASSWORD: string =  '1';
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
