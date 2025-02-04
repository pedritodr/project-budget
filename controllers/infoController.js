const infoController = {
    async get(req, res) {
        try {
            res.status(200).json({
                version: "1.0",
                name: "api-rest-budget"
                
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = infoController;