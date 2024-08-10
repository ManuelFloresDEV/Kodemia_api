const express = require("express");

const mentorsUseCase = require("../usecases/mentors.usecases");

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const mentors = await mentorsUseCase.getAll();

    response.json({
      success: true,
      message: "All mentors",
      data: { mentors },
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
    const mentor = await mentorsUseCase.getById(id);
    response.json({
      success: true,
      message: "Mentor found",
      data: { mentor },
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
    const mentor = await mentorsUseCase.create(data);
    response.json({
      success: true,
      message: "Mentor created",
      data: { mentor },
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
    const mentor = await mentorsUseCase.updateById(id, data);
    response.json({
      success: true,
      message: "Mentor updated",
      data: { mentor },
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
    const mentor = await mentorsUseCase.deleteById(id);
    response.json({
      success: true,
      message: "Mentor deleted",
      data: { mentor },
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
