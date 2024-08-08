const Department = require('../db/models/department-schema');

module.exports.getDepartment = async (req, res) => {
  const response = await Department.find();
  res.status(200).json(response);
};

module.exports.getDepartmentById = async (req, res) => {
  const { id } = req.params;
  const response = await Department.findById(id);
  res.status(200).json(response);
};

module.exports.postDepartment = async (req, res) => {
  const response = await Department.create({
    ...req.body,
    image: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`,
  });
  res.status(201).json(response);
};

module.exports.pdf = async (req, res) => {
  const { id } = req.params;

  const department = await Department.findById(id);
  res.render('pdf', { department });
};
