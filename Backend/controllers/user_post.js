import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const addPosts = (req, res) => {
  const q = "insert into product(`c_id`,`p_name`,`p_desc`,`posting_date`) values(?)";
  const values = [
    1,
    "tablet",
    "newly used",
    "2025-02-03"
  ]
  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.send("Post has been created.");
  });
};
