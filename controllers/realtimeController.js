// Import model Product
import Realtime from "../models/Realtime.js";
import { Sequelize } from "sequelize";
const op = Sequelize.Op;

// Get semua product
export const getRealtime = async (req, res) => {
  try {
    const response = await Realtime.findAll();
    res.send(response);
    // res.status(200).json({ msg: "sucess", data: response });
  } catch (err) {
    console.log(err);
  }
};

export const getSiteDown = async (req, res) => {
  try {
    const response = await Realtime.findAll({
      where: { downtime: { [Sequelize.Op.gt]: 10 } },
    });
    res.send(response);
    // res.status(200).json({ msg: "sucess", data: response });
  } catch (err) {
    console.log(err);
  }
};
