import React from 'react';
import {StyleSheet,TouchableOpacity,Image,Dimensions} from 'react-native';
import {Layout, Text,Icon, TopNavigation,TopNavigationAction} from '@ui-kitten/components';
import { default as appTheme } from '../custom-theme.json'; // <-- Import app theme
import Constants from 'expo-constants';

import Loading from '../componenets/Loading'
import Celeb from '../model/Celeb';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class Results extends React.Component{

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
                this.setState({
                    userFaceresponse:responseJson,
                    
                })
            }catch(e){
                console.log(e);
                this.setState({error:true})
            }
                
                
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

                this.setState({celebs:celebs,userFaceId:faceuuid,loading:false,})
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

    BackIcon = (style) => (
        <Icon {...style} name='arrow-back'/>
    );

    BackAction = () => (
        <TopNavigationAction icon={this.BackIcon} onPress={()=>{
            this.props.navigation.popToTop();
        }}/>
    );

    state={
        loading:false,
        pic:null,
        userFaceresponse:null,
        celebs:null,
    }

    componentDidMount = ()=>{
       const {pic} = this.props.route.params;
       //console.log(pic)
       this.setState({pic:pic})
       //this.handleFaceRec(pic);
    }

    onCancel = ()=>{
        console.log('onCancel')
        this.props.navigation.popToTop()
    }

    render(){
        const {loading} =this.state;
        
        if(loading){
            return (<Loading onCancel={this.onCancel} />)
        }else{
            return (
                <Layout style={styles.container} >
                    <TopNavigation
                        leftControl={this.BackAction()}
                        title='Save & Share'
                        alignment='center'
                        style={{backgroundColor:'transparent'}}
                    />
                    <Layout style={styles.resultsContainer}>
                        
                        <Layout style={styles.item}>
                            <Layout style={styles.titleContainer}>
                                <Text style={styles.appBarTitle1} category="h5">Celebs </Text>
                                <Text style={styles.appBarTitle2} category="h5">Like Me</Text>
                            </Layout>
                            <Layout style={styles.images}>
                                <Image style={styles.userImg} source={require('../assets/celebs/pic0.jpeg')} /> 
                                <Image style={styles.celeImg} source={require('../assets/celebs/pic1.jpeg')} /> 
                            </Layout>
                            <Layout style={styles.infoContainer}>
                                <Layout style={styles.scoreContainer}>
                                    <Text style={styles.score}>{(0.95333544 * 100).toFixed(0)}%</Text>
                                </Layout>
                                <Layout style={styles.nameContainer}>
                                    <Text style={styles.name}>Justin Biber</Text>
                                </Layout>
                            </Layout>
                            
                        </Layout>
                        <Layout style={styles.itemShare}>
                                <TouchableOpacity style={styles.shareButton}>
                                    <Image style={styles.iconButton} source={require('../assets/facebook.png')} />
                                    <Text>Facebook</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.shareButton}>
                                    <Image style={styles.iconButton} source={require('../assets/instagram.png')} />
                                    <Text>Instagram</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.shareButton}>
                                    <Image style={[styles.iconButton,{backgroundColor:appTheme['color-danger-600'],borderRadius:30,tintColor:appTheme['color-info-100'],resizeMode:'center'}]} source={require('../assets/download.png')} />
                                    <Text>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.iconButton,{backgroundColor:appTheme['color-danger-600'],borderRadius:30,tintColor:appTheme['color-info-100'],resizeMode:'center'}]} >
                                    <Image style={styles.iconButton} source={require('../assets/more.png')} />
                                    <Text>More</Text>
                                </TouchableOpacity>
                        </Layout>
                    </Layout>
                </Layout>
            )
        }

    }

}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:appTheme['color-primary-100'],
        paddingTop: Constants.statusBarHeight ,
    },
    resultsContainer:{
        flex:2,
        backgroundColor:appTheme['color-primary-100'],
    },
    item:{
        margin:width*2/100,
        backgroundColor:appTheme['color-primary-200'],
        marginBottom:0,
    },
    itemShare:{
        margin:width*2/100,
        marginTop:0,
        backgroundColor:'transparent',
        flexDirection:'row',
        padding:10,
        
    },
    shareButton:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    images:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'transparent',
        
    },
    userImg:{
        width:width*40/100,
        height:width*40/100,
        margin:width*5/100,
    },
    celeImg:{
        width:width*40/100,
        height:width*40/100,
        margin:width*5/100,
        
    },
    infoContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'transparent'
    },
    nameContainer:{
        flex:1,
       backgroundColor:'blue',
       borderTopLeftRadius:50,
       borderBottomLeftRadius:50,
       marginLeft:10,
       marginTop:10,
       marginBottom:10,
       justifyContent:'center',
       alignItems:'center',
       textAlign:'center',
       backgroundColor:appTheme['color-info-100'],
       height:50,
    },
    scoreContainer:{
       flex:1,
       backgroundColor:'blue',
       borderTopRightRadius:50,
       borderBottomRightRadius:50,
       marginRight:10,
       marginTop:10,
       marginBottom:10,
       justifyContent:'center',
       alignItems:'center',
       textAlign:'center',
       backgroundColor:appTheme['color-danger-600'],
       height:50,
    },
    shareContainer:{

    },
    score:{
       
        fontSize:20,
        fontWeight:'bold',
        
        color:appTheme['color-info-100'],
        textAlign:'center'
        
        
        
    },
    name:{
        fontSize:20,
        fontWeight:'bold',
        
        color:appTheme['color-danger-600'],
        
        
    },
    titleContainer:{
        backgroundColor:'transparent',
        flexDirection:'row',
        alignSelf:'center'
    },
    appBarTitle1:{
        color:appTheme['color-danger-600']
    },
    appBarTitle2:{
        color:appTheme['color-info-100']
    },
    iconButton:{
        width:40,
        height:40,
        
    },

})