import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface bookingAttributes {
  id: number;
  booking_name: string;
  booking_price: number;
  booking_auth_id: string;
  booking_date?: Date;
}

export type bookingPk = "id";
export type bookingId = booking[bookingPk];
export type bookingOptionalAttributes = "id" | "booking_date";
export type bookingCreationAttributes = Optional<bookingAttributes, bookingOptionalAttributes>;

export class booking extends Model<bookingAttributes, bookingCreationAttributes> implements bookingAttributes {
  id!: number;
  booking_name!: string;
  booking_price!: number;
  booking_auth_id!: string;
  booking_date?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof booking {
    return booking.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    booking_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    booking_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    booking_auth_id: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    booking_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'booking',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
