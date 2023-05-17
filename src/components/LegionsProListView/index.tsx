import React, { useEffect, useRef } from 'react';
import { ListView } from '@ant-design/react-native'
import { ListViewProps } from '@ant-design/react-native/lib/list-view';
import get from 'lodash/get';
export interface IRef{
    onRefresh: () => void;
    onFetch: () => void;
}
interface IProps<T> extends ListViewProps<T> {
    onReady?: (ref: IRef) => void;
}

export function LegionsProListView<T>(props: IProps<T>) {
    useEffect(() => {
    },[])
    
    return (
        <ListView
            numColumns={1}
            {...props}
        ></ListView>
    );
};