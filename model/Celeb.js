

export default class Celeb {

    constructor(confidence, name,celebFaceID) {
        this.confidence = confidence;
        this.name = name;
        this.celebFaceID = celebFaceID;
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

}