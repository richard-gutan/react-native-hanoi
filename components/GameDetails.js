import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import Button from './Button'
import formatTime from './../util/formatTime'

export default function GameDetails(props) {
    return (
        <View style={styles.gameDetailsContainer}> 
            <Text style={styles.detailsText}>Time: {formatTime(props.time)}</Text>
            <Text style={styles.detailsText}>Moves: {props.moves}</Text>
            {props.finished && <Button style={styles.button} text='Play Again' onPress={props.backHandler} />}
        </View>
    )
}

GameDetails.propTypes = {
    finished: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    moves: PropTypes.number.isRequired,
    backHandler: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    gameDetailsContainer: {
        flex: 1,
        alignItems: 'baseline',
        justifyContent: 'flex-start',
        paddingHorizontal: 16
    },
    detailsText: {
        fontSize: 20,
        fontWeight: '700'
    }, 
    button: {
        width: '100%',
        marginTop: 8
    }
})

