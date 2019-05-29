module.exports = (req, res, next) => {
  const body = req.body

  // Validate required fields
  if (!body.name || !body.code) {
    return res.status(400).json({
      error: 'The name and code cannot be empty'
    })
  }

  next()
}
