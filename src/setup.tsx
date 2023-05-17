import React from "react";
import App from "./App";
import { Provider,setInjector } from './stores/core.store'
import { observer } from "mobx-react-lite";
let storeManage = setInjector(null,{})
import {  Provider as Providers } from '@ant-design/react-native';
function setup() {
    return (
        <Provider
            //@ts-ignore
            store={storeManage}>
            <Providers><App></App></Providers>
        </Provider>
    )
}
export default observer(setup);