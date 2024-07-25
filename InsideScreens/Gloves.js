import React, { useEffect, useState } from 'react';
import { Text, View, StatusBar, SafeAreaView, useColorScheme } from 'react-native';
import { styles } from '../constants/styles';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import BlSerial from 'react-native-bluetooth-serial';

const Gloves = ({ route }) => {
  // const { id, name } = route.params.data;
  const [unilateralLeft, setUnilateralLeft] = useState("");
  const [unilateralRight, setUnilateralRight] = useState("");
  const [bilateralRight, setBilateralRight] = useState("");
  const [bilateralLeft, setBilateralLeft] = useState("");
  const [incisors, setIncisors] = useState("");
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const delimiter = '\n'; // Define your delimiter here
  let buffer = ''; // Buffer to accumulate data

  const onLoad = async () => {
    let isMounted = true; // Flag to handle component unmounting

    while (isMounted) {
      const result = await BlSerial.readFromDevice();
      if (result !== "" && result !== "0") { // Skip if result is empty or zero
        buffer += result; // Accumulate data into the buffer

        let delimiterIndex;
        while ((delimiterIndex = buffer.indexOf(delimiter)) !== -1) {
          const completeData = buffer.substring(0, delimiterIndex); // Extract complete data
          buffer = buffer.substring(delimiterIndex + 1); // Remove the processed data from the buffer

          if (completeData !== "") {
            console.log("Result: ", completeData);
            const [mode, force] = completeData.split(': ');
            const parsedForce = parseFloat(force);
            if (mode === "Unilateral Left") {
              setUnilateralLeft(prev => prev ? `${prev}, ${parsedForce}` : `${parsedForce}`);
            }
            if (mode === "Unilateral Right") {
              setUnilateralRight(prev => prev ? `${prev}, ${parsedForce}` : `${parsedForce}`);
            }
            if (mode === "Bilateral Left") {
              setBilateralLeft(prev => prev ? `${prev}, ${parsedForce}` : `${parsedForce}`);
            }
            if (mode === "Bilateral Right") {
              setBilateralRight(prev => prev ? `${prev}, ${parsedForce}` : `${parsedForce}`);
            }
            if (mode === "Incisors") {
              setIncisors(prev => prev ? `${prev}, ${parsedForce}` : `${parsedForce}`);
            }
          }
        }
      }
    }

    return () => { isMounted = false; }; // Cleanup function to handle unmounting
  };

  useEffect(() => {
    // console.log(id, "on gloves page");
    const cleanup = onLoad();
    return cleanup;
  }, []);

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        <Text style={{ color: isDarkMode ? Colors.white : Colors.black }}>BiteForce</Text>
        <View>
          <Text style={{ color: isDarkMode ? Colors.white : Colors.black }}>
            Unilateral Left: {unilateralLeft}
          </Text>
        </View>
        <View>
          <Text style={{ color: isDarkMode ? Colors.white : Colors.black }}>
            Unilateral Right: {unilateralRight}
          </Text>
        </View>
        <View>
          <Text style={{ color: isDarkMode ? Colors.white : Colors.black }}>
            Bilateral Left: {bilateralLeft}
          </Text>
        </View>
        <View>
          <Text style={{ color: isDarkMode ? Colors.white : Colors.black }}>
            Bilateral Right: {bilateralRight}
          </Text>
        </View>
        <View>
          <Text style={{ color: isDarkMode ? Colors.white : Colors.black }}>
            Incisors: {incisors}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Gloves;

