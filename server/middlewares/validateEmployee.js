module.exports = (req, res, next) => {
  const body = req.body

  // Validate required fields
  if (!body.name || !body.code) {
    return res.status(400).json({
      error: 'The name and code cannot be empty'
    })
  }

  // Validate color
  if (validateColor(body.color)) {
    return res.status(400).json({
      error: 'Color should be a valid hexadecimal value'
    })
  }

  next()
}

function validateColor (color) {
  if (!color) {
    return true
  }
  return isHexadecimal(color)
}

function isHexadecimal (str) {
  const regexp = /^[0-9a-fA-F]+$/
  return regexp.test(str)
}
