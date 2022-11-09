const dataModel = require("../models/Todo")


exports.createTodo = async (req, res) => {
   if (!req?.body?.title || !req?.body?.description || !req?.body?.timestamp) {
    return res.status(400).json({ 'message': 'title description and timestamp are required'})
   }

   try {
    const result = await dataModel.create({
        title: req.body.title,
        description: req.body.description,
        timestamp: req.body.timestamp,
    });

    res.status(201).json(result);
   } catch (err) {
    console.error(err)
   }
}
exports.updateTodo = async(req, res) => {
   if (!req?.params?.id) {
        return res.status(400).json({'message': 'Id not available'})
   }
   const data = await dataModel.findOne({ _id: req.params.id }).exec()

   if (!data) {
        return res.status(204).json({ "message": `No Id matches ${req.params.id}.`})
   }
   if (req.body?.title) data.title = req.body.title;
   if (req.body?.description) data.description = req.body.description;
   if (req.body?.timestamp) data.timestamp = req.body.timestamp;
   const result = await data.save();
   res.json(result);
}
exports.deleteTodo = async(req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({'message': 'Id not available'})
   }
   const data = await dataModel.findOne({ _id: req.params.id }).exec()

   if (!data) {
        return res.status(204).json({ "message": `No Id matches ${req.body.id}.`})
   }
   const result = await data.deleteOne({ _id: req.body.id })
   res.json(result)
}
exports.getAllTodo = async(req, res) => {
    const data = await dataModel.find();
    if (!data) {
        return res.status(204).json('todo not found')
    }else {
        res.json(data);
    }
}