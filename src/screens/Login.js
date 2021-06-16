import React, { Component } from 'react'
import * as Font from 'expo-font'
import { View, StyleSheet, Text, ActivityIndicator, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, StatusBar } from 'react-native'
//import Logo from '../../../assets/imgs/logo.png'
import Icon from './Icon'
import Icon2 from 'react-native-vector-icons/Ionicons'
import { generateShadow } from 'react-native-shadow-generator'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Firebase from 'firebase'


let customFonts = {
    'Rubik-Light': require('../../assets/Fonts/Rubik-Light.ttf'),
    'Rubik-Regular': require('../../assets/Fonts/Rubik-Regular.ttf'),
    'Rubik-Medium': require('../../assets/Fonts/Rubik-Medium.ttf')
}

const firebaseConfig = {
    apiKey: "AIzaSyAelDwn3IJCZmYx6w6un4lQhUsiRxWVYdQ",
    authDomain: "applucas-1cfc3.firebaseapp.com",
    projectId: "applucas-1cfc3",
    storageBucket: "applucas-1cfc3.appspot.com",
    messagingSenderId: "172264201609",
    appId: "1:172264201609:web:9ef3f3808c530061cbd558",
    measurementId: "G-2KTYLMHW9C"
}
const initialState = {
    fontsLoaded: false,
    email: 'victor',
    password: '33333386',
    dados: [],
    senhaBD: ''
}

class Login extends Component {
    state = {
        ...initialState
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    observeAuth = () =>
        Firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
            try {
                Firebase.auth().signInAnonymously();
            } catch ({ message }) {
                Alert.alert(message);
            }
        }
    };

    async getUserInfo() {
        const db = Firebase.firestore()
        db.collection("users").where("usuario", "==", this.state.email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data())
                this.setState({dados: doc.data()})
                this.setState({senhaBD: doc.data().senha})
                console.log(this.state.dados)
            });
            if(this.state.senhaBD === this.state.password){
                
                this.props.navigation.navigate('Home', {dados: this.state.dados}) 
            }
        }, )
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
      }
      
      
    signIn = () => {
        this.getUserInfo()

    }

    componentDidMount = async () => {
        
        this._loadFontsAsync()
        Firebase.initializeApp(firebaseConfig);
        this.observeAuth
    }

    render() {
        if (this.state.fontsLoaded === false) {
            return (

                <View>
                    <ActivityIndicator size='large' />
                </View>
            )
        }

        return (

            <KeyboardAvoidingView behavior="position" enabled style={{ backgroundColor: '#E5E5E5', height: '100%' }}>
                <StatusBar backgroundColor="#e5e5e5" />
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.viewLogo}>

                    </View>
                    <View style={styles.viewInputs}>
                        <Icon name="IconDigital" viewBox='0 0 16 16' height="14" />
                        <TextInput placeholder='Digite seu username' style={{ width: 295, borderRadius: 10 }} value={this.state.email} onChangeText={(text) => this.setState({ email: text })} />
                    </View>
                    <View style={[styles.viewInputs2]}>
                        <Icon name="IconKey" viewBox='0 0 16 16' height="14" />
                        <TextInput placeholder='Digite sua senha' style={{ width: 290, borderRadius: 10 }} value={this.state.password} onChangeText={(text) => this.setState({ password: text })} secureTextEntry={true} />
                    </View>
                    <View style={[styles.viewBotao]}>
                        <View style={{ justifyContent: 'flex-start' }}>
                            <Icon2 name='enter-outline' size={20} color='#FFF' style={{ paddingHorizontal: 10, transform: [{ rotate: '180deg' }] }} />

                        </View>
                        <TouchableOpacity onPress={this.signIn}>
                            <View style={{ justifyContent: 'center', marginLeft: 80 }}>
                                <Text style={styles.textoBotao}>Entrar</Text>

                            </View>

                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    viewLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
        marginBottom: 200

    },
    si: {
        fontFamily: 'Rubik-Medium',
        fontSize: 50,

    },
    mob: {
        color: '#2f80ed',
        fontFamily: 'Rubik-Medium',
        fontSize: 50,
    },
    viewInputs: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 0.5,
        backgroundColor: '#F6FDFF',
        height: 50,
        width: 323,
        paddingHorizontal: 25,
        borderRadius: 10
    },
    viewInputs2: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 0.5,
        backgroundColor: '#F6FDFF',
        height: 50,
        width: 323,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 20
    },
    viewBotao: {
        alignItems: 'center',
        //justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 0.5,
        backgroundColor: '#120956',
        height: 50,
        width: 323,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 50,
        ...generateShadow(7)
    },
    textoBotao: {
        fontFamily: 'Rubik-Regular',

        fontSize: 18,
        color: '#FFF'
    }

})

export default Login
