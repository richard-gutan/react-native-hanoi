import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Button from './Button'

export default function NamePrompt(props) {
    const [name, setName] = useState('')
    return (
        <View style={styles.namePromptContainer}>
            <TextInput 
                style={styles.textInput} 
                value={name} 
                onChangeText={text => setName(text)} 
                placeholder='Player Name' 
            />
            <Button text='Start' onPress={() => {
                if (name) {
                    props.nameChangeHandler(name)
                }
            }} />
        </View>
    )
}

NamePrompt.propTypes = {
    nameChangeHandler: PropTypes.func
}

NamePrompt.defaultProps = {
    nameChangeHandler: () => {}
}

const styles = StyleSheet.create({
    namePromptContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start'
    },
    textInput: {
        borderBottomWidth: 3,
        width: '100%',
        height: 50,
        fontSize: 14,
        marginBottom: 24
    }
})