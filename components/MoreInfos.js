import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const MoreInfos = () => {
    const infoItems = [
        { id: 1, name: 'Histórico Clínico', icon: 'stethoscope', library: FontAwesome },
        { id: 2, name: 'Arquivo', icon: 'folder1', library: AntDesign },
        { id: 3, name: 'Exames', icon: 'document-text-outline', library: Ionicons },
        { id: 4, name: 'Observações', icon: 'information-circle-outline', library: Ionicons  },
        { id: 5, name: 'Preescrições', icon: 'pill', library: MaterialCommunityIcons },
    ];

    const renderIcon = (icon, library) => {
        switch (library) {
            case FontAwesome:
                return <FontAwesome name={icon} size={24} color="#000" />;
            case AntDesign:
                return <AntDesign name={icon} size={24} color="#000" />;
            case Ionicons:
                return <Ionicons name={icon} size={24} color="#000" />;
            case MaterialCommunityIcons:
                return <MaterialCommunityIcons name={icon} size={24} color="#000" />;
            default:
                return null;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Mais informações</Text>
                {infoItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.infoButton}>
                        {renderIcon(item.icon, item.library)}
                        <Text style={styles.buttonText}>{item.name}</Text>
                        <Ionicons name="chevron-forward" size={24} color="#616B52" />
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: 50, 
    },
    container: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
    },
    title: {
        fontSize: 22,
        fontFamily: 'Poppins-Bold',
        marginBottom: 10,
    },
    infoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
    },
    buttonText: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Poppins',
        marginLeft: 10,
    },
});

export default MoreInfos;
