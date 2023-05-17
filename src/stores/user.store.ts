import { storage_keys } from '@/constants/storage';
import { action,computed,makeObservable,observable } from 'mobx';
import { StoreMeta } from '@typing/core.store';
import { StoreModules,Store } from './core.store';
import { storage } from '@/utils/storage';
import { StoreBase } from './store.base';
export interface InterfaceGitlabToken {
    access_token: string
    token_type: string;
    expires_in: number;
    refresh_token: string;
    created_at: number
}
export interface InterfaceGitlabUser {
    id: number;
    username: string;
    name: string;
    avatar_url: string;
    web_url: string;
}
export interface InterfaceUser {
    email: string;
    expiresTime: string;
    gitlab_open_id: string;
    lastLoginTime: string;
    name: string;
    phone: string;
    role: string;
    token: string;
    uuid: string;
    _id: string;
    roleNo: number;
}
@StoreModules
export default class UserStore extends StoreBase {
    static meta: StoreMeta = {
        ...Store.meta,
    }
    constructor(context: any) {
        super(context);
        makeObservable(this);
    }
    @observable private _gitlab_token = {
        access_token: '',
        token_type: '',
        expires_in: 0,
        refresh_token: '',
        created_at: 0,
    }
    @observable private _gitlab_user = {
        id: 0,
        username: '',
        name: '',
        avatar_url: '',
        web_url: '',
    }
    @observable private _user = {
        email: '',
        expiresTime: '',
        gitlab_open_id: '',
        lastLoginTime: '',
        name: '',
        phone: '',
        role: '',
        roleNo: 0,
        token: '',
        uuid: '',
        _id:'',
    }
    @observable private _read_storage_state:'none'|'loading'|'complete' = 'none';
    @computed  get  gitlab_token() {
        return this._gitlab_token
    }
    @computed get gitlab_user() {
       return this._gitlab_user
    }
    @computed get user() {
        return this._user
    }
    @computed get isLogin() {
        if (this.gitlab_token.access_token && this.user.token) {
            return true;
        }
        return false
    }
    @computed get read_storage_state() {
        return this._read_storage_state;
    }
    /** storage 数据同步至store */
    @action async onStorageToData() {
        this._read_storage_state = 'loading';
        if (!this.gitlab_token.access_token) {
            const res = await storage.load({
                key: storage_keys.gitlab_token,
            }).catch((err) => {
            });
            this.setOauthToken(res||{});
        }
        if (!this.gitlab_user.id) {
            const res = await storage.load({
                key: storage_keys.gitlab_user,
            }).catch((err)=>{});
            this.setGitlabUser(res||{});
        }
        if (!this.user._id) {
            const res = await storage.load({
                key: storage_keys.admin_user,
            }).catch((err)=>{});
            this.setUser(res||{});
        }
    }
    @action setOauthToken(token: InterfaceGitlabToken) {
        this._gitlab_token = token;
    }
    @action setGitlabUser(user:InterfaceGitlabUser) {
        this._gitlab_user = user;
    }
    @action setUser(user:InterfaceUser) {
        this._user = user;
    }
    @action setState(_state:UserStore['_read_storage_state']) {
        this._read_storage_state = _state;
    }
}
