import { View, Text, TextInput } from 'react-native'
import * as React from 'react'

export default Input = ({
    label,
    isPassword,
    showPassword,
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
    additionalItem,
    textLabelStyle
}) => (
    <>
        <View style={groupStyle}>
            <View style={labelStyle}>
                <Text style={textLabelStyle}>{label ?? ''}</Text>
            </View>
            {
                isPassword ? <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: "#E5E7EB", borderRadius: 5 }}>
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
                    {showPassword}
                </View> :
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
            }
            {additionalItem}

        </View>
    </>
);


