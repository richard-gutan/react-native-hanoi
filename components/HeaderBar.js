import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import BackButtonImg from './../assets/back.png'

export default function HeaderBar(props) {
    return (
        <View style={styles.topNavigation}>
            <TouchableOpacity onPress={props.backHandler}>
                <Image source={BackButtonImg} style={styles.backButton} />
            </TouchableOpacity>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

HeaderBar.propTypes = {
    backHandler: PropTypes.func,
    title: PropTypes.string
}

HeaderBar.defaultProps = {
    backHandler: () => {},
    title: ''
}

const styles = StyleSheet.create({
    topNavigation: {
        flexDirection: 'row',
        marginTop: 50,
        height: 50,
    },
    backButton: {
        height: 25,
        width: 25
    },
    text: {
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20
    }
})

