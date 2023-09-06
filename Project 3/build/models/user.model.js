import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: String,
});
userSchema.index({ email: 1 });
export default mongoose.model("User", userSchema);
