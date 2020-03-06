import React from 'react';
import {StyleSheet,View,TouchableOpacity,Alert,Image,Dimensions} from 'react-native';
import {Layout, Text,Button} from '@ui-kitten/components';
import { WaveIndicator } from 'react-native-indicators';

import { default as appTheme } from '../custom-theme.json'; // <-- Import app theme


const width = Dimensions.get('window').width;




export default class loading extends React.Component{

    state={
        images : [
            require('../assets/celebs/pic0.jpeg'),
            require('../assets/celebs/pic1.jpeg'),
            require('../assets/celebs/pic2.jpg'),
            require('../assets/celebs/pic3.jpg'),
            require('../assets/celebs/pic4.jpeg'),
            require('../assets/celebs/pic5.jpg'),
            require('../assets/celebs/pic6.jpg'),
            require('../assets/celebs/pic7.jpg'),
            require('../assets/celebs/pic8.jpg'),
            require('../assets/celebs/pic9.jpg'),
            require('../assets/celebs/pic10.jpeg'),
            require('../assets/celebs/pic11.jpg'),
            require('../assets/celebs/pic12.jpg'),
            require('../assets/celebs/pic13.jpg'),
            require('../assets/celebs/pic14.jpeg'),
            require('../assets/celebs/pic15.jpg'),
        ],
        index  : 0,
    }

    componentDidMount(){
        const that = this;
        this.interval = setInterval(()=>{
            that.changeImage();
        },500)
    }

    componentWillUnmount(){
        clearInterval(this._interval);
    }

    changeImage = ()=>{
        console.log('changeImage')
        const {index,images} = this.state;
        let newI = 0;
        if(index==images.length-1){
            newI = 0;
        }else{
            newI = index+1;
        }
        newI = Math.floor(Math.random() * images.length)
        this.setState({index:newI})

    }

    onCancel = ()=>{
        console.log("onPress")
        const {onCancel} = this.props;
        onCancel();
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
                        <Image style={styles.userImg} source={images[index]} />

                    </Layout>
                </Layout>
                <Layout style={styles.ContentContainer}>
                    <Text category='h4' style={styles.title} >PLEASE WAIT A SECOND!</Text>
                    <Text category='h6' style={styles.tagline} >We are trying to find your match</Text>
                    <Layout style={styles.buttonContainer} >
                        <Button onPress={this.onCancel} status='danger' size='giant' style={styles.cancelButton} >CANCEL</Button>
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
        width:width*30/100,
        height:width*30/100,
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