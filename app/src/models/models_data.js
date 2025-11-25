const { Model, DataTypes } = require("sequelize");
const connection = require("../models/db"); 


/* model for products*/

class Products extends Model {}

Products.init(
    {
        product_name: { 
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 100],
            },
        },
        category: { 
            type: DataTypes.ENUM("Bread", "Pastry", "Patisserie", "Snack"),
            allowNull: true,
        },
        price: { 
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0, // for price never -0
            },
        },
        ingredients: { 
            type: DataTypes.TEXT,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0, 
        },
        productionDate: { 
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW, 
        },
        expirationDate: { 
            type: DataTypes.DATE,
            allowNull: true,
        },
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    },
    {
        sequelize: connection,
        tableName: "Bakery_Products", 
        timestamps: true, 
    }
);

/*model for stocks*/
class Stock extends Model {}

Stock.init(
    {
        product_id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Bakery_Products',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        restock_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        sequelize: connection,
        tableName: "Stock",
        timestamps: true,
    }
);

/*model for order*/

class Order extends Model {}

Order.init(
    {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Bakery_Products',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        total_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        order_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        sequelize: connection,
        tableName: "Orders",
        timestamps: true,
    }
);


/* model for money*/

class Money extends Model {}

Money.init(
    {
        transaction_type: {
            type: DataTypes.ENUM("Income", "Expense"),
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        transaction_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        sequelize: connection,
        tableName: "Money_Transactions",
        timestamps: true,
    }
);

/* model for users*/

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: connection,
    tableName: 'users',
    timestamps: false,
  }
);

/*model for feeback*/

class Feedback extends Model{}

Feedback.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
        rate_add: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        rate_update: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        rate_inventory: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        rate_delete: {
            type: DataTypes.INTEGER,
            allowNull: false,
          }
    },
    {
        sequelize: connection,
        tableName: 'feedbacks',
        timestamps: true,
    }
);

module.exports = {Products, Stock, Order, Money, User, Feedback};