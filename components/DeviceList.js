
/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, useColorScheme, SafeAreaViewBase, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react';
import { styles } from '../constants/styles';
import Loader from '../Modals/Loader';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export const DeviceList = ({ peripheral, btnFunc, con }) => {
    const { name, connect } = peripheral;
    const navigation = useNavigation()
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };


    return (
        <>
            {name && (
                <SafeAreaView style={[backgroundStyle, styles.container]}>
                    <StatusBar
                        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                        backgroundColor={backgroundStyle.backgroundColor}
                    />
                    <View style={styles.deviceContainer}>
                        <View style={styles.deviceItem}>
                            <Text style={[styles.deviceName, { color: isDarkMode ? Colors.white : Colors.black }]}>{name}</Text>
                            <Text style={styles.deviceInfo}>class: {peripheral.class}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={async () => {
                                await btnFunc(peripheral)
                            }
                            }
                            style={styles.deviceButton}>
                            <Text
                                style={[
                                    styles.scanButtonText,
                                    { fontWeight: 'bold', fontSize: 14 },
                                ]}>
                                {con ? 'Disconnect' : 'Connect'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            )}
        </>
    );
};
