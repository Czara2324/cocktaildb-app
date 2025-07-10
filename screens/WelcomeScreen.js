import { StyleSheet, View, ImageBackground } from 'react-native';

import { Text, Button } from '@rneui/themed';

export default function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground
            source={require('../assets/cocktail-bg.jpg')}
            style={styles.background}
            resizeMode='cover'
        >
            <View style={styles.overlay}>
                <Text style={styles.buttonTitle}>D'Bar App</Text>
                <Button style={styles.button}
                    title="Browse Cocktails"
                    onPress={() => navigation.navigate('Tabs')}
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.buttonContainer}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 216, 126, 0.8)',
    borderRadius: '100%',
    margin: 20,
    width: '80%',
    height: '36%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
    buttonTitle: {
        fontFamily: 'Aladin_400Regular',
        fontSize: 75,
        color: '#4F000B',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonText: {
        fontFamily: 'Quicksand_700Bold',
        fontSize: 20,
        color: '#fff',
    },
    buttonContainer: {
        backgroundColor: '#CE4257',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
    }
});
