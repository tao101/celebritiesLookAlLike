import React from 'react';
import {StyleSheet,View,TouchableOpacity,Alert,Image,Dimensions} from 'react-native';
import {Layout, Text,Button} from '@ui-kitten/components';
import { WaveIndicator } from 'react-native-indicators';

import { default as appTheme } from '../custom-theme.json'; // <-- Import app theme


const width = Dimensions.get('window').width;



export default class loading extends React.Component{

    state={
        images : ['https://i.insider.com/5d66d21e6f24eb396b6c8192?width=1100&format=jpeg&auto=webp'],
        index  : 0,
    }

    componentDidMount(){
        const that = this;
        setTimeout(()=>{
            that.changeImage();
        },1000)
    }

    changeImage = ()=>{
        console.log('changeImage')
        const that = this;
        setTimeout(()=>{
            that.changeImage();
        },1000)
    }

    render(){
        const {images,index} = this.state;

        return(
            <Layout style={styles.container} >
                
                
                <Layout style={styles.loadingView} >
                    <Layout style={styles.wavesContainer}  >
                        <WaveIndicator  color={appTheme["color-primary-700"]}  size={width*90/100}  waveFactor={0.54} count={1}  />
                    </Layout>
                    <Layout style={styles.wavesContainer} >
                        <WaveIndicator   color={appTheme["color-primary-700"]}  size={width*70/100}  waveFactor={0.54} count={1}  />
                    </Layout>
                    <Layout style={styles.wavesContainer} >
                        <WaveIndicator   color={appTheme["color-primary-700"]} size={width*50/100}  waveFactor={0.54} count={1}  />
                    </Layout>
                    <Layout style={styles.wavesContainer} >
                        <WaveIndicator   color={appTheme["color-primary-700"]}  size={width*30/100}  waveFactor={0.54} count={1}  />
                    </Layout>
                    <Layout style={styles.wavesContainer} >
                        <Image style={styles.userImg} source={{uri:images[index]}} />

                    </Layout>
                </Layout>
                <Layout style={styles.ContentContainer}>
                    <Text category='h4' style={styles.title} >PLEASE WAIT A SECOND!</Text>
                    <Text category='h6' style={styles.tagline} >We are trying to find your match</Text>
                    <Layout style={styles.buttonContainer} >
                        <Button status='danger' size='giant' style={styles.cancelButton} >CANCEL</Button>
                    </Layout>
                </Layout>
                
            </Layout>
        )

    }

}

const styles = StyleSheet.create({

    
    container:{
        flex:1,
        paddingTop:50,
        backgroundColor:appTheme["color-primary-100"]
    },
    userImg:{
        width:100,
        height:100,
        borderRadius:120,
        zIndex:3,
    },
    loadingView:{
        flex:4,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:appTheme["color-primary-100"]
    
    },
    wavesContainer:{
        position:'absolute',
        alignSelf:'center',
        backgroundColor:'transparent',
        zIndex:1,
    },
    ContentContainer:{
        flex:3,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:appTheme["color-primary-100"]

    },
    cancelButton:{
        margin:10,
        borderRadius:50,

    },
    buttonContainer:{
        width:width*50/100, 
        backgroundColor:'transparent'
    },
    title:{
        color:appTheme["color-danger-500"]
    },
    tagline:{

    },

})