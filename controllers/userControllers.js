const { User } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

async deleteUser(req, res) {
  try {
    const userOne = await User.findOneAndRemove({ _id: req.params.userId });

    if (!userOne) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    const user = await User.findOneAndUpdate(
      { users: req.params.userId },
      { $pull: { users: req.params.userId } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: 'User deleted but no user with this id!' });
    }

    res.json({ message: 'User successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
},

async addUserFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(user);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
},
// Remove user friend
async removeUserFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}


}