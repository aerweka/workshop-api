import { ApiError } from "@point-hub/express-error-handler";
import Validatorjs from "validatorjs";

export const validate = (body: any) => {
  const validation = new Validatorjs(body, {
    email: "required|email",
    username: "required|string",
    role: "required",
    branchAssigned: "required|string",
    branchAccess: "required|array"
  });

  if (validation.fails()) {
    throw new ApiError(422, validation.errors.errors);
  }
};
