import {Text, View, Modal, Button} from 'native-base';
import {
    Alert,
    Linking,
    StyleSheet,
    TouchableNativeFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
    APP_CURRENT_VERSION,
    APP_BUILD_PATH,
    APP_CURRENT_VERSION_CODE,
    httpConfig,
} from '../../constants/httpConfig';
import {storage} from '../../utils/storage';

export const AppVersionManage = () => {
    const [newVersion, setNewVersion] = useState(APP_CURRENT_VERSION);
    const [newVersionCode, setNewVersionCode] = useState(
        APP_CURRENT_VERSION_CODE,
    );
    const [outputFile, setOutputFile] = useState('');
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        async function checkUpdate() {
            const ignoreUpdate = await storage.load({key: 'ignoreUpdate'});
            fetch(
                `${
                    httpConfig.domainScm
                }${APP_BUILD_PATH}/output-metadata.json?v=${new Date().getTime()}`,
            )
                .then(async res => {
                    const data = await res.json();
                    const _versionName = data?.elements[0]?.versionName;
                    const _versionCode = data?.elements[0]?.versionCode;
                    const _outputFile = data?.elements[0]?.outputFile;
                    setNewVersion(_versionName);
                    setNewVersionCode(_versionCode);
                    setOutputFile(_outputFile);
                    if (
                        _versionName &&
                        _versionCode > APP_CURRENT_VERSION_CODE &&
                        !ignoreUpdate
                    ) {
                        setShowModal(true);
                    }
                })
                .catch(err => {
                    console.log(err, '版本信息获取失败');
                });
        }

        checkUpdate();
    }, []);

    const ignoreUpdate = () => {
        setShowModal(false);
        storage.save({key: 'ignoreUpdate', data: true});
    };

    return (
        <View style={styles.version}>
            <Text color="#aaa">当前版本: {APP_CURRENT_VERSION}</Text>
            {newVersionCode > APP_CURRENT_VERSION_CODE && (
                <TouchableNativeFeedback
                    onPress={() => {
                        setShowModal(true);
                    }}>
                    <Text color="#aaa"> | 立即升级</Text>
                </TouchableNativeFeedback>
            )}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>
                        <Text>发现新版本</Text>
                    </Modal.Header>

                    <Modal.Body>
                        <Text>当前版本{APP_CURRENT_VERSION}</Text>
                        <Text>最新版本{newVersion}</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            mr={2}
                            colorScheme="blueGray"
                            onPress={() => ignoreUpdate()}>
                            忽略本次升级
                        </Button>
                        <Button
                            onPress={() => {
                                Linking.openURL(
                                    `${httpConfig.domainScm}${APP_BUILD_PATH}/${outputFile}`,
                                );
                            }}>
                            立即升级
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    version: {
        position: 'absolute',
        width: '100%',
        display: 'flex',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
