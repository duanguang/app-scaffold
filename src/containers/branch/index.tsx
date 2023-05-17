import { Image, Text,View } from 'native-base';
import React,{ useCallback,useEffect,useRef,useState } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { Tabs,ListView } from '@ant-design/react-native'
import useList from '@/hooks/pageList';
import get from 'lodash/get';
import dayjs from 'dayjs';
import { Store } from '@/stores/core.store';
import BranchStore from '@/stores/branch.store';
import { branchService } from '@/api/branch.service';
import { BranchApplyListModules } from '@typing/branch';
export const Branch = ({ navigation }: RootProps) => {
    const tabs = [
        { title: '待审核',label: '0' },
        { title: '已审核',label: '1' },
        // { title: '已驳回',label: '2' },
    ]
    const store = Store.getStore(BranchStore);
    const [audit_status,setAudit] = useState(0);
    const getList = useCallback(async (page: number,size: number) => {
        const res = await branchService.getApplyList({
            pageIndex: page,
            pageSize: size,
            audit_status,
        })
        return {
            data: get(res,'data.list'),
            total: get(res,'data.total')
        }
    },[audit_status])
    const list_service = useList<BranchApplyListModules.List>({
        request: getList,
        default_page_size: 30,
    })
    const list_service_un = useList<BranchApplyListModules.List>({
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
    const onGotoDetail = (item: BranchApplyListModules.List | null) => {
        store.setDetail(item);
        navigation.navigate('BranchDetail');
      }
    const renderItem = (item: BranchApplyListModules.List) => {
        return (
            <View style={styles.content_list} key={item._id}>
                <View style={styles.content_ul}>
                    <Text numberOfLines={2} onPress={onGotoDetail.bind(this,item)} fontSize={15} fontWeight={'500'} style={styles.content_ul_title}>分支名称: {item.branch_name}</Text>
                    <Text numberOfLines={2} onPress={onGotoDetail.bind(this,item)} fontSize={15} fontWeight={'500'} style={styles.content_ul_title}>分支用途: {item.branch_usage}</Text>
                    <Text numberOfLines={1} fontSize={14} fontWeight={'400'} style={styles.content_li}>仓库名称:{item['repository_name']}</Text>
                    <Text numberOfLines={1} fontSize={14} fontWeight={'400'} style={styles.content_li}>基线分支:{item.source_branch}</Text>

                    <Text numberOfLines={1} fontSize={14} fontWeight={'400'} style={styles.content_li}>申请人员:{item.creator}</Text>
                    <Text numberOfLines={1} fontSize={14} fontWeight={'400'} style={styles.content_li}>申请时间:{dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <Text numberOfLines={1} fontSize={14} fontWeight={'400'} style={styles.content_li}>审批人员:{item.assign_members}</Text>
                    {(item.update_time && item.audit_status !== '0') && <Text numberOfLines={1} fontSize={14} fontWeight={'400'} style={styles.content_li}>
                        审批时间：{dayjs(item.update_time).format('YYYY-MM-DD HH:mm:ss')}
                    </Text>}
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
});
