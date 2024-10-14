import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

export default function CustomDropdown({ onSelectSpecialty }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const fetchSpecialties = async () => {
        try {
            const response = await axios.get('http://10.0.0.40:3001/especialidades');
            const specialties = response.data;
            const formattedItems = specialties.map(specialty => ({
                label: specialty.especialidade,
                value: specialty.especialidade,
            }));
            setItems(formattedItems);
        } catch (error) {
            console.error("Erro ao buscar especialidades:", error);
        }
    };

    useEffect(() => {
        fetchSpecialties();
    }, []);

    const handleSelect = (value) => {
        setValue(value);
        onSelectSpecialty(value); 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Qual a especialidade desejada?</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={handleSelect} // Atualizado
                setItems={setItems}
                placeholder="Escolha uma especialidade"
                containerStyle={{ height: 40 }} 
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                placeholderStyle={styles.placeholderStyle}
                labelStyle={styles.labelStyle}
                itemLabelStyle={styles.itemLabelStyle}
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
        color: '#8C8C8C',
        fontFamily: 'Poppins-Regular',
    },
    labelStyle: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Poppins-SemiBold',
    },
    itemLabelStyle: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Poppins-Regular',
    },
});
