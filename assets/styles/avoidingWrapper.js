import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'

export default function AvoidingWrapper({children}) {
  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#ffffff', borderRadius: 20}}>
        <ScrollView >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>   
  )
}