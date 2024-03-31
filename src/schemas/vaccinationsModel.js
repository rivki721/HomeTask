import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import MembersModel from "./membersModel.js";

const VaccinationsModel = sequelize.define("vaccinations", {
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
  dateOfVaccination: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  vaccinationType: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

VaccinationsModel.belongsTo(MembersModel);
MembersModel.hasMany(VaccinationsModel);

export default VaccinationsModel;
