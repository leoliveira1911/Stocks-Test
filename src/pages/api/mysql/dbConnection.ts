import { json } from "node:stream/consumers";
import db from "../../../backend/mysql/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise(() => {
    if (req.method === "GET") {
      try {
        db.query(`select * from stocks`, (err, result) => {
          return res.status(200).send(result);
          //resolve(result);
        });
      } catch (e) {
        return res.status(500).send({ message: e.message });
      }
    }
  });
}
