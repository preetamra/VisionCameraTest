/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { 
  useCameraPermission,
  useCameraDevice,
  Camera,
  useFrameProcessor
} from 'react-native-vision-camera';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { scanFaces } from './TestFrameProcessorWrapper';

function App(): JSX.Element {

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('front');
  const frameProcessor = useFrameProcessor(() => {
    'worklet'
 /*    const faces = scanFaces(frame)
    console.log(`Faces in Frame: ${faces}`) */
    console.log("Frame Processor");
  }, [])

  device.formats = undefined
  console.log(JSON.stringify(device, null, 2))

  useEffect(() => {
    if(!hasPermission)
    {
      requestPermission().then((res) => {
        console.log(res);
      }).catch((e) => {
        console.log("Permission Error :- ",e);
      })
    }
  })

  return (
    hasPermission?
     <View style={{
      flex:1,
     }}>
      <Camera 
      device={device}
      isActive={true}
      style={{
        flex:1,
      }}
      frameProcessor={frameProcessor}
      />
     </View>:
     <View style={{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
     }}>
     <Text>
     Permission Denied
     </Text>
     </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
