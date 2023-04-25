import {storage} from './storage';
import cloneDepp from 'lodash/cloneDeep';
import {Toast} from 'native-base';

/** fetch拦截器 */
export const fetchInterceptor = async (props: RootProps) => {
    /** 获取token */
    const token = await storage.load({key: 'token'});
    const originFetch = fetch;

    /** 覆写fetch */
    Object.defineProperty(global, 'fetch', {
        configurable: true,
        enumerable: true,
        get() {
            return (url: string, options: any) => {
                /** 加入请求头 */
                return originFetch(url, {
                    ...options,
                    ...{
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'HL-Access-Token': `${token}`,
                        }),
                    },
                    /** 返回处理 */
                })
                    .then(async response => {
                        const data = await cloneDepp(response).json();
                        /** token失效跳转到登录页 */
                        if (data.status === 401) {
                            Toast.show({
                                placement: 'bottom',
                                status: 'error',
                                title: '登录凭证失效 , 返回登录页面',
                            });
                            props.navigation.navigate('Login');
                            return;
                        }
                        return response;
                    })
                    .catch(err => {
                        console.log(37, err);
                    });
            };
        },
    });
};
