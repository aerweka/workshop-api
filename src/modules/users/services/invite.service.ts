import DatabaseConnection from "@src/database/connection.js";

export class InviteUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(body: any, dbSession: any) {
    const result = await this.db.create(body)
    return { _id: result._id };
  }
}
