import React from 'react';
import {StyleSheet,ScrollView,Image} from 'react-native';
import {Layout, Text,Divider, Button} from '@ui-kitten/components';
import { default as appTheme } from '../custom-theme.json'; // <-- Import app theme
import Constants from 'expo-constants';


import CameraView from '../componenets/CameraView';
import Celeb from '../model/Celeb';


export default class Home extends React.Component{

    state={
        error:false,
        celebs:[],
        userFaceId:null,
    }

    handleFaceRec = (basePic)=>{

        try{
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
        }catch(e){
            console.log(e);
            this.setState({error:true})
        }
        
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
        .then(async (responseJson)=>{
            //console.log(responseJson);
            let celebs = [];
            try{
                let celebarr = responseJson.results[0].matches;
                
                let a = await Promise.all(
                    celebarr.map(async (celeb) => {
                        let confidence = celeb.confidence;
                        let name = celeb.person_id.substring(0,celeb.person_id.lastIndexOf("@")).split('_').join(' ');
                        let celebFaceID = celeb.face_uuid;
                        let celebImage = await this.getCelebFace(celebFaceID);
                        
                        let newCeleb = new Celeb(confidence,name,celebFaceID,celebImage);
                        console.log(confidence + " "+name+" "+celebFaceID);
                        celebs.push(newCeleb)
                        return newCeleb;
                        
    
                    })
                )

                this.setState({celebs:celebs,userFaceId:faceuuid})
                console.log('just updated the Ui '+ a.length)
                console.log(a)

            }catch(e){
                console.log(e);
                this.setState({error:true})
            }
            
        })
    }


    getCelebFace = async (celebFaceuuID)=>{
        let res  = null;
        try{
            let res = await fetch("https://www.betafaceapi.com/api/v2/face/cropped?api_key=d45fd466-51e2-4701-8da8-04351c872236&face_uuid="+celebFaceuuID, {
                headers: {
                  Accept: "application/json"
                }
              })
            let responseJson = await res.json();
            
            
            res = responseJson.image_base64;
            return res;
            
        }catch (error){
            console.log(error);
            return null;
        }
        
        
    }

    componentDidMount = async ()=>{
        this.getCelebFace('65ee3612-4f26-11e5-bf0d-001c420bd602');
    }
    

    onPic = (picBase64)=>{
        console.log('onPic')
        
        this.handleFaceRec(picBase64)
    }

    render(){
        const {error,userFaceId,celebs} = this.state;

        
        
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