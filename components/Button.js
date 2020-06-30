import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function Button(props) {
    return (
        <TouchableOpacity 
            style={[styles.button, props.style]}
            onPress={props.onPress}
        >
            <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

Button.propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string
}

Button.defaultProps = {
    onPress: () => {},
    text: ''
}

const styles = StyleSheet.create({
    button: {
        padding: 16,
        borderWidth: 3,
        borderRadius: 4,
        alignItems: 'center'
    },
    buttonText: {
        textTransform: 'uppercase',
        fontWeight: "700",
        fontSize: 16
    }
})