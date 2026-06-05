const { Note, User } = require('../models')

const getAll = async (_req, res) => {
  const notes = await Note.findAll({
    include: [{ model: User, attributes: ['username', 'name'] }],
  })
  res.json(notes)
}

const create = async (req, res) => {
  const { content, important } = req.body
  if (!content) {
    return res.status(400).json({ error: 'Content is required' })
  }

  const note = await Note.create({
    content,
    important: important ?? false,
    userId: req.user.id,
  })

  res.status(201).json(note)
}

const update = async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (!note) return res.status(404).json({ error: 'Note not found' })

  if (note.userId !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized' })
  }

  const updated = await note.update({ important: req.body.important })
  res.json(updated)
}

const remove = async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (!note) return res.status(404).json({ error: 'Note not found' })

  if (note.userId !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized' })
  }

  await note.destroy()
  res.status(204).end()
}

module.exports = { getAll, create, update, remove }
