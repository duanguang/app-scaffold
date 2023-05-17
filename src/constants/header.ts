import { Store } from '@/stores/core.store';
import UserStore from '@/stores/user.store';
const getGitlabToken = () => {
    const store = Store.getStore(UserStore)
	return `Bearer ${store.gitlab_token.access_token}`
}
export const GitlabHeaders = {
	headers: {
		Authorization: getGitlabToken(),
	},
}
export const setOauthHeaders = () => {
    const store = Store.getStore(UserStore)
    let authorization = store.user.token;
	let options = {
		headers: {
			'gitlab_authorization': `Bearer ${store.gitlab_token.access_token}`,
			'Gitlab-Authorization':`Bearer ${store.gitlab_token.access_token}`,
			Authorization: `Bearer ${authorization}`,
		},
    }
    return options;
}