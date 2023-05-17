import { auditStatusEnum } from '@/constants/audit.enum';
import { action,computed,makeObservable,observable } from 'mobx';
import { BranchApplyListModules } from '@typing/branch';
import { StoreMeta } from '@typing/core.store';
import { StoreModules,Store } from './core.store';
import UserStore from './user.store';
import { StoreBase } from './store.base';

@StoreModules
export default class BranchStore extends StoreBase {
    static meta: StoreMeta = {
        ...Store.meta,
    }
    constructor(context: any) {
        super(context);
        makeObservable(this);
    }
    audit_status_icon = {
        '0': 'wait',
        '1': 'pass',
        '2':'reject',
    }
    @observable private _detail: BranchApplyListModules.List|null=null;

    @computed get detail() {
        return this._detail;
    }
    /** 审批 */
    @computed get isDisabledApproved() {
        const store = Store.getStore(UserStore);
        if (store.user._id === this.detail?.assign_members_id && this.detail.audit_status === auditStatusEnum.waiting) {
            return false;
        }
        return true;
    }
    /** 驳回 */
    @computed get isDisabledReject() {
        return this.isDisabledApproved;
    }
    /** 删除 */
    @computed get isDisabledDelete() {
        const store = Store.getStore(UserStore);
        if ((store.user._id === this.detail?.assign_members_id||store.user._id===this._detail?.creator_id) && this.detail?.audit_status === auditStatusEnum.waiting) {
            return false;
        }
        return true;
    }
    @action setDetail(_detail: BranchApplyListModules.List|null) {
        this._detail = _detail;
    }
    
}
