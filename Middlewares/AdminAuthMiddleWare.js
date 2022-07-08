const User = require('../Models/User')
exports.AdminAuthMiddleWare = async (req, res, next) => {
  const { email } = req.user
  const adminUser = await User.findOne({ email }).exec()
  if (adminUser.role === 'admin') {
    next()
  } else {
    res.status(403).json({ error: 'access denied' })
  }
}
