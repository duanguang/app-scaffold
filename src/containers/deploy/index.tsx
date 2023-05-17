import { Image, Text,View } from 'native-base';
import React,{ useCallback,useEffect,useRef,useState } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { Tabs,ListView } from '@ant-design/react-native'
import useList from '@/hooks/pageList';
import { DeployModules } from '@typing/deploy';
import get from 'lodash/get';
import dayjs from 'dayjs';
import { Store } from '@/stores/core.store';
import { deployService } from '@/api/deploy.service';
import DeployStore from '@/stores/deploy.store';
import LinearGradient from 'react-native-linear-gradient';
import { auditStatusEnum } from '@/constants/audit.enum';

export const Deploy = ({ navigation }: RootProps) => {
    const tabs = [
        { title: '待审核',label: '0' },
        { title: '已审核',label: '1' },
    ]
    const store = Store.getStore(DeployStore);
    const [developer_assign_status,setAudit] = useState(0);
    const getList = useCallback(async (page: number,size: number) => {
        const res = await deployService.getList({
            pageIndex: page,
            pageSize: size,
            developer_assign_status,
        })
        return {
            data: get(res,'data.list'),
            total: get(res,'data.total')
        }
    },[developer_assign_status])
    const list_service = useList<DeployModules.List>({
        request: getList,
        default_page_size: 30,
    })
    const list_service_un = useList<DeployModules.List>({
        request: getList,
        default_page_size: 30,
    })
    const ref = useRef(null);
    useEffect(() => {
        const timeid = setTimeout(() => {
            list_service.ref.current?.refresh();
            clearTimeout(timeid);
        },1500)
    },[])
    const onGotoDetail = (item: DeployModules.List | null) => {
        store.setDetail(item);
        navigation.navigate('DeployDetail');
      }
    const renderItem = (item: DeployModules.List) => {
        return (
            <View style={styles.content_list} key={item._id}>
                <View style={styles.content_ul}>
                    <Text numberOfLines={2} onPress={onGotoDetail.bind(this,item)} fontSize={15} fontWeight={'500'} style={styles.content_ul_title}>发布标题: {item.release_title}</Text>
                    <Text numberOfLines={2} onPress={onGotoDetail.bind(this,item)} fontSize={15} fontWeight={'500'} style={styles.content_ul_title}>发布内容: {item.release_content}</Text>
                    <Text numberOfLines={1} fontSize={14} fontWeight={'400'} style={styles.content_li}>项目名称:{item['repository_name']}</Text>
                    <Text numberOfLines={1} fontSize={14} fontWeight={'400'} style={styles.content_li}>来源分支:{item.source_branch}</Text>

                    <Text numberOfLines={1} fontSize={14} fontWeight={'400'} style={styles.content_li}>申请人员:{item.creator}</Text>
                    <Text numberOfLines={1} fontSize={14} fontWeight={'400'} style={styles.content_li}>申请时间:{dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <View style={styles.content_list_li}>
                        <LinearGradient
                            colors={item.developer_assign_status===auditStatusEnum.waiting?['#DEE0E4','#DAF0FF']:['#AEDEFF','#DAF0FF']}
                            style={styles.content_list_li_name}>
                            <Text style={styles.content_list_li_text}>开发</Text>
                        </LinearGradient>
                        <View style={styles.content_direction}>
                            <Image alt='运维' style={styles.content_direction_image} src='https://hoolinks-frontend-resources.oss-cn-shenzhen.aliyuncs.com/images/weapp-to.png'></Image>
                        </View>
                        <LinearGradient
                            colors={item.devops_assign_status===auditStatusEnum.waiting?['#DEE0E4','#DAF0FF']:['#AEDEFF','#DAF0FF']}
                            style={styles.content_list_li_name}>
                            <Text style={styles.content_list_li_text}>运维</Text>
                        </LinearGradient>
                        <View style={styles.content_direction}>
                            <Image alt='运维' style={styles.content_direction_image} src='https://hoolinks-frontend-resources.oss-cn-shenzhen.aliyuncs.com/images/weapp-to.png'></Image>
                        </View>
                        <LinearGradient
                            colors={item.devops_assign_status===auditStatusEnum.waiting?['#DEE0E4','#DAF0FF']:['#AEDEFF','#DAF0FF']}
                            style={styles.content_list_li_name}>
                            <Text style={styles.content_list_li_text}>部署</Text>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.body}>
            <Tabs tabs={tabs}
                ref={ref}
                prerenderingSiblingsNumber={0}
                animated={false}
                swipeable={false}
                onTabClick={(tab) => {
                    if (tab['title'] === '已审核') {
                        setAudit(1)
                        if (list_service_un.curr_page.current === 1) {
                            const timeid = setTimeout(() => {
                                list_service_un.refresh();
                                clearTimeout(timeid);
                            },1500)
                        }
                    }
                    else {
                        setAudit(0)
                    }
                }}
                style={{
                    marginTop: 45,
                }}>
                <View style={styles.content}>
                    <ListView
                        firstLoader={false}
                        ref={list_service.ref}
                        onFetch={list_service.onFetch}
                        keyExtractor={(item,index: any) =>
                            `list - ${item._id} - ${index}`
                        }
                        renderItem={renderItem}
                    ></ListView>
                </View>
                <View style={styles.content}>
                    <ListView
                        firstLoader={false}
                        ref={list_service_un.ref}
                        onFetch={list_service_un.onFetch}
                        keyExtractor={(item: any,index: any) =>
                            `list - ${item} - ${index}`
                        }
                        renderItem={renderItem}
                        numColumns={1}
                    ></ListView>
                </View>
            </Tabs>
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
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 10,
    },
    content_list: {
        marginLeft: 16,
        marginRight: 16,
        display: 'flex',
        borderRadius: 4,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    content_ul: {
        backgroundColor: '#FFFFFF',
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        marginTop: 10,
    },
    content_ul_title: {
        marginTop: 12,
        marginRight: 23,
        marginBottom: 12,
        marginLeft: 12,
        // margin: '12 23 12 12',
        color: '#2D2E2E'
    },
    content_li: {
        marginTop: 0,
        marginRight: 23,
        marginBottom: 12,
        marginLeft: 12,
        color: '#737475'
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
        width: 78,
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
});
