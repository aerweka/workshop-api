import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository.js";
import { validate } from "../request/invite.request.js";
import { InviteUserService } from "../services/invite.service.js";
import { db } from "@src/database/database.js";
import { QueryInterface } from "@src/database/connection.js";

export const invite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();

    db.startTransaction();

    validate(req.body);

    let iQuery: QueryInterface = {
      fields: "",
      filter: { username: req.body.username },
      page: 1,
      pageSize: 1,
      sort: "",
    };

    const userRepository = new UserRepository(db);

    let res = (await userRepository.readMany(iQuery)) as any;
    if (res.length > 0) return res.status(200).json({ message: "Username already exist" })

    iQuery.filter = { email: req.body.email }
    res = (await userRepository.readMany(iQuery)) as any;
    if (res.length > 0) return res.status(200).json({ message: "Email already exist" })

    const inviteUserService = new InviteUserService(db);
    const result = await inviteUserService.handle(req.body, { session });

    await db.commitTransaction();

    res.status(201).json({
      _id: result._id,
    });
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};
