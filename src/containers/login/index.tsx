import { Text,Image,Button } from 'native-base';
import React,{ useEffect,useState } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';





export const Login = ({ navigation }: RootProps) => {
    return (
        <View style={styles.login}>
            <View style={styles.header}>
                <Text style={styles.header_title}>—   登录集成平台   —</Text>
            </View>
            <View style={styles.desc}>
                <Image
                    style={styles.desc_img}
                    alt='logo'
                    src='https://hoolinks-frontend-resources.oss-cn-shenzhen.aliyuncs.com/images/weapp-desc-bg.png'
                />
            </View>
            <View style={styles.sumbit}>
                <Button
                    onPress={() => {
                        navigation.navigate('LoginOauth');
                    }}
                     style={styles.sumbit_btn}
                    _text={{ fontSize: 18 }}>
                    Gitlab授权登录
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    login: {
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
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        width: 195,
        height: 27,
        lineHeight: 27,
        marginLeft: 90,
        marginTop: 139,
    },
    header_title: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'lucida grande',
        color: '#2D2E2E',
    },
    desc: {
        marginTop: 84,
        marginLeft: 50,
        height: 276,
    },
    desc_img: {
        height: 276,
        width: 276,
    },
    sumbit: {
        width: 275,
        height: 50,
        marginLeft: 50,
        marginTop: 68,
    },
    sumbit_btn:{
        borderRadius: 25,
        backgroundColor:'#0E8FE9',
    }
});
