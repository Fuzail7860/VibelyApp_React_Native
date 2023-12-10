import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import { Image, StyleSheet } from 'react-native';
import * as Screens from '../Screens'

import imagePath from '../constants/imagePath';

import navigationStrings from './navigationStrings';

const BottomTab = createBottomTabNavigator();

const TabRoutes = (props) => {
    return (
        <BottomTab.Navigator
            tabBar={(tabsProps) => (
                <>
                    <BottomTabBar {...tabsProps} />
                </>
            )}
            initialRouteName={navigationStrings.HOME}

            screenOptions={{
                headerShown: false,
                style: styles.customBottomtabsStyle,
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: '#fff',
                tabBarShowLabel: false,
                tabBarStyle:{backgroundColor:colors.themeColor}
            }}

        >
            <BottomTab.Screen
                name={navigationStrings.HOME}
                component={Screens.Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            focused ?
                                <Image source={imagePath.firstActiveIcon}  style={[styles.tabIcon,{tintColor:'red'}]}/>
                                : <Image source={imagePath.firstInActiveIcon}  style={styles.tabIcon}/>
                        );
                    },
                }}
            />
            <BottomTab.Screen
                name={navigationStrings.SEARCH}
                component={Screens.Search}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            focused ?
                                <Image source={imagePath.secondActiveIcon} style={[styles.tabIcon,{tintColor:'red'}]} />
                                : <Image source={imagePath.secondInActiveIcon}  style={styles.tabIcon}/>
                        );
                    },
                }}
            />
            <BottomTab.Screen
                name={navigationStrings.CREATE_POST}
                component={Screens.CreatePost}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            focused ?
                                <Image source={imagePath.thirdActiveIcon} style={[styles.tabIcon,{tintColor:'red'}]}/>
                                : <Image source={imagePath.thirdInActiveIcon} style={styles.tabIcon} />
                        );
                    },
                    unmountOnBlur:true
                }}
            />
            <BottomTab.Screen
                name={navigationStrings.NOTIFICATION}
                component={Screens.Notification}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            focused ?
                                <Image source={imagePath.fourthActiveIcon}  style={[styles.tabIcon,{tintColor:'red'}]}/>
                                : <Image source={imagePath.fourthInActiveIcon}  style={styles.tabIcon}/>
                        );
                    },
                }}
            />
            <BottomTab.Screen
                name={navigationStrings.PROFILE}
                component={Screens.Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            focused ?
                                <Image source={imagePath.fifthActiveIcon}  style={[styles.tabIcon,{tintColor:'red'}]}/>
                                : <Image source={imagePath.fifthInActiveIcon} style={styles.tabIcon} />
                        );
                    },
                }}
            />

        </BottomTab.Navigator>
    );
};

const styles = StyleSheet.create({
    customBottomtabsStyle: {
        //height: moderateScale(60)
    },

    tabIcon:{
        height:20,
        width:20,
        tintColor:'#fff'
    }

});

export default TabRoutes