import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  storage: "./database.sqlite",
  dialect: 'sqlite',
});

const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:\n", error);
  }
};

authenticate();
sequelize.sync();

export default sequelize;
