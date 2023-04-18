import { Sequelize } from "sequelize";
// import connection
import db from "../config/databaseLama.js";

// init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const RealtimeLama = db.define(
  "realtime",
  {
    // Define attributes
    site_name: {
      type: DataTypes.STRING,
    },
    pv1_voltage: {
      type: DataTypes.FLOAT,
    },
    pv2_voltage: {
      type: DataTypes.FLOAT,
    },
    pv1_current: {
      type: DataTypes.FLOAT,
    },
    pv2_current: {
      type: DataTypes.FLOAT,
    },
    batt1_voltage: {
      type: DataTypes.FLOAT,
    },
    batt2_voltage: {
      type: DataTypes.FLOAT,
    },
    lvd1_voltage: {
      type: DataTypes.FLOAT,
    },
    lvd2_voltage: {
      type: DataTypes.FLOAT,
    },
    lvd1_current: {
      type: DataTypes.FLOAT,
    },
    lvd2_current: {
      type: DataTypes.FLOAT,
    },
    host_site: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.TEXT("long"),
    },
    downtime: {
      type: DataTypes.INTEGER,
    },
    down_reason: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: true,
    createdAt: false, // don't add createdAt attribute
    updatedAt: false,
  }
);

// Export model Realtime
export default RealtimeLama;

// (async () => {
//   await db.sync();
// })();

(async () => {
  await db.sync({ alter: false });
})();
