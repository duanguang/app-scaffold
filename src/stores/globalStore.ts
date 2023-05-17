import {action, computed, makeAutoObservable, observable} from 'mobx';
import React from 'react';
import {AppProps} from '../App';


class store {
    constructor() {
        makeAutoObservable(this);
    }
    /** 当前环境是否为开发环境 */
    isDebug: boolean = true;
    /** 当前环境类型 */
    buildType: string = 'debug';
    initApp(pramas: Partial<AppProps>) {
        this.isDebug = pramas.isDebug!;
        this.buildType = pramas.buildType!;
    }
    touchAble: boolean = true;
    @action changeTouchAble = (ab: boolean) => {
        console.log('changeTouchAble', ab);

        this.touchAble = ab;
    };
}

export const GlboalStore = React.createContext(new store());
