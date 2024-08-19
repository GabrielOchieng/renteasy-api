import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const houseSchema = mongoose.Schema(
  {
    landlord: {
      type: String,
      // ref: "User",
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      required: true,
    },

    street: { type: String, required: true },
    town: { type: String, required: true },
    estate: { type: String, required: true },
    address: { type: String, required: true },
    // Consider adding geolocation for map integration

    propertyType: {
      type: String,
      enum: [
        "Apartment",
        "House",
        "Bedsitter",
        "Single",
        "OneBedroom",
        "TwoBedroom",
        "ThreeBedroom",
        "Home",
      ],
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    rentPrice: {
      type: Number,
      required: true,
    },
    photos: {
      type: [String], // Array of image URLs
    },
    description: {
      type: String,
      required: true,
    },
    amenities: {
      type: [String], // Array of amenities (laundry, parking, etc.)
    },
    contactInfo: {
      type: String, // Email or phone number
    },
    // Add a field for secure messaging within the platform (optional)
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// // Match user entered password to hashed password in database
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // Encrypt password using bcrypt
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

const House = mongoose.model("House", houseSchema);

export default House;
