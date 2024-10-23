import mongoose from "mongoose";
const connectToDB=async () =>{
    const url="mongodb://localhost:27017/taskDB";
    mongoose.connect(url).then(() => console.log("connected sucessfully")).catch((e)=>console.log(e));

    
};
export default connectToDB;