'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MasterPlan extends Model {
    static associate(models) {
      MasterPlan.belongsTo(models.Profile, {
        foreignKey: 'userId'
      });
    }
  }

  MasterPlan.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    goal_90_days: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    roadmap: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    micro_habits: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    income_ideas: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    eliana_message: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'MasterPlan',
  });

  return MasterPlan;
};
