import React from 'react';
import {StyleSheet,View,TouchableOpacity,Alert,Image,Dimensions} from 'react-native';
import {Layout, Text,Icon} from '@ui-kitten/components';

import { default as appTheme } from '../custom-theme.json'; // <-- Import app theme


const width = Dimensions.get('window').width;



export default class CelebItem extends React.Component{

    /*state={
        confidence:this.props.confidence, 
        name:this.props.name,
        celebFaceID:this.props.celebFaceID,
        imageB64Celeb:this.props.imageB64,
        imageB64User:this.props.userImg,
    }*/

    state={
        confidence:0.7689999938011169,
        name:'Rob Schneider',
        celebFaceID:'3633f207-3595-1030-b683-8049ebc209e6',
        imageB64Celeb:this.img,
        
    }
    

    render(){
        const {confidence,name,celebFaceID,imageB64} = this.state;
        return (
            <Layout style={styles.container} >
                <Image 
                    style={styles.userImg}
                    source={{uri:'https://pbs.twimg.com/profile_images/823569976342773760/c2RLAG7h_400x400.jpg'}}
                />
                <Layout>

                </Layout>

            </Layout>
        )

    }

}

const styles = StyleSheet.create({

    
    container:{
        flex:1,
        paddingTop:50,
    },
    userImg:{
        width:'50%',
        height:200,
    },

})