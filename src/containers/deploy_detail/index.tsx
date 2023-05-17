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
import DeployStore from '@/stores/deploy.store';
import { deployService } from '@/api/deploy.service';
export const DeployDetail = ({ navigation }: RootProps) => {
    const store = Store.getStore(DeployStore);
    useEffect(() => {
        return () => {
            store.setDetail(null);
        }
    },[])
    const onApproved = () => {
        if (store.isDisabledApproved) {
            return;
        }
        Modal.alert('同意','发布申请审批通过',[
            { text: '取消',style: 'cancel' },
            {
                text: '确定',onPress:async () => {
                    const result = await deployService.run(store.detail?._id as string)
                    if (get(result,'success')) {
                        Toast.show({
                            title: get(result,'message'),
                            duration: 2000,
                        })
                        navigation.navigate('Deploy');
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
    const onGotoGitlab = (type: 'jobs' | 'pipelines') => {
        const _repository_url = store.detail?.repository_https as string;
        let id = 'jobs_id';
        if (type === 'pipelines') {
            id = 'pipeline_id';
        }
        const url = `${_repository_url.replace('.git','')}/-/${type}/${get(store.detail,id)}`
        navigation.navigate('MergeRequests',{url})
    }
    return (
        <View style={styles.body}>
            <View style={styles.content}>
                <Text style={styles.content_title}>开发审批信息</Text>
                <View style={styles.content_list}>
                    <Text style={styles.content_list_li}>发布标题:{store.detail?.release_title}</Text>
                    <Text style={styles.content_list_li}>发布内容:{store.detail?.release_content}</Text>
                    <Text style={styles.content_list_li}>项目名称:{store.detail?.repository_name}</Text>
                    <Text style={styles.content_list_li}>来源分支:{store.detail?.source_branch}</Text>
                    <Text style={styles.content_list_li}>申请时间：{dayjs(store.detail?.create_time).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <Text style={styles.content_list_li}>处理时间：{store.detail?.developer_assign_status === '1' ? dayjs(store.detail?.developer_assign_date).format('YYYY-MM-DD HH:mm:ss') : '--'}</Text>
                </View>
                <Text style={styles.content_title}>运维审批</Text>
                <View style={styles.content_list}>
                    
                    <View style={styles.content_list_li}>
                        <LinearGradient
                            colors={['#AEDEFF','#DAF0FF']}
                            style={styles.content_list_li_name}>
                            <Text style={styles.content_list_li_text}>{store.detail?.developer_assign_members}</Text>
                        </LinearGradient>
                        <View style={styles.content_direction}>
                            <Image alt={store.detail?.developer_assign_members} style={styles.content_direction_image} src='https://hoolinks-frontend-resources.oss-cn-shenzhen.aliyuncs.com/images/weapp-to.png'></Image>
                        </View>
                        <LinearGradient
                            colors={['#AEDEFF','#DAF0FF']}
                            style={styles.content_list_li_name}>
                            <Text style={styles.content_list_li_text}>{store.detail?.devops_assign_members}</Text>
                        </LinearGradient>
                    </View>
                    <Text style={styles.content_list_li}>处理时间：{store.detail?.devops_assign_status === '1' ? dayjs(store.detail?.devops_assign_date).format('YYYY-MM-DD HH:mm:ss') : '--'}</Text>
                </View>
                <Text style={styles.content_title}>部署进度</Text>
                <View style={styles.content_list}>
                    
                    <View style={styles.content_list_li}>
                        <LinearGradient
                            colors={['#AEDEFF','#DAF0FF']}
                            style={styles.content_list_li_name}>
                            <Text style={styles.content_list_li_text}>{store.detail?.devops_assign_members}</Text>
                        </LinearGradient>
                    </View>
                    <Text style={styles.content_list_li}>处理时间：{store.detail?.deploy_status === '1' ? dayjs(store.detail?.deploy_date).format('YYYY-MM-DD HH:mm:ss') : '--'}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Button
                    isDisabled={store.isDisabledDelete}
                    style={{
                        ...styles.footer_btn,
                        borderColor: '#FF2A2A',
                        borderWidth: 1,
                    }}>
                    <Text lineHeight={34} height={34} color={'#FF2A2A'}>删除</Text>
                </Button>
                <Button
                    onPress={onGotoGitlab.bind(this,'jobs')}
                    style={{
                        ...styles.footer_btn,
                        borderColor: '#0E8FE9',
                        borderWidth: 1,
                    }}>
                    <Text lineHeight={34} height={34} color={'#108DE9'}>任务</Text>
                </Button>
                <Button
                    onPress={onGotoGitlab.bind(this,'pipelines')}
                    style={{
                        ...styles.footer_btn,
                        borderColor: '#0E8FE9',
                        borderWidth: 1,
                    }}>
                    <Text lineHeight={34} height={34} color={'#108DE9'}>流水</Text>
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
