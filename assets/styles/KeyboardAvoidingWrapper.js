import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'

export default function KeyboardAvoidingWrapper({children}) {
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>
   
  )
}