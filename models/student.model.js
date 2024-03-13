import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, unique: true, require: true },
    phone: { type: String, require: true, },
    nationalID: { type: String, require: true, unique: true },
    gender: { type: String, enum: {values:["Male", "Female"],message:'gender must be either female or male'}, }
    

}, { timestamps: true });

const studentModel = mongoose.model("Student", StudentSchema);
export default studentModel;