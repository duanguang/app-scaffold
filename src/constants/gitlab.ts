import { routers } from '../router';


/** gitlab 应用id 授权登录时使用 */
export const GITLAB_APP_ID = '42a02b219d85642405bdad60867d682969c1a58ada3abe5e3a8b12c1398927a9'

export const getGitlabRedirectUri = () => {
    let _domain = 'https://cicd.hoolinks.com/static/mobile';
    return `${_domain}${routers.login_success}`
}