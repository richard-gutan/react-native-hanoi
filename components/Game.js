import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import Rod from './Rod'
import NamePrompt from './NamePrompt'
import HeaderBar from './HeaderBar'
import GameDetails from './GameDetails'

const MINIMUM_MOVES = 7
const INITIAL_STATE =  {
    rod1: [
        { key: 1, style: { width:'33%' } },
        { key: 2, style: { width:'66%' } },
        { key: 3, style: { width:'100%' } }
    ],
    rod2: [],
    rod3: [],
    moves: 0,
    finished: false,
    playerName: '',
    time: 0,
    discMoved: false
}

export default class Game extends Component {
    constructor(props) {
        super(props)

        this.interval = null
        this.state = INITIAL_STATE
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    handleDrag = (e, gesture) => {
        this.moveDisc(gesture)
    }

    moveDisc({ moveX, x0 }) {
        const fromRod = this.getDropArea(x0)
        const toRod = this.getDropArea(moveX)
        const newState = JSON.parse(JSON.stringify(this.state))

        if (this.state[toRod].length === 0 || this.state[toRod][0].key > this.state[fromRod][0].key) {
            const disc = newState[fromRod].shift()
            newState[toRod].unshift(disc)
            newState.moves += 1
            if (newState.moves >= MINIMUM_MOVES) {
                if (newState.rod2.length === 3 || newState.rod3.length === 3) {
                    newState.finished = true
                    clearInterval(this.interval)
                    this.storeData()
                }
            }
        } else {
            const disc = newState[fromRod].shift()
            newState[fromRod].unshift(disc)
        }
        newState.discMoved = true
        this.setState(newState)
    }

    getDropArea(position) {
        if (position < 141) {
            return 'rod1'
        } else if (position < 278) {
            return 'rod2'
        } 
        return 'rod3'
    }

    onChangeName = name => {
        this.setState({ playerName: name })
        this.startInterval()
    }

    startInterval() {
        this.interval = setInterval(() => {
            this.setState(state => ({
                time: state.time + 10,
                discMoved: false
            }))
        }, 10)
    }

    async storeData() {
        let leaderboard = await SecureStore.getItemAsync('leaderboard')

        if (!leaderboard) {
            leaderboard = []
            leaderboard.push({
                name: this.state.playerName,
                time: this.state.time,
                moves: this.state.moves
            })
        } else {
            leaderboard = JSON.parse(leaderboard)
            const existingPlayer = leaderboard.find(player => player.name === this.state.playerName)
            if (existingPlayer) {
                existingPlayer.time = this.state.time
                existingPlayer.moves = this.state.moves
            } else {
                leaderboard.push({
                    name: this.state.playerName,
                    time: this.state.time,
                    moves: this.state.moves
                })
            }
        }

        SecureStore.setItemAsync('leaderboard', JSON.stringify(leaderboard))
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <HeaderBar backHandler={this.props.backHandler} title={this.state.playerName || 'ENTER UNIQUE PLAYER NAME'} />

                {this.state.playerName ? (
                    <>
                        <GameDetails 
                            finished={this.state.finished} 
                            moves={this.state.moves} 
                            time={this.state.time}
                            backHandler={this.props.backHandler}
                        />
                
                        <View style={styles.gameContainer}>
                            <Rod discMoved={this.state.discMoved} discs={this.state.rod1} handleDrag={this.handleDrag} />
                            <Rod discMoved={this.state.discMoved} discs={this.state.rod2} handleDrag={this.handleDrag} />
                            <Rod discMoved={this.state.discMoved} discs={this.state.rod3} handleDrag={this.handleDrag} />
                        </View>
                    </>
                ) : (
                    <NamePrompt nameChangeHandler={this.onChangeName} />
                )}
            </View>
        )
    }
}




const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 16
    },
    gameContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
})