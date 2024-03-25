const fetch = require('node-fetch');

module.exports = {
    list: async (req, res) => {
        try {
            const response = await fetch('https://apis.datos.gob.ar/georef/api/provincias');
            const provinces = await response.json();
            res.render('editProfile', { provinces: provinces.provincias });
        } catch (error) {
            console.error('Error fetching provinces:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};
