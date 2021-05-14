import { Router } from "express";

import { createUserController } from "../modules/users/useCases/createUser";
import { listAllUsersController } from "../modules/users/useCases/listAllUsers";
import { showUserProfileController } from "../modules/users/useCases/showUserProfile";
import { turnUserAdminController } from "../modules/users/useCases/turnUserAdmin";

const usersRoutes = Router();

usersRoutes.post("/", (request, response) => {
  try {
    const user = createUserController.handle(request, response);
  } catch (user) {
    if (!user) response.status(400).json({ message: "Email already exists" });
  }
  return response.status(201).json(user);
});

usersRoutes.patch("/:user_id/admin", (request, response) =>
  turnUserAdminController.handle(request, response)
);

usersRoutes.get("/:user_id", (request, response) =>
  showUserProfileController.handle(request, response)
);

usersRoutes.get("/", (request, response) =>
  listAllUsersController.handle(request, response)
);

export { usersRoutes };
