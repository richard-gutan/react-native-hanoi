import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import HeaderBar from './HeaderBar'
import formatTime from './../util/formatTime'

export default class Leaderboard extends Component {
    constructor(props) {
        super(props) 
        
        this.state = {
            leaderboard: []
        }
    }

    async componentDidMount() {
        let leaderboard = await SecureStore.getItemAsync('leaderboard')
        if (leaderboard) {
            this.setState({ leaderboard: JSON.parse(leaderboard) })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderBar backHandler={this.props.backHandler} title='LEADERBOARD' />
                <View style={styles.row} >
                    <Text style={[styles.text, { fontWeight: '700' }]} >Player Name</Text>
                    <Text style={[styles.text, { textAlign: 'right', fontWeight: '700' }]} >Moves</Text>
                    <Text style={[styles.text, { textAlign: 'right', fontWeight: '700' }]} >Time</Text>
                </View>
                {[...this.state.leaderboard].sort((a, b) => {
                    if (a.time > b.time) {
                        return 1
                    } 
                    return -1
                }).map(entry => (
                    <View key={entry.name} style={styles.row} >
                        <Text style={styles.text} >{entry.name}</Text>
                        <Text style={[styles.text, { textAlign: 'right' }]} >{entry.moves}</Text>
                        <Text style={[styles.text, { textAlign: 'right' }]} >{formatTime(entry.time)}</Text>
                    </View>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 16
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomWidth: 1
    }, 
    text: {
        flex: 1
    }
})