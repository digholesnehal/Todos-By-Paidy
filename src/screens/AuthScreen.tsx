import React, { useEffect, useState } from "react";
import {
    View,
    ActivityIndicator,
    Button,
    Alert
} from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
import TodosScreen from "./TodosScreen";
import { act } from '@testing-library/react-native';
import styles from "../styles/Authentication";

const AuthScreen = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            //On first render of the app or if not authenticated, this will be called
            handleAuthentication();
        }
    }, [isAuthenticated]);

    const handleAuthentication = () => {
        const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });

        //Shows default propt which asks to input device passcode
        rnBiometrics.simplePrompt({ promptMessage: "Authenticate with your passcode" })
            .then(result => {
                //If passcode is correct
                if (result.success) {
                    setTimeout(() => {
                        setIsAuthenticated(true);
                        setLoading(false);
                    }, 1000);
                } else {
                    //If wrong passcode entered
                    Alert.alert("Authentication Failed", "Incorrect passcode. Try again.");
                    setLoading(false);
                }
            })
            .catch(() => {
                setLoading(false);
                Alert.alert("Error", "Authentication error occurred.");;
            });
    };

    return (
        isAuthenticated ? (
            <View style={styles.appContainer} testID='todos-screen-mock'>
                <TodosScreen />
            </View>
        ) : (
            <View style={styles.authContainer}>
                {loading ? <ActivityIndicator testID='activityIndicator' size="large" color="#0000ff" />
                    : <Button title="Authenticate with Device Passcode" onPress={handleAuthentication} />
                }
            </View>
        )
    );
};

export default AuthScreen;
