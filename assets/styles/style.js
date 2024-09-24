import { Dimensions, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7EB',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    brand: '#000000',
    green: '#10B981',
    red: '#EF4444',
    icon: '#1F2937',
    blue: "#1AA7EC",
    disabledBlue: '#97cce6',
    lightGrey: "#f0f0f0",
    grey: "#cacaca",
    darkGrey: "#5b5b5b",
    orange: "#e69138"
}

export const styles = StyleSheet.create({
    appBar: {
        backgroundColor: Colors.blue,
    },
    appBarContent: {
        fontSize: 14,
        color: Colors.primary
    },
    buttonAccount: {        
        marginTop: 20,
        width: '100%',
        height: 40,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonAccountText: {
        fontSize: 14,
        color: Colors.primary
    },
    buttonDelete: {
        marginTop: 20,
        height: 40,
        backgroundColor: Colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonLogout: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 20,
        // height: 40,
        // width: '30%',
        // backgroundColor:Colors.blue, 
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderRadius: 5,
    },
    buttonMulaiCSO: {
        marginTop: 20,
        height: 40,
        width: '30%',
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonSubmit: {
        marginTop: 20,
        height: 40,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonTambahItem: {
        width: 150,
        height: 40,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        // verticalAlign: 'middle',
        borderRadius: 20
    },
    buttonTambahItemText: {
        fontSize: 16,
        color: Colors.primary,
        justifyContent: 'center'
    },
    card: {
        backgroundColor: Colors.primary,
        marginBottom: 10,
        marginTop: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        shadowColor: Colors.darkLight,
        borderRadius: 15,
        width: '98%',
        elevation: 6,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
            width: 3,
            height: 3,
        }
    },
    cardDetail: {
        backgroundColor: Colors.primary,
        marginBottom: 10,
        marginTop: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingLeft: 20,
        shadowColor: Colors.darkLight,
        borderRadius: 15,
        width: '98%',
        height: 97,
        elevation: 3,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
            width: 3,
            height: 3,
        }
    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    formGroup: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.grey,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginBottom: 20,
        height: 35
    },
    formGroupColorNull: {
        flexDirection: 'row',
        marginBottom: 20,                
    },
    formGroupColorFilled: {
        flexDirection: 'row',
        marginBottom: 100,                
    },
    formGroupColorMultiSelect: {
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.grey,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,        
        width: '80%',
        paddingLeft: 15,
        height: 37,        
    },
    formGroupColorLabel: {
        backgroundColor: Colors.lightGrey,
        borderColor: Colors.grey,
        borderWidth: 1,
        borderRightColor: Colors.grey,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        flex: 1,
        height: 37
    },
    formGroupInputPassword: {
        backgroundColor: Colors.primary,       
        width: '65%',
        paddingLeft: 15,
        fontSize: 12
    },
    formGroupColorPlaceHorlder: {
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.grey,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,        
        alignItems: 'center',
        height:37
    },
    formGroupColorSelectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        height:40,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    formGroupInput: {
        backgroundColor: Colors.primary,       
        width: '80%',
        paddingLeft: 15,
        fontSize: 10
    },

    formGroupKeterangan: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.grey,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginBottom: 20,
        height: 100
    },
    formGroupLabel: {
        backgroundColor: Colors.lightGrey,
        borderRightWidth: 1,
        borderRightColor: Colors.grey,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        flex: 1,
    },
    formGroupPlaceHolderStyle: {
        color:Colors.grey
    },
    
    formKeterangan: {
        backgroundColor: Colors.primary,
        width: '80%',
        paddingLeft: 15,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        textAlignVertical: 'top'
    },
    formGroupDetailItem: {
        backgroundColor: Colors.primary,       
        width: '80%',
        paddingLeft: 15,
        fontSize: 15,
        color: Colors.brand
    },
    formGroupNamaItem: {
        backgroundColor: Colors.primary,       
        color: Colors.brand,
        width: '80%',
        paddingLeft: 15,
        fontSize: 15
    },
    formPerhitungan: {
        flexDirection: 'row',
        marginBottom: 20,
        height: 35
    },
    formPerhitunganLabel: {
        backgroundColor: Colors.lightGrey,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        flex: 1
    },
    formPerhitunganInput: {
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: '62%',
        paddingLeft: 15,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.grey,
        color: Colors.brand,
        fontSize: 15
        
    },
    formPerhitunganButton: {
        width: 60,
        backgroundColor: Colors.blue,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    formPerhitunganButtonDisabled: {
        width: 60,
        backgroundColor: Colors.disabledBlue,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    loginPicture: {
        width: 175,
        height: 225,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        width: '100%',
        height: '100%'
    },
    modalButtonClose: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    modalCalculator: {
        flexDirection: 'row',
        marginBottom: 5
    },
    modalCalculatorButtonNumber: {
        backgroundColor: Colors.darkGrey,
        width: 96,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    modalCalculatorButtonOperand: {
        backgroundColor: Colors.orange,
        width: 96,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    modalCalculatorButtonSimpan: {
        backgroundColor: Colors.blue,
        width: 96,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    modalFormGroup: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.grey,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginTop: 10,
        height: 35
    },
    modalFormGroupLabel: {
        backgroundColor: Colors.lightGrey,
        borderRightWidth: 1,
        borderRightColor: Colors.grey,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        flex: 1
    },
    modalFormGroupInput: {
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        paddingLeft: 15,
        color: Colors.brand
    },
    pageTitle: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.brand,
        padding: 10
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    styledContainer: {
        flex: 1,
        padding: 20,
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: Colors.primary,
        height: '100'
    },
    styledContainerMulaiCSO: {
        flex: 1,
        padding: 20,
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: Colors.secondary,
        padding: 15,
        borderRadius: 5,
        fontSize: 14,
        height: 60,
        color: Colors.tertiary
    },

    textInputLabel: {
        color: Colors.tertiary,
        fontSize: 14,
        textAlign: 'left',
        marginTop: 10,
        paddingBottom: 5
    },
    textInputIcon: {
        position: 'absolute',
        left: 15,
        right: 38,
        zIndex: 1,
        color: Colors.icon
    },
    textInputEyeIcon: {
        position: 'absolute',
        left: 15,
        right: 38,
        zIndex: 1,
        color: Colors.icon
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
    warningMessage: {
        textAlign: 'center',
        fontSize: 12,
        color: Colors.red
    }
});

