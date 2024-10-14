import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DocDetails() {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Texto de exemplo
    const fullText = "Este é um exemplo de texto que contém mais de 200 caracteres. É importante garantir que o usuário possa ler todo o conteúdo, mas ao mesmo tempo queremos evitar que o texto fique muito longo e ocupe muito espaço na tela. Portanto, limitamos a exibição inicial e oferecemos a opção de expandir para ler mais.";
    
    // Limitando a 200 caracteres
    const shortText = fullText.substring(0, 200);
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {isExpanded ? fullText : `${shortText}${fullText.length > 200 ? '...' : ''}`}
            </Text>
            {fullText.length > 200 && (
                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                    <Text style={styles.readMore}>{isExpanded ? 'Ler menos' : 'Ler mais'}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    text: {
        fontSize: 16,
        lineHeight: 22,
        color: '#333',
    },
    readMore: {
        marginTop: 10,
        color: '#007BFF',
        fontWeight: 'bold',
    },
});
