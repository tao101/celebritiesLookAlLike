import React from 'react';
import {StyleSheet,TouchableOpacity,Image,Dimensions} from 'react-native';
import {Layout, Text,Icon, Button} from '@ui-kitten/components';
import { default as appTheme } from '../custom-theme.json'; // <-- Import app theme
import Constants from 'expo-constants';

import CameraView from '../componenets/CameraView';


export default class CamScreen extends React.Component{

    onPic = (ar)=>{
        console.log('onPic')
        //console.log(ar)
        //todo : handle the photo
        this.props.navigation.navigate('results',{pic:ar})
    } 


    render(){
        
        return(
            <Layout style={styles.container} >
                <CameraView style={styles.cam} onPic={(ar)=>this.onPic(ar)}/>
            </Layout>
        )

    }

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        //paddingTop: Constants.statusBarHeight ,
        backgroundColor:appTheme['color-primary-100'],
        
    },
    cam:{
        backgroundColor:appTheme['color-primary-100'],
        flex:1,
        
    },
    image:{
        width:200,
        height:200,
    }
})