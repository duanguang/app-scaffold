import React,{ useEffect,useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text,View } from 'native-base';
import { WebView } from 'react-native-webview';
export  function GitlabWebView({ navigation,route }: RootProps) {
    const [url,setUrl] = useState('');
    useEffect(() => {
        const params = route?.params as { url: string };
        setUrl(params.url)
    },[])
    return <View style={styles.body}>
        {<WebView source={{ uri: url }}
        ></WebView>}
    </View>
}
const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E6EDFB',
        flexDirection: 'column',
        display: 'flex',
        flex: 1,
    },
});