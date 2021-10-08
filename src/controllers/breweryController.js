const axios = require('axios');
const breweryApi = 'https://api.openbrewerydb.org/breweries';
const pexels = require('pexels');
const pexelsApiKey = '<<YOUR_API_KEY>>';
const client = pexels.createClient(pexelsApiKey);
const query = 'brewery'

const getAll = async function(request, response, next) {
    try {
        const allBreweries = await axios.get(breweryApi);
        const countAllBreweries = allBreweries.data.length;
        const images = await client.photos.search({query, per_page: countAllBreweries});
        return await response.render('./breweries/index', {allBreweries: allBreweries.data, images: images.photos});
    } catch(error) {
        response.json({
            message:error.response.data
        });
    }
}

const getById = async function(request, response, next) {
    const breweryId = request.params.id;
    try {
        const brewery = await axios.get(`${breweryApi}/${breweryId}`)
        const image = await client.photos.search({query, per_page: 15});
        const randomIndex = Math.floor(Math.random() *15);
        return await response.render('./breweries/singleBrewery', {brewery:brewery.data, image: image.photos[randomIndex].src.portrait});
    } catch(error) {
        response.json({
            message:error.response.data
        });
    }
}

module.exports = {
    getAll,
    getById
}
