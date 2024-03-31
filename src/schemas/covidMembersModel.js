import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import MembersModel from "./membersModel.js";

const CovidMembersModel = sequelize.define("covidMembers", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  memberId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: MembersModel,
      key: "id",
    },
  },
  sickDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  recoveredDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
});

CovidMembersModel.belongsTo(MembersModel);
MembersModel.hasOne(CovidMembersModel);

export default CovidMembersModel;
