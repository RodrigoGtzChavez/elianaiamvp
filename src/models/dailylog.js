'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DailyLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DailyLog.belongsTo(models.Profile, {
        foreignKey: 'userId', as: 'logs'
      });
    }
  }
  DailyLog.init({
    userId: DataTypes.UUID,
    date: DataTypes.DATE,
    mood: DataTypes.STRING,
    actionsCompleted: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'DailyLog',
  });
  return DailyLog;
};
