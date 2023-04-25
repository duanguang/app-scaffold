/*
 * @Author: linzeqin
 * @Date: 2021-10-17 23:17:34
 * @description: 域名配置管理
 */
import {HttpConfigDebug} from './http.debug.config';
import {HttpConfigRelease} from './http.release.config';
import pkg from '../../package.json';
export interface HttpConfig {
    domainScm: string;
    domainApi: string;
    domainMock: string;
    domainScmWs: string;
    domainApiWs: string;
}

export let httpConfig = HttpConfigDebug;

export const initHttpConfig = (type: string) => {
    // return HttpConfigRelease;
    switch (type) {
        case 'debug':
            httpConfig = HttpConfigDebug;
            break;
        case 'release':
            httpConfig = HttpConfigRelease;
            break;
        default:
            httpConfig = HttpConfigRelease;
            break;
    }
};

const major = parseInt(pkg.version.split('.')[0], 10);
const minor = parseInt(pkg.version.split('.')[1], 10);
const patch = parseInt(pkg.version.split('.')[2], 10);
/** app当前版本 */
export const APP_CURRENT_VERSION = pkg.version;
/** app当前版本,数值 */
export const APP_CURRENT_VERSION_CODE = major * 10000 + minor * 100 + patch;
/** app打包后存放位置 */
export const APP_BUILD_PATH = '/scm-static/apk';
