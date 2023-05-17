import { auditStatusEnum } from '@/constants/audit.enum';
import { action,computed,makeObservable,observable } from 'mobx';
import { StoreMeta } from '@typing/core.store';
import { MergeRequestModules } from '@typing/merge.request';
import { StoreModules,Store } from './core.store';
import UserStore from './user.store';
import { StoreBase } from './store.base';

@StoreModules
export default class MergeRequestStore extends StoreBase {
    static meta: StoreMeta = {
        ...Store.meta,
    }
    constructor(context: any) {
        super(context);
        makeObservable(this);
    }
    @observable private _detail: MergeRequestModules.List|null=null;

    @computed get detail() {
        return this._detail;
    }
    @computed get isDisabledApproved() {
        const store = Store.getStore(UserStore);
        if (store.user._id === this.detail?.assign_members_id && this.detail.audit_status === auditStatusEnum.waiting) {
            return false;
        }
        return true;
    }
    @computed get isPushMessage() {
        const store = Store.getStore(UserStore);
        if (store.user._id === this.detail?.assign_members_id && this.detail.audit_status === auditStatusEnum.pass && this.detail.is_apply_deploy) {
            return false
        }
        return true;
    }
    @computed get repository_https() {
        let _repository_https =this.detail?.target_repository_https as string || this.detail?.repository_https as string || ''
        _repository_https = _repository_https.replace('.git','')
        _repository_https = `${_repository_https}/-/merge_requests/${this.detail?.merge_request_iid}`
        return _repository_https;
    }
    @action setDetail(_detail: MergeRequestModules.List|null) {
        this._detail = _detail;
    }
    
}
