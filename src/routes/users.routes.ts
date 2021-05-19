import { Router } from "express";

import { createUserController } from "../modules/users/useCases/createUser";
import { listAllUsersController } from "../modules/users/useCases/listAllUsers";
import { showUserProfileController } from "../modules/users/useCases/showUserProfile";
import { turnUserAdminController } from "../modules/users/useCases/turnUserAdmin";

const usersRoutes = Router();

usersRoutes.post("/", (request, response) => {
  try {
    const user = createUserController.handle(request, response);
    return response.status(201).json(user);
  } catch (user) {
    return response
      .status(400)
      .json({ error: "Nao foi possivel criar o usuario" });
  }
});

usersRoutes.patch("/:user_id/admin", (request, response) => {
  try {
    const user = turnUserAdminController.handle(request, response);
    return response.status(201).json(user);
  } catch (user) {
    return response
      .status(404)
      .json({ error: "Nao foi possivel tornar o usuario Administrador." });
  }
});

usersRoutes.get("/:user_id", (request, response) => {
  try {
    const user = showUserProfileController.handle(request, response);
    return response.status(200).json(user);
  } catch (user) {
    return response
      .status(404)
      .json({ error: "Nao foi possivel mostrar este usuario" });
  }
});

usersRoutes.get("/", (request, response) => {
  try {
    const users = listAllUsersController.handle(request, response);

    return response.status(200).json(users);
  } catch (users) {
    return response
      .status(400)
      .json({ error: "Nao foi possivel listar todos os usuarios" });
  }
});

export { usersRoutes };
