import { View, Text, TextInput } from 'react-native'
import * as React from 'react'

export default Input = ({
    label,
    placeHolder,
    keyboardType,
    setter,
    onBlur,
    value,
    groupStyle,
    labelStyle,
    textInputStyle,
    statusEditable,
    placeHolderStyle,
    secureText,
    autoCapitalize,
    additionalItem
}) => (
    <>
        <View style={groupStyle}>
            <View style={labelStyle}>
                <Text>{label ?? ''}</Text>
            </View>
            <TextInput
                autoCapitalize={autoCapitalize ?? 'sentences'}
                style={textInputStyle}
                value={value}
                editable={statusEditable ?? true}
                onChangeText={text => setter(text)}
                keyboardType={keyboardType ?? 'default'}
                placeholder={placeHolder ?? ''}
                onBlur={onBlur}
                placeholderTextColor={placeHolderStyle}
                secureTextEntry={secureText ?? false}
            />
            {additionalItem}
        </View>
    </>
);


