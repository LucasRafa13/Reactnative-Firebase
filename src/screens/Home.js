import React, { Component } from 'react';
import { ImageBackground, View, Image, TouchableOpacity, Text } from 'react-native'

export default function Home ({route, navigation}) {

    const { dados } = route.params;



        return (
            <ImageBackground source={require('../../assets/BG.png')} style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                    <Text style={{color: '#FFF', paddingLeft: 20, marginTop: 20}}>SALDO ATUAL</Text>
                    <Text style={{color: '#FFF', alignSelf: 'flex-start', fontSize: 35, marginTop: 0, paddingLeft: 20}}>R${dados.saldo}</Text>
                    <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: -20}}>
                        <Text style={{fontSize: 28, color: '#0f064b'}}>Olá, </Text>
                        <Text style={{color: '#82d01d', fontSize: 28}}>{dados.nome}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: -50, marginTop: 10}}>
                        <Text style={{fontSize: 20, color: '#0f064b'}}>Qual será sua proxima operação?</Text>
                    </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, marginTop: 100 }}>
                    <TouchableOpacity>

                        <View style={{ width: 150, height: 150, backgroundColor: '#FFF' }}>
                            <Image source={require('../../assets/PAGAR.png')} style={{ width: '100%', height: '100%' }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>

                        <View style={{ width: 150, height: 150, backgroundColor: '#FFF' }}>
                            <Image source={require('../../assets/CARREGAR.png')} style={{ width: '100%', height: '100%' }} />
                        </View>
                    </TouchableOpacity>


                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                    <TouchableOpacity>

                        <View style={{ width: 150, height: 150, backgroundColor: '#FFF' }}>
                            <Image source={require('../../assets/HISTORICO.png')} style={{ width: '100%', height: '100%' }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>

                        <View style={{ width: 150, height: 150, backgroundColor: '#FFF' }}>
                        <Image source={require('../../assets/TRANSF.png')} style={{width: '100%', height: '100%'}}/>
                        </View>
                    </TouchableOpacity>


                </View>
            </ImageBackground>
        )
    }
