import { View, Text } from 'react-native';
import * as React from 'react';
import { styles } from '../../assets/styles/style';

export default function ItemList() {
    return (
        <View style={styles.styledContainerMulaiCSO}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                Harap perbarui aplikasi terlebih dahulu
            </Text>
        </View>
    )
}
