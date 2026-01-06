'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.hasMany(models.MasterPlan, {
        foreignKey: 'userId', as: 'plans'
      });
      Profile.hasMany(models.Notification, {
        foreignKey: 'userId', as: 'notifications'
      });
      Profile.hasMany(models.DailyLog, {
        foreignKey: 'userId', as: 'logs'
      });

      
    }
  }
  Profile.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    age: DataTypes.INTEGER,
    location: DataTypes.STRING,
    personality: DataTypes.JSONB,
    dreams: DataTypes.TEXT,
    strengths: DataTypes.JSONB,
    weaknesses: DataTypes.JSONB,
    financial_goal: DataTypes.JSONB,
    monthly_income: DataTypes.DECIMAL,
    current_situation: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Profile',
  });

  return Profile;
};