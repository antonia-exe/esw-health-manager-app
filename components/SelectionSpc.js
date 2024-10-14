import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CustomDropdown() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Cardiologia', value: 'item1' },
        { label: 'Dermatologia', value: 'item2' },
        { label: 'Geral', value: 'item3' },
        { label: 'Homeopatia', value: 'item4' },
        { label: 'Infectologia', value: 'item5' },
        { label: 'Neurologia', value: 'item6' },
        { label: 'Oftalmologia', value: 'item7' },
        { label: 'Oncologia', value: 'item8' },
        { label: 'Ortopedia', value: 'item9' },
        { label: 'Pediatria', value: 'item10' },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Qual a especialidade desejada?</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Escolha uma especialidade"
                containerStyle={{ height: 40 }} 
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                placeholderStyle={styles.placeholderStyle} // estilo do placeholder
                labelStyle={styles.labelStyle} // estilo do texto selecionado
                // Adicione essa propriedade para o estilo do texto de cada item
                itemLabelStyle={styles.itemLabelStyle} // estilo do texto dos itens
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        textAlign: 'left',
        fontFamily: 'Poppins-SemiBold',
    },
    dropdown: {
        backgroundColor: '#fafafa',
        borderColor: '#616B52',
        borderWidth: 1,
        borderRadius: 10,
    },
    dropdownContainer: {
        backgroundColor: '#fafafa',
        borderColor: '#616B52',
        borderWidth: 1,
        borderRadius: 10,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#8C8C8C', // cor do texto do placeholder
        fontFamily: 'Poppins-Regular', // define a fonte para o placeholder
    },
    labelStyle: {
        fontSize: 16,
        color: '#000', // cor do texto selecionado
        fontFamily: 'Poppins-SemiBold', // define a fonte para o texto selecionado
    },
    itemLabelStyle: {
        fontSize: 16, // define o tamanho da fonte dos itens
        color: '#000', // cor do texto dos itens
        fontFamily: 'Poppins', // define a fonte para os itens
    },
});
