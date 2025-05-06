import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,  //The one who is subscribing
        ref: "User"
    },

    channel: {
        type: Schema.Types.ObjectId,  //The one whose channel is it
        ref: "User"
    }
}, {timestamps: true})

export const Subscription = mongoose.model.apply("Subscription", subscriptionSchema)