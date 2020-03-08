import React from 'react';
import {StyleSheet,TouchableOpacity,Image,Dimensions} from 'react-native';
import {Layout, Text,Icon, Button} from '@ui-kitten/components';
import { default as appTheme } from '../custom-theme.json'; // <-- Import app theme
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class Home extends React.Component{

    onSetting=()=>{
        console.log('onSetting')
    }

    onCam = ()=>{
        console.log('onCam')
        this.props.navigation.navigate('camera')
    }

    onAlb = async ()=>{
        console.log('onAlb')
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
        if(status === 'granted'){
            const options = {
                base64:true
            }
            const res = await ImagePicker.launchImageLibraryAsync(options);
            //console.log(res);
            if(! (res.cancelled == true)){
                let pic = res.base64;
                //todo : handle selected Pic
                this.props.navigation.navigate('results',{pic:pic})
            }

        }else{
            Alert.alert('Permission to Camera album Was denied');
        }
    }

    

    render(){

        return (
            <Layout style={styles.container}>
                <Layout style={styles.ImageBackground}>
                    <Layout style={styles.appBar} >
                        <Layout style={styles.titleContainer}>
                            <Text style={styles.appBarTitle1} category="h5">Celebs </Text>
                            <Text style={styles.appBarTitle2} category="h5">Like Me</Text>
                        </Layout>
                        <TouchableOpacity style={styles.settingContainer} onPress={this.onSetting}>
                            <Icon name='settings-outline' width={width*8/100} height={width*8/100} fill={appTheme['color-primary-100']}  />
                        </TouchableOpacity>
                    </Layout>
                    <Layout style={styles.img1Container}>
                        <Image style={styles.user1Img} source={require('../assets/celebs/pic0.jpeg')} />
                    </Layout>
                    <Layout style={styles.img2Container}>
                        <Image style={styles.user2Img} source={require('../assets/celebs/pic11.jpg')} />
                    </Layout>
                    <Layout style={styles.img3Container}>
                        <Image style={styles.user3Img} source={require('../assets/celebs/pic13.jpg')} />
                    </Layout>
                    <Layout style={styles.happyGuyContainer}>
                        <Image style={styles.happyGuy} source={require('../assets/celebs/happy.png')} />
                    </Layout>
                    
                    
                </Layout>
                <Layout style={styles.contnetContainer}>
                    <Layout style={styles.ButtonsContainer} >
                        <TouchableOpacity style={styles.cameraButton} onPress={this.onCam} >
                            <Icon name='camera-outline' width={width*20/100} height={width*20/100} fill={appTheme['color-info-100']}  />
                            <Text style={styles.textCam}>CAMERA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.albumButton} onPress={this.onAlb} >
                            <Icon name='image-outline' width={width*20/100} height={width*20/100} fill={appTheme['color-danger-600']}  />
                            <Text style={styles.textalb}>ALBUM</Text>
                        </TouchableOpacity>

                    </Layout>
                    <Layout style={styles.privacyContainer} >
                        <Text style={styles.privacyText}>*We are commited to protect your privacy</Text>
                        <Text style={styles.privacyText}>We do not use your photo for any purpose other than providing the services</Text>
                    </Layout>
                </Layout>
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
    ImageBackground:{
        flex:3,
        backgroundColor:appTheme['color-danger-600'],
        borderBottomRightRadius:150,
        //paddingTop: Constants.statusBarHeight ,
    },
    contnetContainer:{
        flex:2,
        backgroundColor:appTheme['color-primary-100'],
        
    },
    ButtonsContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:appTheme['color-primary-100'],
        
    },
    appBar:{
        
        backgroundColor:'transparent',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
        
    },
    settingContainer:{
        alignSelf:'flex-end',
        position:'absolute',
        right:10,
        top:Constants.statusBarHeight,
    },
    titleContainer:{
        backgroundColor:'transparent',
        flexDirection:'row',
        paddingTop: Constants.statusBarHeight ,
        
        flex:1,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
        
    },
    appBarTitle1:{
        color:appTheme['color-primary-100']
    },
    appBarTitle2:{
       
    },
    privacyContainer:{
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:10,
        backgroundColor:appTheme['color-primary-100'],
    },
    privacyText:{
        textAlign:'center',
        fontSize:14,
    },
    cameraButton:{
        flex:1,
        backgroundColor:appTheme['color-danger-600'],
        margin:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
    },
    albumButton:{
        flex:1,
        backgroundColor:appTheme['color-info-100'],
        margin:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        
    },
    textCam:{
        fontSize:20,
        fontWeight:'bold',
        color:appTheme['color-info-100'],
    },
    textalb:{
        fontSize:20,
        fontWeight:'bold',
        color:appTheme['color-danger-600'],
    },
    user1Img:{
        width:width*30/100,
        height:width*30/100,
        borderRadius:120,
        borderWidth:3,
        borderColor:appTheme['color-primary-100'],
    },
    user2Img:{
        width:width*15/100,
        height:width*15/100,
        borderRadius:120,
        borderWidth:3,
        borderColor:appTheme['color-primary-100'],
    },
    user3Img:{
        width:width*20/100,
        height:width*20/100,
        borderRadius:120,
        borderWidth:3,
        borderColor:appTheme['color-primary-100'],
    },
    img1Container:{
        backgroundColor:'transparent',
        position:'absolute',
        top: height*15/100,
        right:width*20/100,
    },
    img2Container:{
        backgroundColor:'transparent',
        position:'absolute',
        top: height*30/100,
        right:width*10/100,
    },
    img3Container:{
        backgroundColor:'transparent',
        position:'absolute',
        top: height*40/100,
        right:width*20/100,
    },
    happyGuyContainer:{
        flex:1,
        
        position:'absolute',
        bottom:5,
        left:5,
        
        backgroundColor:'transparent'
    },
    happyGuy:{
        
        width:width*60/100,
        height:height*50/100,
        resizeMode:'contain'
        
        
       
        
    },

})