import {NativeModules, NativeEventEmitter, Alert} from 'react-native';
import {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/core';
const {PdaScan} = NativeModules;
PdaScan.setScan(
    'com.android.decodewedge.decode_action',
    'com.android.decode.intentwedge.barcode_string',
);

export interface onEventType {
    (code: string): void;
}
export const usePdaScan = (onEvent?: onEventType) => {
    const [code, setCode] = useState<string>('');

    useFocusEffect(() => {
        const eventEmitter = new NativeEventEmitter(PdaScan);
        const eventHandle = eventEmitter.addListener(
            'onEvent',
            (event: any) => {
                setCode(event.code);
                onEvent && onEvent(event.code);
                console.log('扫描结果', event.code);
            },
        );
        const errorEventHandle = eventEmitter.addListener('onError', event => {
            console.error('扫描异常', event);
            Alert.alert('扫描异常，请联系管理员');
        });
        return () => {
            eventHandle.remove();
            errorEventHandle.remove();
        };
    });
    return code;
};
