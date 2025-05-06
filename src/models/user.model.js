import mongoose, { Schema } from "mongoose"; // Import mongoose and extract Schema for defining a schema
import jwt from "jsonwebtoken"; // Import jsonwebtoken for generating access and refresh tokens
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

// Define the User schema with various fields
const userSchema = new Schema(
    {
        username: {
            type: String, // The username is stored as a string
            required: true, // It is a required field
            unique: true, // Ensures uniqueness in the database
            lowercase: true, // Converts input to lowercase
            trim: true, // Removes extra spaces
            index: true // Creates an index for optimized search
        },
        email: {
            type: String, // Email is stored as a string
            required: true, // It is required
            unique: true, // Must be unique
            lowercase: true, // Converts input to lowercase
            trim: true // Removes unnecessary spaces
        },
        fullName: { // Typo: Should be fullName instead of fullNmae
            type: String, // Full name is a string
            required: true, // Required field
            trim: true, // Removes extra spaces
            index: true // Creates an index for faster queries
        },
        avatar: {
            type: String, // Stores Cloudinary URL for profile picture
            required: true, // Avatar is required
        },
        coverImage: {
            type: String, // Stores Cloudinary URL for cover image
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId, // Stores ObjectIds referencing the Video model
                ref: "Video" // Establishes a relationship with the Video model
            }
        ],
        password: {
            type: String, // Stores hashed password
            required: [true, 'Password is required'] // Required with a custom error message
        },
        refreshToken: {
            type: String, // Stores refresh token for authentication
        }
    },
    { timestamps: true } // Automatically creates createdAt and updatedAt fields
);

// Middleware to hash password before saving to database
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next(); // Skip if password is not modified

    this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt of 10 rounds (ASYNC issue: missing await)
    next(); // Move to next middleware or save process
});

// Method to compare stored password hash with provided password
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password); // Compares input password with hashed password
};

// Method to generate an access token
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id, // User ID
            email: this.email, // User email
            username: this.username, // Username
            fullName: this.fullName // Typo: Should be fullName instead of fullNmae
        },
        process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Token expiry duration
        }
    );
};

// Method to generate a refresh token
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id // User ID only
        },
        process.env.REFRESH_TOKEN_SECRET, // Secret key for signing refresh token
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Refresh token expiry duration
        }
    );
};

// Create and export the User model based on the schema
export const User = mongoose.model("User", userSchema);
