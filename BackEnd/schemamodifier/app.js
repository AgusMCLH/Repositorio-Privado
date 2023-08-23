import mongoose from 'mongoose';

const main = async () => {
  await mongoose.connect('');
  const userSchema = new mongoose.Schema({
    firstName: { type: String, max: 40 },
    lastName: { type: String, max: 40 },
    email: { type: String, unique: true, max: 100, index: true },
    password: { type: String },
    role: {
      type: String,
      max: 20,
      default: 'usuario',
      enum: ['usuario', 'administrador'],
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'carts',
      required: true,
      unique: true,
    },
    premium: { type: Boolean, default: false },
  });

  const userModel = mongoose.model('users', userSchema);

  let users = await userModel.find({});

  //   users.forEach((user) => {
  //     user.save();
  //   });

  //   users = await userModel.find({});
  console.log(users);
};

main();
