import type { Sequelize } from "sequelize";
import { booking as _booking } from "./booking";
import type { bookingAttributes, bookingCreationAttributes } from "./booking";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";

export {
  _booking as booking,
  _user as user,
};

export type {
  bookingAttributes,
  bookingCreationAttributes,
  userAttributes,
  userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const booking = _booking.initModel(sequelize);
  const user = _user.initModel(sequelize);

  user.hasMany(booking, {
    foreignKey: "booking_auth_id",
  })

  booking.belongsTo(user, {
      foreignKey: "booking_auth_id", 
  })

  // example of on delete and on update constraint
  // Foo.hasOne(Bar, {
  //   onDelete: 'RESTRICT',
  //   onUpdate: 'RESTRICT'
  // });

  return {
    booking: booking,
    user: user,
  };
}
