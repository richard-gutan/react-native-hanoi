import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import draggable from '../hoc/draggable'

export default class Rod extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.discMoved) {
            return true
        }
        return false
    }

    render() {
        return (
            <View style={styles.rod}>
                <Bar />
                <DiscWrapper>
                    {this.props.discs.map((disc, index) => (
                        <Disc 
                            {...disc} 
                            handleDrag={this.props.handleDrag} 
                            draggable={index === 0} 
                        />
                    ))}
                </DiscWrapper>
            </View>
        )
    }
}

function Bar() {
    return (
        <View style={styles.bar}></View>
    )
}

function DiscWrapper(props) {
    return (
        <View style={styles.discWrapper}>{props.children}</View>
    )
}

function Disc(props) {
    const DiscComponent = props.draggable ? draggable(View) : View
    const { style, ...restProps } = props 
    return (  
        <DiscComponent style={{ ...styles.disc, ...style }} { ...restProps} />
    )
}



const styles = StyleSheet.create({
    rod: {
        flex: 1,
        alignItems: 'center',
        margin: 4
    },
    bar: {
        width: 12,
        height: 250,
        backgroundColor: 'white',
        borderWidth: 3
    },
    discWrapper: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center'
    },
    disc: {
        height: 50,
        borderWidth: 3,
        backgroundColor: 'white',
        marginBottom: 1,
        zIndex: 99
    }
})