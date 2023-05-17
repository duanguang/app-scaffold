import {
    Box,
    CheckCircleIcon,
    Flex,
    Modal,
    Text,
    View,
    WarningIcon,
} from 'native-base';
import {IModalProps} from 'native-base/lib/typescript/components/composites/Modal';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
interface Iprops extends IModalProps {
    /** default: 确认 */
    okText?: string;
    /** default: 取消 */
    cancelText?: string;
    /** 确认事件 */
    onOk?: () => void;
    /** 提示类型:default=warn */
    type?: 'warn' | 'error' | 'success' | 'mlsWarn';
    /** 自定义footer */
    footer?: React.ReactNode;
    /** 提示的内容 */
    content: React.ReactNode;
    /** 是否显示取消按钮 */
    isShowCancel?: boolean;
}
export const LegionsProModal = (props: Iprops) => {
    const {
        type,
        content,
        okText,
        cancelText,
        isShowCancel,
        onOk,
        footer,
        ...prop
    } = props;
    return (
        <Modal {...prop}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header
                    style={{borderBottomWidth: 0, backgroundColor: '#fff'}}
                />
                <Modal.Body
                    pb={4}
                    style={{backgroundColor: '#fff', paddingBottom: 28}}>
                    <Flex direction="row" style={{paddingHorizontal: 0}}>
                        {type !== 'success' ? (
                            type === 'mlsWarn' ? (
                                <WarningIcon
                                    size="5"
                                    color={'#0467BF'}
                                    mr="2"
                                />
                            ) : (
                                <WarningIcon
                                    size="5"
                                    color={
                                        type === 'error' ? '#FD6357' : '#FFB725'
                                    }
                                    mr="2"
                                />
                            )
                        ) : null}
                        {type === 'success' && (
                            <CheckCircleIcon
                                color="primary.500"
                                size="5"
                                mr="2"
                            />
                        )}
                        <View style={{paddingRight: 28}}>
                            {Array.isArray(content) ? (
                                content.map((cont, index) => (
                                    <Text
                                        flex={1}
                                        key={index}
                                        color="#5D5F65"
                                        fontSize={15}>
                                        {cont}
                                    </Text>
                                ))
                            ) : (
                                <Text flex={1} color="#5D5F65" fontSize={15}>
                                    {content}
                                </Text>
                            )}
                        </View>
                    </Flex>
                </Modal.Body>
                <Modal.Footer
                    padding={0}
                    h={55}
                    style={{
                        backgroundColor: '#fff',
                        borderTopWidth: 0.5,
                        borderTopColor: '#D8D8D8',
                    }}>
                    {props.footer === undefined && (
                        <Flex
                            style={hlModalStyles.mlsFooterWrap}
                            direction="row">
                            {isShowCancel !== false && [
                                <TouchableOpacity
                                    key="cancelBtn"
                                    style={{
                                        flex: 1,
                                    }}
                                    onPress={() => {
                                        props.onClose && props.onClose();
                                    }}>
                                    <Text
                                        textAlign="center"
                                        color="#5D5F65"
                                        fontSize={16}>
                                        {props.cancelText || '取消'}
                                    </Text>
                                </TouchableOpacity>,
                                <View
                                    key="line"
                                    w={'1px'}
                                    backgroundColor={'#D8D8D8'}
                                    h="100%"
                                />,
                            ]}
                            <TouchableOpacity
                                style={{flex: 1}}
                                onPress={() => {
                                    onOk
                                        ? onOk()
                                        : props.onClose && props.onClose();
                                }}>
                                <Text
                                    textAlign="center"
                                    color="#0F8FFF"
                                    fontSize={16}>
                                    {props.okText || '确认'}
                                </Text>
                            </TouchableOpacity>
                        </Flex>
                    )}
                    {props.footer !== undefined && props.footer}
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};
const hlModalStyles = StyleSheet.create({
    defaultFooterWrap: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    mlsFooterWrap: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#D8D8D8',
    },
});
