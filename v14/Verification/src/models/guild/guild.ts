import { prop, getModelForClass } from "@typegoose/typegoose";

/**
 * @class Guild
 * @description Guild model for the verification system
 * @property guildID 
 * @property role 
 * @property active 
 */
class Guild {
    @prop()
    guildID: string 

    @prop()
    role: string 

    @prop()
    active: boolean
}

const GuildModel = getModelForClass(Guild);

export default GuildModel;
