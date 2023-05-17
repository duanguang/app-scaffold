import { setOauthHeaders } from '@/constants/header';
import { HttpConfig } from '@/constants/httpConfig';
import { ContainerEntity } from '@/models/container_entity';
import { post,get,legionFetch } from 'legions-fetch';
import { BranchApplyListModules } from '../../typings/branch'
class BranchService {
    async getApplyList(params: {
        pageIndex: number;
        pageSize: number;
        audit_status: number;
    }) {
        let options = setOauthHeaders()
        return get(`${HttpConfig.api}/branch/apply/list`,params,{
            headers: options.headers
        }).then((result) => {
            return result.data as BranchApplyListModules.res_list
        })
    }
    /** 申请分支同意 */
    async checkout(id: string) {
        let options = setOauthHeaders()
        return get(`${HttpConfig.api}/branch/apply/checkout`,{
            id,
        },{
            headers: options.headers,
        }).then((result) => {
            return result.data
        })
    }
    /** 删除分支申请请求数据 */
    async delete(id: string) {
        let options = setOauthHeaders()
        return post(`${HttpConfig.api}/branch/apply/delete`,{
            id,
        },{
            headers: options.headers,
        }).then((result) => {
            return new ContainerEntity<boolean>(result.data)
        })
    }
    /** 驳回分支申请请求 */
    async reject(id: string) {
        let options = setOauthHeaders()
        return post(`${HttpConfig.api}/branch/apply/reject`,{
            id,
        },{
            headers: options.headers,
        }).then((result) => {
            return new ContainerEntity<boolean>(result.data)
        })
    }
}

export const branchService = new BranchService()