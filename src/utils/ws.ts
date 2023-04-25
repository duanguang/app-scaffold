/**
 * 创建 websocket
 * 目前只能存在一个链接
 */
export interface IHeartCheck {
    timeout: number;
    timeoutObj: number | null;
    reset: () => IHeartCheck;
    start: () => void;
}

export type MessageHandler = (data: WebSocketMessageEvent) => void;

const HEART_BEAT = 60; // seconds

let ws: WebSocket,
    lockReconnect = false,
    messageHandle = {};

let heartCheck: IHeartCheck = {
    timeout: HEART_BEAT * 1000, //  心跳检测时长
    timeoutObj: null, // 定时变量
    reset: function () {
        // 重置定时
        this.timeoutObj && clearTimeout(this.timeoutObj);
        return this;
    },
    start: function () {
        // 开启定时
        //@ts-ignore
        this.timeoutObj = setTimeout(function () {
            // 心跳时间内收不到消息，主动触发连接关闭，开始重连
            ws.close();
        }, this.timeout);
    },
};

function reconnect(url: string, messageDataHandler: MessageHandler) {
    if (lockReconnect) {
        return;
    }
    lockReconnect = true;
    setTimeout(function () {
        //没连接上会一直重连，设置延迟避免请求过多
        CreateWebSocket(url, messageDataHandler);
        lockReconnect = false;
    }, 2000);
}

// 实例websocket
function CreateWebSocket(url: string, messageDataHandler: MessageHandler) {
    try {
        if (ws) {
            noCheckClose();
        }
        ws = new WebSocket(url);
        initEventHandle(url, messageDataHandler);
    } catch (e) {
        reconnect(url, messageDataHandler);
    }
}

// 初始化事件函数
function initEventHandle(wsUrl: string, messageDataHandler: MessageHandler) {
    ws.onclose = function () {
        reconnect(wsUrl, messageDataHandler);
        console.log('ws closed');
    };
    ws.onerror = function (err) {
        reconnect(wsUrl, messageDataHandler);
        console.log('ws error');
    };
    ws.onopen = function () {
        heartCheck.reset().start(); //心跳检测重置
        console.log('ws open');
    };
    ws.onmessage = function (data) {
        //如果获取到消息，心跳检测重置
        heartCheck.reset().start(); //拿到任何消息都说明当前连接是正常的
        messageDataHandler?.(data);
        console.log('ws receive msg', data);
    };
}

function noCheckClose() {
    // 关闭重连
    lockReconnect = true;
    // 关闭ws连接
    ws.close();
    // @ts-ignore
    ws = null;
    // 重置检测
    heartCheck.reset();
}

export {CreateWebSocket, noCheckClose};
