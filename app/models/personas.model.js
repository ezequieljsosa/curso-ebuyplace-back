module.exports = (sequelize, Sequelize) => {
  const Persona = sequelize.define("persona", {

    nombre: {
      type: Sequelize.STRING
    },
    disponible: {
      type: Sequelize.BOOLEAN
    }
  });

  return Persona;
};
