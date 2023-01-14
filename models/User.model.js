const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    surname: {
      type: String,
      required: [true, "Surname is required."],
    },
    address: {
      type: String,
      required: [false],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required."],

    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
