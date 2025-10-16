exports.checkID = (req,res,next) => {
    const id = req.params.id;
    if (Number(id) < 0) {
        return res.status(404).json({ status: "error", message : "Invalid ID parameter" })
    }
    next()
}