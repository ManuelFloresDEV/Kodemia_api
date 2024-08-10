const express = require("express");

const generationsUseCase = require("../usecases/generation.usecases");

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const generations = await generationsUseCase.getAll();

    response.json({
      success: true,
      message: "All generations",
      data: { generations },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;

    const generation = await generationsUseCase.getById(id);

    response.json({
      success: true,
      message: "Generation found",
      data: { generation },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (request, response) => {
  try {
    const data = request.body;

    const generation = await generationsUseCase.create(data);

    response.json({
      success: true,
      message: "Generation created",
      data: { generation },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const data = request.body;

    const generation = await generationsUseCase.updateById(id, data);

    response.json({
      success: true,
      message: "Generation updated",
      data: { generation },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;

    const generation = await generationsUseCase.deleteById(id);

    response.json({
      success: true,
      message: "Generation deleted",
      data: { generation },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
