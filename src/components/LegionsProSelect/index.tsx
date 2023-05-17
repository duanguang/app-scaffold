import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ChevronDownIcon} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import {Select as NbSelect} from 'native-base';

interface ISelectProps {
    value?: string;
    onValueChange?: (value: any) => void;
    items: Array<{label: string; value: any}>;
    placeholder?: {label: string; value: unknown};
    renderDev?: 'mls' | null;
    textInputStyle?: any;
    renderIcon?: React.ReactNode;
    style?: any;
}

export function LegionsProSelect({
    value: propsValue,
    onValueChange,
    items,
    placeholder = {label: '请选择', value: null},
    renderDev,
    textInputStyle,
    renderIcon,
    style,
}: ISelectProps) {
    const [value, setValue] = React.useState(propsValue);
    const setSelectedValue = (value: any) => {
        if (onValueChange) {
            onValueChange(value);
            return;
        }

        setValue(value);
    };
    return (
        <RNPickerSelect
            value={value}
            placeholder={placeholder}
            onValueChange={setSelectedValue}
            items={items || []}
            useNativeAndroidPickerStyle={false}
            //@ts-ignore
            textInputProps={
                renderDev === 'mls'
                    ? textInputStyle
                    : {...pickerSelectStyles.inputAndroid, ...style}
            }
            // style={selectStyles}
            Icon={() =>
                renderIcon || (
                    <View style={{top: 5, right: 3}}>
                        <ChevronDownIcon size="5" />
                    </View>
                )
            }
        />
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 12,
        paddingHorizontal: 10,
        paddingVertical: 1,
        marginHorizontal: 3,
        borderWidth: 0.5,
        borderColor: '#5D5F65',
        borderRadius: 5,
        color: '#5D5F65',
        paddingRight: 30, // to ensure the text is never behind the icon
        overflow: 'hidden',
    },
});
