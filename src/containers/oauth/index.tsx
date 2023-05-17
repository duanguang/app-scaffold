import { getGitlabRedirectUri,GITLAB_APP_ID } from '@/constants/gitlab';
import {
    StyleSheet,
    View,
} from 'react-native';
import React,{ useEffect,useState } from 'react';
import { WebView } from 'react-native-webview';
import { Store } from '@/stores/core.store';
import UserStore from '@/stores/user.store';
import { storage } from '@/utils/storage';
import { storage_keys } from '@/constants/storage';
/** 授权 */
export function LoginOauth({ navigation }: RootProps) {
    const redirect_uri = getGitlabRedirectUri()
    const injectedJavaScriptCode = `document.body.style.backgroundColor = 'red';`
    const webviewRef = React.useRef<WebView>();
    const send = () => { // 主动向 H5 发送数据
        webviewRef.current?.postMessage("Message from Native")
    }
    const url = `https://gitlab.hoolinks.com/oauth/authorize?client_id=${GITLAB_APP_ID}&redirect_uri=${redirect_uri}&response_type=code&state=app&scope=api read_api read_repository write_repository profile read_user`
    return <View style={styles.home}>
        <WebView source={{ uri: url }}
            //@ts-ignore
            ref={webviewRef}
            injectedJavaScript={injectedJavaScriptCode}
            onMessage={event => {
                const data = JSON.parse(event.nativeEvent.data);
                const _newData = {
                    admin_user: JSON.parse(data.admin_user),
                    gitlab_token: JSON.parse(data.gitlab_token),
                    gitlab_user: JSON.parse(data.gitlab_user),
                }
                if (_newData.gitlab_token) {
                    const store = Store.getStore(UserStore);
                    store.setOauthToken(_newData.gitlab_token);
                    store.setUser(_newData.admin_user);
                    store.setGitlabUser(_newData.gitlab_user);
                    storage.save({
                        key: storage_keys.gitlab_token,
                        data:_newData.gitlab_token,
                    })
                    storage.save({
                        key: storage_keys.admin_user,
                        data:_newData.admin_user,
                    })
                    storage.save({
                        key: storage_keys.gitlab_user,
                        data:_newData.gitlab_user,
                    })
                    navigation.navigate('Home');
                }
            }}
        ></WebView>
    </View>
}
const styles = StyleSheet.create({
    home: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E6EDFB',
        flexDirection: 'column',
        display: 'flex',
        flex: 1,
    },
});