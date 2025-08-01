const users = []; // In-memory user store
let nextId = 1;

const User = {
  async findOne({ email }) {
    return users.find(user => user.email === email);
  },

  async findById(id) {
    return users.find(user => user._id === id);
  },

  async create({ name, email, password }) {
    const newUser = {
      _id: String(nextId++),
      name,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(newUser);
    return newUser;
  },
};

module.exports = User;
