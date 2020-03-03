

export default class Celeb {

    constructor(confidence, name,celebFaceID,imageB64) {
        this.confidence = confidence;
        this.name = name;
        this.celebFaceID = celebFaceID;
        this.imageB64 = imageB64;
      }
    
    getName = ()=>{
      return this.name;
    }
    
    getConfidence = ()=>{
      return this.confidence;
    }

    getCelebFaceID = ()=>{
      return this.celebFaceID;
    }

    getImageB64 = ()=>{
      return this.imageB64;
    }

}