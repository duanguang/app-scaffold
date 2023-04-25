import {extendTheme} from 'native-base';

export const customizingTheme = extendTheme({
    components: {
        Text: {
            baseStyle: {
                color: '#212324',
            },
        },
    },
    colors: {
        success: {
            50: '#d8fffe',
            100: '#abfef8',
            200: '#7cfdf2',
            300: '#4cfbed',
            400: '#1ffae8',
            500: '#05e0cf',
            600: '#00aea1',
            700: '#007e73',
            800: '#004c45',
            900: '#001b18',
        },
        warning: {
            50: '#fff7da',
            100: '#ffe6ad',
            200: '#ffd57d',
            300: '#ffc44b',
            400: '#ffb31a',
            500: '#e69a00',
            600: '#b37800',
            700: '#815500',
            800: '#4e3300',
            900: '#1e1000',
        },
        // Add new color
        primary: {
            0: '#fff',
            50: '#dbf4ff',
            100: '#addcff',
            200: '#7cc4ff',
            300: '#4aacff',
            400: '#1a94ff',
            500: '#0467BF',
            600: '#0F8FFF',
            700: '#004482',
            800: '#002951',
            900: '#000f21',
        },
        // Redefinig only one shade, rest of the color will remain same.
        // amber: {
        //     // 400: '#d97706',
        // },
    },
    config: {
        // Changing initialColorMode to 'dark'
        // initialColorMode: 'dark',
    },
});
