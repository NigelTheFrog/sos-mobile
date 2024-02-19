import { View, Text, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { styles } from '../../assets/styles/style';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';




export default function Item() {
  const [selected, setSelected] = React.useState("");
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  const data = [
    { label: 'Apple', value: '1' },
    { label: 'Banana', value: '2' },
    { label: 'Orange', value: '3' },
    { label: 'Pear', value: '4' },
    { label: 'Watermelon', value: '5' },
    { label: 'Grapes', value: '6' },
    { label: 'Blueberry', value: '7' },
  ];
  return (
    <View style={styles.styledContainer}>
      <View style={styles.formGroup}>
        <View style={styles.formGroupLabel}>
          <Text>Item</Text>
        </View>
        <View style={styles.formGroupInput}>
          <Dropdown
            style={styles.formGroupInput}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'--Pilih Item--'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }} />
          {/* <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    /> */}
          {/* <SelectList data={data} setSelected={setSelected} />   */}
          {/* </View>          */}
        </View>
        <TouchableOpacity style={styles.buttonSubmit}>
          <Text style={styles.buttonAccountText}><Ionicons name="save-sharp" size={20} color="white" />   Simpan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDelete}>
          <Text style={styles.buttonAccountText}><Ionicons name="trash" size={20} color="white" />   Hapus</Text>
        </TouchableOpacity>
      </View>
      )
}</>);
}
