import { View, Text } from 'react-native'
import * as React from 'react'
import { MultiSelect } from 'react-native-element-dropdown';
import ProcessButton from './processButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import { styles } from '../../assets/styles/style';


export default MultiSelectItem = ({
    label,
    placeHolder,
    setter,
    value,
    data,
    groupStyle,
    labelStyle,
    dropdownStyle,
    placeHolderStyle,
    searchPlaceholder
}) => (
    <>
        <View style={groupStyle}>
            <View style={labelStyle}>
                <Text>{label ?? ''}</Text>
            </View>
            <View style={dropdownStyle}>
                <MultiSelect
                    data={data}
                    search={true}
                    maxHeight={300}
                    labelField="label"
                    valueField="label"
                    placeholder={placeHolder}
                    placeholderStyle={placeHolderStyle}
                    searchPlaceholder={searchPlaceholder ?? 'Cari...'}
                    value={value}
                    onChange={setter}
                    renderSelectedItem={(item, unSelect) => (
                        <ProcessButton
                            onButtonPressed={() => unSelect && unSelect(item)}
                            additionalComponent={
                                <View style={styles.formGroupColorSelectedStyle}>
                                    <Text style={styles.textSelectedStyle}>{item.label}</Text>
                                    <AntDesign color="black" name="delete" size={17} />
                                </View>
                            }
                        />
                    )}
                />
            </View>
        </View>

    </>
);


