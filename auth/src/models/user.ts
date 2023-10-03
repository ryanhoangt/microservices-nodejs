import mongoose, { Document, Model, Schema, model } from "mongoose";
import { Password } from "../services/password";

/**
 * An interface that describes the properties that are required
 * to create a new user.
 */
interface UserAttrs {
  email: string;
  password: string;
}

/**
 * An interface that describes the properties that the User Model
 * has.
 */
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

/**
 * An interface that describes the properties that a User Document
 * has.
 */
interface UserDoc extends Document {
  email: string;
  password: string;
  // ... other fields declared here
}

const userSchema = new Schema(
  {
    email: {
      type: String, // JS's "S"tring, not TS's "s"tring
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        // NOTE: perform view layer's tranformation
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.password);
    this.password = hashed;
  }

  next();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

/**
 * Refer to {@link mongoose.model} to understand why this is
 * done this way.
 */
const User = model<UserDoc, UserModel>("User", userSchema);

export { User };
