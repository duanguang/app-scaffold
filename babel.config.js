module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ['@babel/plugin-proposal-decorators',{ legacy: true }],
        [
            'babel-plugin-inline-import',
            {
                extensions: ['.svg'],
            },
        ],
        ["import",{ libraryName: "@ant-design/react-native" }],
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: ['.ios.js','.android.js','.js','.ts','.tsx','.json'],
                alias: {
                    '@': ['./src']
                }
            }
        ]
    ],
};
