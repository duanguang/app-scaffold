import React from 'react';
import {SvgXml} from 'react-native-svg';

interface IProps {
    xml: string | null;
    width: number;
    height: number;
}

export const LegionsProSvg = ({xml, width, height}: IProps) => {
    return (
        <SvgXml fillRule="nonzero" width={width} height={height} xml={xml} />
    );
};
