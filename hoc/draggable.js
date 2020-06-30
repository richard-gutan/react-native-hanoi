import React, { Component } from 'react'
import {
    PanResponder,
    Animated
} from 'react-native'

export default function draggable(WrappedComponent) {
    return class extends Component {
       
        pan = new Animated.ValueXY()

        panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                this.pan.setOffset({
                    x: this.pan.x._value,
                    y: this.pan.y._value
                })
            },
            onPanResponderMove: Animated.event([
                null,
                { dx: this.pan.x, dy: this.pan.y }
            ], { useNativeDriver: false }),
            onPanResponderRelease: this.props.handleDrag
        })
        
        render () {
            const { style, ...props } = this.props
            return (
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[{ transform: [{translateX: this.pan.x}, {translateY: this.pan.y}] }, style]}
                >
                    <WrappedComponent {...props} />
                </Animated.View>
            )
        }
    }
}