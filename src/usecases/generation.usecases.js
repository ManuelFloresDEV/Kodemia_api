const createError = require("http-errors");

const Generation = require("../models/generations.model");
const Mentor = require("../models/mentors.model");

async function create(data) {
  const existingGeneration = await Generation.findOne({
    number: data.number,
    program: data.program,
  });

  if (existingGeneration) {
    throw createError(409, "Generation already exists");
  }

  if (data.mentor) {
    const mentor = await Mentor.findById(data.mentor);

    if (!mentor) {
      throw createError(400, "Mentor not found");
    }
  }

  const generation = await Generation.create(data);

  return generation;
}

async function getAll() {
  const generations = await Generation.find().populate("mentor");
  return generations;
}

async function getById(id) {
  const generation = await Generation.findById(id).populate("mentor");
  return generation;
}

async function updateById(id, data) {
  const existingGeneration = await Generation.findById(id);

  if (!existingGeneration) {
    throw createError(404, "Generation not found");
  }

  if (data.program || data.number) {
    const number = data.number || existingGeneration.number;
    const program = data.program || existingGeneration.program;

    const conflictingGeneration = await Generation.findOne({
      number,
      program,
    });

    if (conflictingGeneration) {
      throw createError(
        409,
        `Another generation already has this number and program [${program} ${number}]`
      );
    }
  }

  if (data.mentor) {
    const mentor = await Mentor.findById(data.mentor);

    if (!mentor) {
      throw createError(400, "Mentor id not found");
    }
  }

  const generation = await Generation.findByIdAndUpdate(id, data, {
    new: true,
  });

  return generation;
}

async function deleteById(id) {
  const existingGeneration = await Generation.findById(id);

  if (!existingGeneration) {
    throw createError(404, "Generation not found");
  }

  const generationDeleted = await Generation.findByIdAndDelete(id);
  return generationDeleted;
}

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
