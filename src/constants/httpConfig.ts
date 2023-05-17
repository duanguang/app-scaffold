import { HttpConfigDebug } from './http.debug.config';
import { HttpConfigRelease } from './http.release.config';
import pkg from '../../package.json';
import { legionFetch } from 'legions-fetch';
import { navigate } from '@/utils/RootNavigation';
legionFetch.instance.register({
    response: (res) => {
        if (res.status === 401) {
            navigate('Login');
        }
        return res;
    }
})
export interface HttpConfig {
    api: string;
}

export let HttpConfig = HttpConfigDebug;

export const initHttpConfig = (type: string) => {
    // return HttpConfigRelease;
    switch (type) {
        case 'debug':
            HttpConfig = HttpConfigRelease;
            break;
        case 'release':
            HttpConfig = HttpConfigRelease;
            break;
        default:
            HttpConfig = HttpConfigRelease;
            break;
    }
};

const major = parseInt(pkg.version.split('.')[0],10);
const minor = parseInt(pkg.version.split('.')[1],10);
const patch = parseInt(pkg.version.split('.')[2],10);
/** app当前版本 */
export const APP_CURRENT_VERSION = pkg.version;
/** app当前版本,数值 */
export const APP_CURRENT_VERSION_CODE = major * 10000 + minor * 100 + patch;
/** app打包后存放位置 */
export const APP_BUILD_PATH = '/scm-static/apk';
