import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
    ScrollView,
    StatusBar,
    Text,
    Pressable,
    View
} from 'react-native';
import styles from '../styles/Authentication.tsx';

import { Colors } from 'react-native/Libraries/NewAppScreen';
// import * as LocalAuthentication from 'expo-local-authentication';



function AuthScreen(): React.JSX.Element {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [fingerprint, setFingerprint] = useState(false);

    useEffect(() => {
        // (async () => {
        //     const compatible = false;
        //     setIsBiometricSupported(compatible);
        //     const enroll = await LocalAuthentication.isEnrolledAsync();
        //     if (enroll) {
        //         setFingerprint(true);
        //     }
        // })();
    }, []);

    const handle = async () => {
        // try {
        //     const biometricAuth = await LocalAuthentication.authenticateAsync({
        //         promptMessage: "Login with Biometrics",
        //         disableDeviceFallback: true,
        //         cancelLabel: "Cancel",
        //     });
        //     if (biometricAuth.success) {
        //         // navigation.replace("Home");
        //         console.log("BIOMETRIC SUCCESS")
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };



    return (
        <View style={{ height: '100%' }}>
            {isBiometricSupported && fingerprint ? (
                <Pressable style={styles.button} onPress={() => handle()}>
                    <Text style={styles.buttonText}>GO TO HOME</Text>
                </Pressable>) : (
                <View>
                    <Text>fingerprint not supported/ allocated</Text>
                </View>
            )}

        </View>
    );
}

export default AuthScreen;
