import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Game from './components/Game'
import Menu from './components/Menu'
import Leaderboard from './components/Leaderboard'

const MENU = 'MENU'
const GAME = 'GAME'
const LEADERBOARD = 'LEADERBOARD'

export default function App() {
    const [page, setPage] = useState(MENU)
    return (
        <View style={styles.app}>
            {page === MENU && <Menu playHandler={() => setPage(GAME)} leaderboardHandler={() => setPage(LEADERBOARD)} />}
            {page === GAME && <Game backHandler={() => setPage(MENU)} />}
            {page === LEADERBOARD && <Leaderboard backHandler={() => setPage(MENU)} />}
        </View>
    )
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
