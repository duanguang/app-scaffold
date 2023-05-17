import { Text,Image,} from 'native-base';
import React, { useCallback } from 'react';
import {
    ImageBackground,
    StyleSheet,
    View,
} from 'react-native';
import { Store,observer,useStore } from '@/stores/core.store';
import UserStore from '@/stores/user.store';
import LinearGradient,{
    LinearGradientProps,
} from 'react-native-linear-gradient';
export const Home = observer((props: RootProps) => {
    const store = useStore(UserStore,{
        schedules: [() => {
            if (store.read_storage_state === 'complete') {
                if (!store.isLogin) {
                    // props.navigation.navigate('Login');
                }
            }
        }]
    });
    if (store.read_storage_state === 'none' && !store.isLogin) {
        store.onStorageToData().then(() => {
            // 忽略路由传不可序列化参数时的警告
            store.setState('complete');
        })
    }
    const onGotoMergeRequest = useCallback(() => {
        props.navigation.navigate('MergeRequest')
    },[])
    const onGotoDeploy = useCallback(() => {
        props.navigation.navigate('Deploy')
    },[])
    const onGotoBranch = useCallback(() => {
        props.navigation.navigate('Branch')
    },[])
    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <Text fontSize={24} fontWeight={'600'} style={styles.header_title}>集成平台</Text>
                <View style={styles.header_desc}><Image alt='main' width={134} height={95} src='https://hoolinks-frontend-resources.oss-cn-shenzhen.aliyuncs.com/images/weapp-main.png'></Image></View>
            </View>
            <View style={styles.content}>
                <View style={styles.content_left}>
                    <LinearGradient
                        colors={['#BDEBFE','#86CFFE']}
                        style={styles.content_proj}>
                        <Text style={styles.content_title}>
                            项目管理
                        </Text>
                        <ImageBackground
                            width={93}
                            height={94}
                            source={{
                                uri: 'https://hoolinks-frontend-resources.oss-cn-shenzhen.aliyuncs.com/images/weapp-proj.png',
                            }}
                            imageStyle={{
                                resizeMode: "cover",
                                justifyContent: "center",
                                width: 93,
                                height: 94,
                                marginTop: 26,
                            }}></ImageBackground>
                    </LinearGradient>

                    <LinearGradient
                        colors={['#B4D3FE','#C0E3FE']}
                        style={{
                            ...styles.block,
                            marginTop: 12,
                        }}>
                        <Text onPress={onGotoMergeRequest} style={styles.content_title}>
                            合并申请
                        </Text>
                    </LinearGradient>
                    <LinearGradient
                        colors={['#6FDDB3','#86F3B9']}
                        style={{
                            ...styles.block,
                            marginTop: 12,
                        }}>
                        <Text style={styles.content_title}>
                            创建申请
                        </Text>
                    </LinearGradient>
                </View>
                <View style={styles.content_right}>
                    <LinearGradient
                        colors={['#B4D3FE','#C0E3FE']}
                        style={{
                            ...styles.block,
                        }}>
                        <Text style={styles.content_title}>
                            回滚申请
                        </Text>
                    </LinearGradient>
                    <LinearGradient
                        colors={['#86CFFE','#BDEBFE']}
                        style={{
                            ...styles.block,
                            marginTop: 12,
                        }}>
                        <Text onPress={onGotoDeploy} style={styles.content_title}>
                            发布信息
                        </Text>
                    </LinearGradient>
                    <LinearGradient
                        colors={['#FFCDAC','#FBDDBE']}
                        style={{
                            ...styles.block,
                            marginTop: 12,
                        }}>
                        <Text onPress={onGotoBranch} style={styles.content_title}>
                            分支申请
                        </Text>
                    </LinearGradient>

                    <LinearGradient
                        colors={['#E3CFFF','#D8ACFF']}
                        style={{
                            ...styles.block,
                            marginTop: 12,
                        }}>
                        <Text style={styles.content_title}>
                            我的申请
                        </Text>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E6EDFB',
        flexDirection: 'column',
        display: 'flex',
        flex: 1,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1,
        height: 95,
        width: '100%',
        marginTop: 73,
    },
    header_title: {
        lineHeight: 95,
        marginLeft: 16,
        width: 100,
        fontFamily: 'lucida grande',
        color: '#2F2F2F',
    },
    header_desc: {
        width: 134,
        marginRight: 8,
        height: 95,
    },
    content: {
        height: 252,
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        marginLeft: 16,
        marginRight: 16,
        justifyContent: 'space-between',
    },
    content_left: {
        height: 252,
        display: 'flex',
        width: 166,
        flexDirection: 'column',
    },
    content_proj: {
        width: 166,
        height: 120,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
    },
    content_title: {
        marginLeft: 12,
        // marginTop: 16,
        width: 64,
        fontSize: 16,
        height: 54,
        lineHeight: 54,
        fontWeight: '400',
        color: '#2D2E2E',
    },
    content_right: {
        height: 252,
        display: 'flex',
        width: 166,
        marginRight: 32,
        backgroundColor: 'grenn',
        flexDirection: 'column',
    },
    block: {
        width: 166,
        height: 54,
        borderRadius: 4,
    }
});
