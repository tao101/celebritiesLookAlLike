import React from 'react';
import {StyleSheet,SafeAreaView} from 'react-native';
import {Layout, Text,Divider, TopNavigation} from '@ui-kitten/components';
import { default as appTheme } from '../custom-theme.json'; // <-- Import app theme
import Constants from 'expo-constants';


import CameraView from '../componenets/CameraView';
import Celeb from '../model/Celeb';


export default class Home extends React.Component{

    state={
        error:false,
        celebs:[],
    }

    handleFaceRec = (basePic)=>{

        fetch('https://www.betafaceapi.com/api/v2/media', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            api_key:'d45fd466-51e2-4701-8da8-04351c872236',
            file_base64:basePic,
            detection_flags:'basicpoints,propoints,classifiers,content',
            
           
        })
        }).then((response)=>{
            //console.log(response);
            return response.json();
        })
        .then((responseJson)=>{
            //console.log(responseJson);
           try{
            const faceId = responseJson.media.faces[0].face_uuid;
            console.log(faceId);
            this.searchCelebs(faceId);
           }catch(e){
            console.log(e);
            this.setState({error:true})
           }
            
            this.setState({
                response:responseJson,
                loading:false,
                firstStart:false,
            })
        })
        
    }

    searchCelebs = (faceuuid)=>{
        fetch('https://www.betafaceapi.com/api/v2/recognize', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            api_key:'d45fd466-51e2-4701-8da8-04351c872236',
            
            faces_uuids:[faceuuid,],
            targets :['all@celebrities.betaface.com',]
           
        })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            //console.log(responseJson);
            try{
                let celebarr = responseJson.results[0].matches;
                let celebs = [];
                celebarr.forEach(celeb => {
                    let confidence = celeb.confidence;
                    let name = celeb.person_id.substring(0,celeb.person_id.lastIndexOf("@")).split('_').join(' ');
                    let celebFaceID = celeb.face_uuid;
                    console.log(confidence + " "+name);
                    let newCeleb = new Celeb(confidence,name,celebFaceID);

                });
            }catch(e){
                console.log(e);
                this.setState({error:true})
            }
            this.setState({
                response:responseJson,
                loading:false,
                firstStart:false,
            })
        })
    }

    onPic = (picBase64)=>{
        console.log('onPic')
        
        this.handleFaceRec(picBase64)
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
        paddingTop: Constants.statusBarHeight ,
        backgroundColor:appTheme['color-primary-100'],
        
        
    },
    cam:{
        backgroundColor:appTheme['color-primary-100'],
        height:'50%',
    },
})