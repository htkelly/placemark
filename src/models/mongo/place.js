import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema({
  name: String,
  description: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const Place = Mongoose.model("Place", placeSchema);
