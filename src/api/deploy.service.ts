import { setOauthHeaders } from '@/constants/header';
import { HttpConfig } from '@/constants/httpConfig';
import { ContainerEntity } from '@/models/container_entity';
import { post,get,legionFetch } from 'legions-fetch';
import { DeployModules,RepoModules } from '../../typings/deploy';
class DeployService {
    async getList(params: {
        pipeline_id?: string;
        repository_id?: string;
        pageIndex: number;
        pageSize: number;
        developer_assign_status?: number;
    }) {
        let options = setOauthHeaders()
        return get(`${HttpConfig.api}/deploy/list`,params,{
            headers: options.headers
        }).then((result) => {
            return result.data as DeployModules.Root
        })
    }
    /** 审批执行发布计划  */
    async run(id: string) {
        let options = setOauthHeaders()
        return get(`${HttpConfig.api}/deploy/run/play`,{
            id,
        },{
            headers: options.headers
        }).then((result) => {
            return result.data as RepoModules.res_list
        })
    }
    /** 删除申请请求数据 */
    async delete(id: string) {
        let options = setOauthHeaders()
        return post(`${HttpConfig.api}/deploy/delete`,{
            id,
        },{
            headers: options.headers,
        }).then((result) => {
            return new ContainerEntity<boolean>(result.data)
        })
    }
}

export const deployService = new DeployService()