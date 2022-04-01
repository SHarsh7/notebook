const mongodb=require ('mongoose');
const mongodbUri="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const conetectMongo =()=>{
    mongodb.connect(mongodbUri,()=>{
        console.log("Connected to mongo!");
    })
}

module.exports =conetectMongo;
