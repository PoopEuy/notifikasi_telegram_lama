// Import model Product
import Realtime from "../models/Realtime.js";
import { Sequelize } from "sequelize";
import moment from "moment";
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
    //konfigurasi awal
    // const response = await Realtime.findAll({
    //   where: { downtime: { [Sequelize.Op.gt]: 10 } },
    // });
    // let date_start = "2019-01-01 00:00:00";
    // console.log("date_start : " + date_start);

    var time = moment();
    var date_now = time.format("YYYY-MM-DD HH:mm:ss");
    var date_start = moment().subtract(7, "d").format("YYYY-MM-DD HH:mm:ss");
    var date_end = moment().subtract(10, "m").format("YYYY-MM-DD HH:mm:ss");

    // const date_end = new Date();
    // date_end.setMinutes(date_end.getMinutes() - 10);
    console.log("date_now : " + date_now);
    console.log("date_start : " + date_start);
    console.log("date_end : " + date_end);

    // const date_now = new Date();
    // const date_end = new Date();
    // date_end.setMinutes(date_end.getMinutes() - 10);
    // // 9:40 am on March 13, 2022
    // console.log(date_now);
    // console.log(date_end); // 2022-05-18T14:10:00.000Z
    const response = await Realtime.findAll({
      where: {
        // created_at: {
        //   [op.between]: [date_start, date_end],
        // },
        // downtime: {
        //   [op.gt]: [10],
        // },
        downtime: {
          [op.between]: [10, 10080],
        },
      },
    });

    console.log("respon : " + response);
    res.send(response);
    // res.status(200).json({ msg: "sucess", data: response });
  } catch (err) {
    console.log(err);
  }
};
