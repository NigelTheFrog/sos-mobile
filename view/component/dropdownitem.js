import { View, Text } from 'react-native'
import * as React from 'react'
import { Dropdown } from 'react-native-element-dropdown';

export default Dropdownitem = ({
    label,
    placeHolder,
    setter,
    value,
    data,
    groupStyle,
    labelStyle,
    dropdownStyle,
    setFocus,
    placeHolderStyle,
    searchPlaceholder,
    valueField
}) => (
    <>
        <View style={groupStyle}>
          <View style={labelStyle}>
            <Text>{label ?? ''}</Text>
          </View>
          <Dropdown
            style={dropdownStyle}
            data={data}
            selectedTextProps={{ numberOfLines: 1 }}
            maxHeight={300}
            labelField="label"
            valueField={valueField}
            placeholder={placeHolder}
            placeholderStyle={placeHolderStyle}
            searchPlaceholder={searchPlaceholder ?? 'Cari...'}
            value={value}
            search={true}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={setter}
          />
        </View>
        
    </>
);


