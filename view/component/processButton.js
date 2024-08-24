import { TouchableOpacity } from 'react-native'
import * as React from 'react'

export default ProcessButton = ({
    buttonStyle,
    statusDisabled,
    onButtonPressed,
    additionalComponent,
}) => (
    <>
    <TouchableOpacity disabled={statusDisabled} style={buttonStyle} onPress={onButtonPressed}>
        {additionalComponent}
    </TouchableOpacity>
    </>
);