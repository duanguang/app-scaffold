import Store from 'brain-store';
import { Text,Image,Button,Toast } from 'native-base';
import React,{ useEffect,useState } from 'react';
import dayjs from 'dayjs';
import {
    StyleSheet,
    View,
} from 'react-native';

import LinearGradient,{
    LinearGradientProps,
} from 'react-native-linear-gradient';
import get from 'lodash/get';

import {
    Modal,
} from '@ant-design/react-native'
import BranchStore from '@/stores/branch.store';
import { branchService } from '@/api/branch.service';
export const BranchDetail = ({ navigation }: RootProps) => {
    const store = Store.getStore(BranchStore);
    useEffect(() => {
        return () => {
            store.setDetail(null);
        }
    },[])
    const onDelete = () => {
        if (store.isDisabledDelete) {
            return;
        }
        Modal.alert('删除','分支申请删除',[
            { text: '取消',style: 'cancel' },
            {
                text: '确定',onPress:async () => {
                    const result = await branchService.delete(store.detail?._id as string)
                    if (get(result,'success')) {
                        Toast.show({
                            title: '删除成功',
                            duration: 2000,
                        })
                     
                        navigation.navigate('Branch');
                    } else {
                        Toast.show({
                            title: '删除失败,请重试',
                            duration: 2000,
                        })
                    }
                }
            },
        ])

    }
    const onReject = () => {
        if (store.isDisabledReject) {
            return;
        }
        
        Modal.alert('驳回','分支申请驳回',[
            { text: '取消',style: 'cancel' },
            {
                text: '确定',onPress:async () => {
                    const result = await branchService.reject(store.detail?._id as string)
                    if (get(result,'success')) {
                        Toast.show({
                            title: '驳回成功',
                            duration: 2000,
                        })
                        navigation.navigate('Branch');
                    } else {
                        Toast.show({
                            title: '驳回失败,请重试',
                            duration: 2000,
                        })
                    }
                }
            },
        ])
    }
    const onApproved = () => {
        if (store.isDisabledApproved) {
            return;
        }
        Modal.alert('同意','分支申请审批通过',[
            { text: '取消',style: 'cancel' },
            {
                text: '确定',onPress:async () => {
                    const result = await branchService.checkout(store.detail?._id as string)
                    if (get(result,'success')) {
                        Toast.show({
                            title: get(result,'message'),
                            duration: 2000,
                        })
                        navigation.navigate('Branch');
                    } else {
                        Toast.show({
                            title: get(result,'message'),
                            duration: 2000,
                        })
                    }
                }
            },
        ])
    }
    return (
        <View style={styles.body}>
            <View style={styles.content}>
                <Text style={styles.content_title}>基本信息</Text>
                <View style={styles.content_list}>
                    <Text style={styles.content_list_li}>分支名称:{store.detail?.branch_name}</Text>
                    <Text style={styles.content_list_li}>仓库名称:{store.detail?.repository_name}</Text>
                    <Text style={styles.content_list_li}>基线分支:{store.detail?.source_branch}</Text>
                    <Text style={styles.content_list_li}>分支用途:{store.detail?.branch_usage}</Text>
                </View>
                <Text style={styles.content_title}>审批信息</Text>
                <View style={styles.content_list}>
                    
                    <View style={styles.content_list_li}>
                        <LinearGradient
                            colors={['#AEDEFF','#DAF0FF']}
                            style={styles.content_list_li_name}>
                            <Text style={styles.content_list_li_text}>{store.detail?.creator}</Text>
                        </LinearGradient>
                        <View style={styles.content_direction}>
                            <Image alt={store.detail?.creator} style={styles.content_direction_image} src='https://hoolinks-frontend-resources.oss-cn-shenzhen.aliyuncs.com/images/weapp-to.png'></Image>
                        </View>
                        <LinearGradient
                            colors={['#AEDEFF','#DAF0FF']}
                            style={styles.content_list_li_name}>
                            <Text style={styles.content_list_li_text}>{store.detail?.assign_members}</Text>
                        </LinearGradient>
                    </View>
                    <Text style={styles.content_list_li}>申请时间：{ dayjs(store.detail?.create_time).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <Text style={styles.content_list_li}>处理时间：{store.detail?.audit_status === '1' ? dayjs(store.detail?.update_time).format('YYYY-MM-DD HH:mm:ss') : '--'}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Button
                    isDisabled={store.isDisabledDelete}
                    onPress={onDelete}
                    style={{
                        ...styles.footer_btn,
                        borderColor: '#FF2A2A',
                        borderWidth: 1,
                    }}>
                    <Text lineHeight={34} height={34} color={'#FF2A2A'}>删除</Text>
                </Button>
                <Button
                    isDisabled
                    style={{
                        ...styles.footer_btn,
                        borderColor: '#0E8FE9',
                        borderWidth: 1,
                    }}>
                    <Text lineHeight={34} height={34} color={'#108DE9'}>查看</Text>
                </Button>
                <Button
                    isDisabled={store.isDisabledReject}
                    onPress={onReject}
                    style={{
                        ...styles.footer_btn,
                        borderColor: '#FF9D00',
                        borderWidth: 1,
                    }}>
                    <Text lineHeight={34} height={34} color={'#FF9D00'}>驳回</Text>
                </Button>
                <Button
                    onPress={onApproved}
                    isDisabled={store.isDisabledApproved}
                    style={{
                        ...styles.footer_btn,
                        backgroundColor: '#0E8FE9',
                    }}>
                    <Text lineHeight={34} height={34} color={'#FFFFFF'}>通过</Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EFF4FF',
        flexDirection: 'column',
        display: 'flex',
        flex: 1,
    },
    content: {
        marginRight: 16,
        marginLeft: 16,
        marginTop: 45,
    },
    content_title: {
        height: 22,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 15,
        fontWeight: '500',
        color: '#2D2E2E',
        lineHeight: 22,
    },
    content_list: {
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 12,
    },
    content_list_title: {
        marginTop: 0,
        marginRight: 23,
        marginBottom: 12,
        marginLeft: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#2D2E2E',
    },
    content_list_desc: {
        fontSize: 14,
        fontWeight: '400',
        color: '#2D2E2E',
    },
    content_list_li: {
        marginTop: 0,
        marginRight: 23,
        marginBottom: 12,
        marginLeft: 12,
        fontSize: 14,
        fontWeight: '400',
        color: '#737475',
        display: 'flex',
        flexDirection: 'row',
    },
    content_list_li_name: {
        width: 103,
        height: 30,
        borderRadius: 15,
    },
    content_list_li_text: {
        height: 30,
        lineHeight: 30,
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        color: '#2D2E2E',
    },
    content_direction: {
        width: 25,
        height: 15,
        marginTop: 8,
        marginRight: 15,
        marginBottom: 8,
        marginLeft: 15,
    },
    content_direction_image: {
        width: 25,
        height: 15,
    },
    footer: {
        flex: 1,
        display: 'flex',
        height: 35,
        marginLeft: 16,
        marginRight: 16,
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginBottom: 15,
    },
    footer_btn: {
        width: 76,
        height: 34,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        fontSize: 14,
        fontWeight: '500',
    },
    footer_btn_disabled: {
        color: '#6190e8',
        borderColor: '#6190e8',
        borderWidth: 1,
        opacity: .3,
        backgroundColor: '#fff'
    }
});
