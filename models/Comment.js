const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'name',
      },
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'project',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;


























// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');
// const User = require('./User');

// class Comment extends Model {}

// Comment.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: User,
//         key: 'id',
//       },
//     },
//     project_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'project',
//         key: 'id',
//       },
//     },
//     date_created: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'comment',
//   }
// );

// Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// module.exports = Comment;