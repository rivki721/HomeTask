import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const MembersModel = sequelize.define("members", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  taz: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  street: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  dob: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  mobilePhone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

export default MembersModel;
