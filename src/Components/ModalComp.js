import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
const ModalComp = ({
    children,
    isVisible=false,
    onBackdropPress=()=>{},
    style={},
    ...props
}) => {
  return (
    <Modal
    isVisible={isVisible}
    onBackdropPress={onBackdropPress}
    style={{...styles.style,...style}}
    {...props}
    >
      {children}
  </Modal>
  )
}

export default ModalComp

const styles = StyleSheet.create({})