import { MergeRequestModules } from '../../typings/merge.request';
import { setOauthHeaders } from '@/constants/header';
import { HttpConfig } from '@/constants/httpConfig';
import { post,get,legionFetch } from 'legions-fetch';
class MergeRequestService {

    /** 查询申请分支合并数据列表 */
    async getList(params: {
        pageIndex: number;
        pageSize: number;
        audit_status: number;
    }) {
        let options = setOauthHeaders();
        console.log(`${HttpConfig.api}/branch/merge/request`)
        return get(`${HttpConfig.api}/branch/merge/request`,params,{
            headers: options.headers,
        }).then((result) => {
            console.log(result,'sss')
            return result.data as unknown as MergeRequestModules.list_res
        })
    }
    async approved(id: string,merge_request_iid: string) {
        let options = setOauthHeaders()
        return legionFetch.instance.request({
            url: `${HttpConfig.api}/branch/merge/request/merge`,
            method: 'PUT',
            data: {
                id,
                merge_request_iid
            },
            headers: options.headers,
        }).then((res) => {
            return res.data as MergeRequestModules.update_res
        })
    }
    async planStop(merge_request_iid: string,project_id: string) {
        let options = setOauthHeaders()
        return post(`${HttpConfig.api}/deploy/plan/stop`,{
            merge_request_iid,
            project_id,
        },{
            headers: options.headers,
        }).then((res) => {
            return res.data
        })
    }
}

export const mergeRequestService = new MergeRequestService()