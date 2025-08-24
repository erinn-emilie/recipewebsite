import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'


const styles = StyleSheet.create({
    page: {
        backgroundColor: "#fbf2c4"
    },
    ingredients: {
        backgroundColor: "#e5c185"
    },
    instructions: {
        backgroundColor: "#e5c185"
    },
    information: {
        backgroundColor: "#e5c185"
    }
})

const RecipeDocument = (props) => {
    return (
        <Document>
            <Page size="A4" styles={styles.page}>
                <View styles={styles.ingredients}>
                    <Text>Ingredients</Text>
                    {
                        props.data.ingredients.map((ingredient) => (
                            <Text>{ingredient}</Text>
                        ))
                    }
                </View>
                <View styles={styles.ingredients}>
                    <Text>Instructions</Text>
                    {
                        props.data.instructions.map((step, number) => (
                            <Text>{number+1}. {step}</Text>
                        ))
                    }
                </View>
                <View styles={styles.ingredients}>
                    <Text>Information</Text>
                    <Text>Author: {props.data.author}</Text>
                    <Text>Cuisuine Style: {props.data.cuisine}</Text>
                    <Text>Category: {props.data.category}</Text>
                </View>
            </Page>
        </Document>
    )
}

export default RecipeDocument