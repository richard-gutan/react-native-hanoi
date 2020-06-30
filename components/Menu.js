import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text } from 'react-native'
import Button from './Button'

export default function Menu(props) {
    return (
        <View style={styles.menu}>
            <Text style={styles.title}>Tower of Hanoi</Text>
            <Text style={styles.subtitle}>Game Rules</Text>

            <View style={styles.listWrapper}>
                <Text style={styles.listText}>1. Only one disk can be moved at a time.</Text>
                <Text style={styles.listText}>2. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod.</Text>
                <Text style={styles.listText}>3. No larger disk may be placed on top of a smaller disk.</Text>
            </View>
            
            <Button text='Play' onPress={props.playHandler} style={{ width: '100%', marginBottom: 16 }} />
            <Button text='Leaderboard' onPress={props.leaderboardHandler} style={{ width: '100%' }} />
        </View>
    )
}

Menu.propTypes = {
    playHandler: PropTypes.func.isRequired,
    leaderboardHandler: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    menu: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 24
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    listText: {
        marginBottom: 8
    },
    listWrapper: {
        marginBottom: 24
    }
})