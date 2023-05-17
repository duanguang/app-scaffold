import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Platform,
} from 'react-native';
import {GlboalStore} from '../../stores/globalStore';

interface IProps {}

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    loading: {
        backgroundColor: '#10101099',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: (height - 80) / 2,
        left: (width - 100) / 2,
    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white',
    },
});

const minShowingTime: number = 500;
let startTime: number = 0;

export const LegionsProLoading = React.forwardRef(({}: IProps, ref) => {
    const glStore = React.useContext(GlboalStore);
    const [state, setState] = useState<
        Partial<{
            loading: boolean;
        }>
    >(() => {
        return {
            loading: false,
            startTime: 0,
        };
    });

    const _setState = (stateObj: Object) => {
        setState(prevState => {
            return {
                ...prevState,
                ...stateObj,
            };
        });
    };
    useEffect(() => {
        glStore.changeTouchAble(!state.loading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.loading]);

    const setIsLoading = (isLoading: boolean) => {
        let curTimeLong = new Date().getTime();
        startTime = curTimeLong;
        if (isLoading) {
            _setState({
                loading: isLoading,
            });
        } else {
            let hasShowingTimeLong = curTimeLong - (startTime || 0);
            if (hasShowingTimeLong < minShowingTime) {
                setTimeout(() => {
                    _setState({
                        loading: isLoading,
                    });
                }, minShowingTime);
            } else {
                _setState({
                    loading: isLoading,
                });
            }
        }
    };

    const showLoading = () => {
        setIsLoading(true);
    };
    const dismissLoading = () => {
        setIsLoading(false);
    };

    /** 回传 */
    useImperativeHandle(ref, () => ({
        showLoading,
        dismissLoading,
    }));

    return state.loading ? (
        <View
            style={{
                flex: 1,
                width: width,
                height: height,
                position: 'absolute',
                // backgroundColor:'red',
                backgroundColor: '#10101099',
                zIndex: 9999999,
                elevation: Platform.OS === 'android' ? 9999999 : 0,
            }}>
            <View style={styles.loading}>
                <ActivityIndicator color="white" />
                <Text style={styles.loadingTitle}>请稍后...</Text>
            </View>
        </View>
    ) : null;
});
