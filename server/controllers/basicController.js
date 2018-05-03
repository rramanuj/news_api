const basicController = {};
basicController.get= (req,res) => {
    res.json({
        message: 'Welcome to X&ZUMO.'
    })
};
export default basicController;