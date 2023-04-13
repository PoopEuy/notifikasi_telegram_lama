import { Sequelize } from "sequelize";
import dotenv from "dotenv";
const env = dotenv.config().parsed;

const username = process.env.USER_APT_LAMA;
const password = process.env.PASSWORD_APT_LAMA;
const database = process.env.DATABASE_APT_LAMA;
const host = process.env.DB_HOST_APT_LAMA;
const dialect = process.env.DB_CONNECTION_APT_LAMA;
const port = process.env.DB_PORT_EXPOSE_APT_LAMA;

// module.exports = {
//   HOST: host,
//   USER: username,
//   PASSWORD: password,
//   DB: database,
//   dialect: dialect,
//   port: port,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

// create connection
// const db = new Sequelize(database, username, password, {
//   host: host,
//   dialect: dialect,
// });

const db = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
});

// export connection
export default db;
