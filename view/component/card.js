import { View, Text } from 'react-native';
import { styles } from "../../assets/styles/style";
import ProcessButton from "./processButton";
import Ionicons from '@expo/vector-icons/Ionicons';

export default Card = ({
    data,
    navigation,
    type,
    userType,
    trsid,
    csoid,
    coy // 0 = pelaku, 1 = analisator
}) => (    
    <>
        <View style={styles.cardContainer}>
            {
                data.length > 0 ? data.map((item) =>                     
                    <ProcessButton
                        buttonStyle={[styles.card, { backgroundColor: item.csocount == 1 ? '#b7e1cd' : item.csocount == 2 ? '#fce8b2' : '#f4c7c3' }]}
                        onButtonPressed={() => navigation.navigate(type == 'R' ? "DetailItem" : "DetailAvalan", {
                            csoid: csoid,
                            csodetid: item.csodetid,
                            csodet2id: item.csodet2id,
                            color: item.color == null ? [] : item.color.split(','),
                            location: item.locationid,
                            itemid: item.itemid,
                            itembatchid: item.itembatchid,
                            itemname: item.itemname,
                            remark: item.remark,
                            qty: item.qty == null ? item.qty : item.qty.toString(),
                            historylist: item.history == null ? '' : item.history,
                            inputlist: item.inputs == null ? [] : item.inputs.split(','),
                            statusitem: item.statusitem,
                            statussubmit: item.statussubmit,
                            statushslcso: item.statushslcso,
                            gradeid: Number.parseInt(item.grade),
                            trsid: trsid,
                            trsdet: item.trsdetid,
                            tonase: coy == 'KKS' ? item.tonase : null,
                            qty_pengali: item.qty_pengali, 
                            pengali: item.pengali
                        })}
                        additionalComponent={
                            userType == 0 ?
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', width: '70%' }}>
                                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>CSO {item.csocount}</Text>
                                        {
                                            item.statusitem == "R" ?
                                                <Text style={{ marginBottom: 5 }}>{item.itemname}</Text> :
                                                <Text style={{ marginBottom: 5 }}>{item.itemname} - {item.batchno}</Text>
                                        }
                                        {
                                            item.statussubmit == "P" ?
                                                <Text style={{ color: "green" }}>
                                                    <Ionicons name="checkmark" size={15} color="green" /> Terlapor
                                                </Text>
                                                :
                                                <Text style={{ color: "red" }}>
                                                    <Ionicons name="close-outline" size={15} color="red" /> Belum Terlapor
                                                </Text>
                                        }
                                        {
                                            item.keterangan ?
                                            item.keterangan.split(',').map(element => 
                                                <Text style={{ color: "#d98a02" }}>
                                                    <Ionicons name="information" size={15} color="#d98a02" /> {element}
                                                </Text>
                                            )                                                
                                                :
                                                null
                                        }
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', width: '25%', marginLeft: 5 }}>
                                        <Text style={{ textAlign: 'left' }}>{item.locationname}</Text>
                                        <Text style={{ fontWeight: 'bold' }}>{item.qty} {item.uom}</Text>
                                    </View>
                                </View>
                                :
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', width: '75%' }}>
                                        {
                                            item.statusitem == "R" ?
                                                <Text style={{ marginBottom: 3, fontWeight: 'bold' }}>{item.itemname}</Text> :
                                                <Text style={{ marginBottom: 3, fontWeight: 'bold' }}>{item.itemname} - {item.batchno}</Text>
                                        }
                                        <View style={{ flexDirection: 'row', marginBottom: 3, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                                <Text>On Hand: {item.onhand}</Text>
                                                <Text>Qty: {Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.qty)}</Text>
                                                <Text>Selisih: {Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((item.onhand + (item.koreksi ?? 0) + (item.deviasi ?? 0)) - item.qty)}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                                <Text>Koreksi: {item.koreksi}</Text>
                                                <Text>Deviasi: {item.deviasi}</Text>
                                            </View>

                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 3, flexWrap: 'wrap', justifyContent: 'space-between' }}>

                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold' }}>CSO {item.csocount}</Text>
                                        <Text style={{ fontWeight: 'bold' }}>{item.groupdesc}</Text>
                                    </View>
                                </View>
                        }
                    />
                ) :
                    <View style={styles.styledContainerMulaiCSO}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                            Belum ada item CSO, silahkan tambah item terlebih dahulu
                        </Text>
                    </View>
            }
        </View>
    </>
)