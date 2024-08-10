const createError = require("http-errors");
const Koder = require("../models/koder.model");
const encryption = require("../lib/encrytion");
const jwt = require("../lib/jwt");

async function signUpKoder(data) {
  const koderFound = await Koder.findOne({ email: data.email });
  if (koderFound) {
    throw createError(409, "user already exists");
  }
  if (!data.password) {
    throw createError(400, "password is required");
  }
  if (data.password.length < 6) {
    throw createError(400, "password must be at least 6 characters");
  }
  const password = encryption.encrypt(data.password);
  data.password = password;
  const newKoder = await Koder.create(data);
  return newKoder;
}

async function login(data) {
  const koder = await Koder.findOne({ email: data.email }).select("+password");
  if (!koder) {
    throw createError(401, "invalid credentials");
  }
  const isValidPassword = encryption.compare(data.password, koder.password);
  if (!isValidPassword) {
    throw createError(401, "invalid credentials");
  }
  const token = jwt.sign({ id: koder._id });

  // retornamos un token
  return token;
}

async function create(data) {
  const newKoder = await Koder.create(data);
  return newKoder;
}

async function getAll() {
  const koders = await Koder.find({});
  return koders;
}

async function getById(id) {
  const koder = await Koder.findById(id);
  return koder;
}

async function updateById(id, newData) {
  const koderFound = await Koder.findById(id);

  if (!koderFound) {
    throw createError(400, "Koder not found");
  }

  const koder = await Koder.findByIdAndUpdate(id, newData, { new: true });
  return koder;
}

async function deleteById(id) {
  const koderFound = await Koder.findById(id);

  if (!koderFound) {
    throw createError(400, "Koder not found");
  }

  const deletedKoder = await Koder.findByIdAndDelete(id);
  return deletedKoder;
}

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  signUpKoder,
  login,
};
