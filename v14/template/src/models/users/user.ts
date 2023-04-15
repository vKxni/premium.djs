import { prop, getModelForClass } from "@typegoose/typegoose";

/**
 * @class User
 * @description User model
 * @property ...
 */
class User {}

const UserModel = getModelForClass(User);

export default UserModel;
