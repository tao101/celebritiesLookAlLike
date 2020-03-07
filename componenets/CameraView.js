import React from 'react';
import {StyleSheet,View,TouchableOpacity,Alert,Image,Dimensions} from 'react-native';
import {Layout, Text,Icon} from '@ui-kitten/components';
import { Camera } from 'expo-camera';
import { default as appTheme } from '../custom-theme.json'; // <-- Import app theme
import * as ImagePicker from 'expo-image-picker';

const width = Dimensions.get('window').width;
let cameraRef = null;
export default class CameraView extends React.Component{

    state={
        hasPermision:null,
        type:Camera.Constants.Type.front,
        photo:null,
        
    }

    setPermision = (newV)=>{
        this.setState({hasPermision:newV})
    }
    switchType=()=>{
        let newV =  this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back;

        this.setState({type:newV})

    }

    componentDidMount = async ()=>{
        const { status } = await Camera.requestPermissionsAsync();
        this.setPermision(status === 'granted')
    }

    onSwitchCam = ()=>{
        this.switchType();
    }

    onTakePic = async ()=>{
        const {onPic} = this.props;
        console.log("onTakePic called")
        if(this.cameraRef!=null){
            const options = {
                base64:true
            }
            let picStatus = await this.cameraRef.takePictureAsync(options);
            let pic = picStatus.base64;
            this.setState({photo:pic})
            onPic(pic)

        }else{
            Alert.alert('The Camera is busy doing something else');
        }

    }
    onFilePicker = async ()=>{
        const {onPic} = this.props;
        console.log("onFilePicker called")
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
        if(status === 'granted'){
            const options = {
                base64:true
            }
            const res = await ImagePicker.launchImageLibraryAsync(options);
            console.log(res);
            if(! (res.cancelled == true)){
                let pic = res.base64;
                this.setState({photo:pic})
                onPic(pic)
            }

        }else{
            Alert.alert('Permission to Camera Roll Was denied');
        }

    }

    render(){
        const {hasPermision,type,photo} = this.state;
        if(hasPermision == null || hasPermision == false){
            return(
                <Layout style={styles.permision} >
                    <Text>Permission to Camera Was denied</Text>
                </Layout>
            )
        }else if(photo === null){
            return(
                <View style={this.props.style} >
                    <Camera style={styles.camera} type={type} ref={ref=>{this.cameraRef=ref}} >
                        <Layout
                            style={styles.insideCam}
                        >
                            <TouchableOpacity
                                style={styles.switchCam}
                                onPress={this.onSwitchCam}
                            >
                                <Icon 
                                    name='flip-2-outline' 
                                    width={40} height={40} 
                                    fill={appTheme["color-danger-600"]} 
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.takePic}
                                onPress={this.onTakePic}
                            >
                                <Icon 
                                    name='radio-button-on' 
                                    width={40} height={40} 
                                    fill={appTheme["color-danger-600"]} 
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.filePicker}
                                onPress={this.onFilePicker}
                            >
                                <Icon 
                                    name='image' 
                                    width={40} height={40} 
                                    fill={appTheme['color-danger-600']} 
                                />
                            </TouchableOpacity>
                        </Layout>
                    </Camera> 
                </View>
            )
        }else{
            return(
                <Layout style={this.props.style} >
                    <Image source={{uri:'data:image/png;base64,'+photo}}  style={styles.image} />
                </Layout>
            )
        }

    }

}

const styles = StyleSheet.create({

    
    permision:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:appTheme['color-primary-100'],
    },
    camera:{
        flex:1,
        backgroundColor:appTheme['color-primary-100'],
    },
    insideCam:{
        flex: 1,
        backgroundColor: 'transparent',
        
    },
    switchCam:{
        position:'absolute',
        bottom:20,
        right:15,
    },
    takePic:{
        position:'absolute',
        bottom:20,
        alignSelf:'center',
        
    },
    filePicker:{
        position:'absolute',
        bottom:20,
        left:15,
    },
    image:{
        flex:1,
        width:width,
        resizeMode:'center',
        
    },

})