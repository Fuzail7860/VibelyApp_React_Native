import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WrapperContainer from '../../Components/WrapperContainer'
import HeaderComp from '../../Components/HeaderComp'

const WebView = () => {
  return (
    <WrapperContainer>
       <HeaderComp />
       <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />;
    </WrapperContainer>
  )
}

export default WebView

const styles = StyleSheet.create({})