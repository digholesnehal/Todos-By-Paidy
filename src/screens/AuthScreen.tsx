import React, { useEffect, useState } from "react";
import {
    View,
    ActivityIndicator,
    Button,
    Alert
} from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
import TodosScreen from "./TodosScreen";

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
                if (result.success) {
                    setTimeout(() => {
                        setIsAuthenticated(true);
                        setLoading(false);
                    }, 1000); // Small delay to smooth transition
                } else {
                    Alert.alert("Authentication Failed", "Incorrect passcode. Try again.");
                }
            })
            .catch(() => {
                setLoading(false);
                Alert.alert("Error", "Authentication error occurred.");
            });
    };

    return (
        isAuthenticated ? (
            <TodosScreen />
        ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                {!loading && (
                    <Button title="Authenticate with Device Passcode" onPress={handleAuthentication} />
                )}
            </View>
        )
    );
};

export default AuthScreen;
