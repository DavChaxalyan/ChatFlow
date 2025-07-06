const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select('-password');
  res.json(users);
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, avatar } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username || user.username;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};