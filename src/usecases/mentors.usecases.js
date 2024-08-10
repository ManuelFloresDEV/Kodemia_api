const createError = require("http-errors");
const Mentor = require("../models/mentors.model");

async function getAll() {
  const mentors = await Mentor.find();
  return mentors;
}

async function getById(id) {
  const mentor = await Mentor.findById(id);
  return mentor;
}

async function create(data) {
  // find -> regresa un arreglo
  // findOne -> regresa un objeto o null
  const existingMentor = await Mentor.findOne({ email: data.email });

  if (existingMentor) {
    throw createError(409, "Mentor already exists");
  }

  const mentor = await Mentor.create(data);
  return mentor;
}

async function updateById(id, data) {
  const existingMentor = await Mentor.findById(id);

  if (!existingMentor) {
    throw createError(404, "Mentor not found");
  }

  const mentorUpdated = await Mentor.findByIdAndUpdate(id, data, { new: true });

  return mentorUpdated;
}

async function deleteById(id) {
  const existingMentor = await Mentor.findById(id);

  if (!existingMentor) {
    throw createError(404, "Mentor not found");
  }

  const mentorDeleted = await Mentor.findByIdAndDelete(id);

  return mentorDeleted;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
