const db = require("../models");
const Persona = db.personas;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  // Validate request
  console.log(1)
  if (!req.body.nombre || (req.body.nombre > 0)) {
    console.log(2)
    console.log(req.body)
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  const persona = {
    id: req.body.id,
    nombre: req.body.nombre,
    disponible: req.body.disponible ? req.body.disponible : false
  };


  Persona.create(persona)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Persona."
      });
    });
};


exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  Persona.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving personas."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Persona.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Persona with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Persona with id=" + id
      });
    });
};


exports.update = (req, res) => {
  const id = req.params.id;

  Persona.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Persona was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Persona with id=${id}. Maybe Persona was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Persona with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Persona.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Persona was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Persona with id=${id}. Maybe Persona was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Persona with id=" + id
      });
    });
};


exports.deleteAll = (req, res) => {
  Persona.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Personas were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all personas."
      });
    });
};


exports.findAllPublished = (req, res) => {
  Persona.findAll({ where: { disponible: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving personas."
      });
    });
};
