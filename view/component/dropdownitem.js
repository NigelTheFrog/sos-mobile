import { View, Text } from 'react-native'
import * as React from 'react'
import { Dropdown } from 'react-native-element-dropdown';

export default Dropdownitem = ({
    label,
    placeHolder,
    searchable,    
    setter,
    value,
    data,
    groupStyle,
    labelStyle,
    dropdownStyle,
    setFocus,
    placeHolderStyle,
    searchPlaceholder,
    valueField,
    onChangeSearch,
    itemStyle,
    textLabelStyle
}) => (
    <>
        <View style={groupStyle}>
          <View style={labelStyle}>
            <Text style={textLabelStyle}>{label ?? ''}</Text>
          </View>
          <Dropdown
            style={dropdownStyle}
            selectedTextStyle={itemStyle}
            data={data}
            selectedTextProps={{ numberOfLines: 1 }}
            maxHeight={300}
            labelField="label"
            valueField={valueField}
            placeholder={placeHolder}
            placeholderStyle={placeHolderStyle}
            searchPlaceholder={searchPlaceholder ?? 'Cari...'}
            value={value}
            search={searchable ?? true}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={setter}
            onChangeText={onChangeSearch}
          />
        </View>
        
    </>
);


