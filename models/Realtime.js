import { Sequelize } from "sequelize";
// import connection
import db from "../config/database.js";

// init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const Realtime = db.define(
  "realtime",
  {
    // Define attributes
    site_name: {
      type: DataTypes.STRING,
    },
    batt_volt: {
      type: DataTypes.INTEGER,
    },
    load1: {
      type: DataTypes.FLOAT,
    },
    load2: {
      type: DataTypes.FLOAT,
    },
    load3: {
      type: DataTypes.FLOAT,
    },
    pv1_curr: {
      type: DataTypes.FLOAT,
    },
    pv2_curr: {
      type: DataTypes.FLOAT,
    },
    pv3_curr: {
      type: DataTypes.FLOAT,
    },
    pv1_volt: {
      type: DataTypes.FLOAT,
    },
    pv2_volt: {
      type: DataTypes.FLOAT,
    },
    pv3_volt: {
      type: DataTypes.FLOAT,
    },
    ping: {
      type: DataTypes.INTEGER,
    },
    total_pack: {
      type: DataTypes.INTEGER,
    },
    site_host: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.TEXT("long"),
    },
    downtime: {
      type: DataTypes.INTEGER,
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
export default Realtime;

// (async () => {
//   await db.sync();
// })();

(async () => {
  await db.sync({ alter: false });
})();
