import {
    Text,
    View,
    Button,
    Platform,
    StatusBar,
    ScrollView,
    FlatList,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    NativeModules,
    useColorScheme,
    TouchableOpacity,
    NativeEventEmitter,
    PermissionsAndroid,
    Alert,
    Modal,
    ActivityIndicator,
  } from 'react-native';
  import React from 'react'
  import { styles } from '../constants/styles'
  import { Colors } from 'react-native/Libraries/NewAppScreen';
  
  const Loader = (props) => {
  
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    return (
      <SafeAreaView style={[backgroundStyle, styles.container]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View>
          <Modal transparent={true} animationType='none' visible={props.visible} statusBarTranslucent={false}>
            <View style={loaderStyles.modalBackground}>
              <View style={loaderStyles.activityIndicatorWrapper}>
                <ActivityIndicator size="large" animating={props.visible}/>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    )
  }
  const windowHeight = Dimensions.get('window').height;
  const loaderStyles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });
  export default Loader