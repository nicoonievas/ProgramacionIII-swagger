const express = require("express");
const taskService = require("./task.service");

const router = express.Router();

// GET /api/task
// GET /api/task
// GET /api/task
router.get("/api/task", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const { page = 1, perPage = 10 } = req.query; // Obtener parámetros de la consulta
    const options = {
      page: parseInt(page), // Convertir a número
      limit: parseInt(perPage), // Convertir a número
    };

    // Suponiendo que estás utilizando un servicio para paginar las tareas
    let paginated = await taskService.paginated(options);
    return res.status(200).send(paginated);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});



// GET /api/task/:id
router.get("/api/task/:id",  async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const userId = req.params.id;
    const user = await taskService.findOneById(userId);
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// POST /api/task
router.post("/api/task", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const newUser = req.body;
    console.log(newUser);
    const user = await taskService.save(newUser);
    return res.status(201).send(user);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// PUT /api/task/:id
router.put("/api/task/:id",  async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const user = await taskService.update(userId, updatedUser);
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// DELETE /api/task/:id
router.delete("/api/task/:id", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const userId = req.params.id;
    await taskService.remove(userId);
    return res.status(200).send("Usuario eliminado correctamente.");

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;