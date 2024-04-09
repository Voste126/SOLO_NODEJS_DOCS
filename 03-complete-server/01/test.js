const axios = require('axios');
const fs = require('fs');

// Unsplash API endpoint URL
const unsplashUrl = 'https://api.unsplash.com/photos?client_id=fT76e2PDYi7usDalelDv_PP43MzM2PriCwfzsdT4v2o';

// Function to fetch data from Unsplash API
async function fetchUnsplashData() {
    try {
        const response = await axios.get(unsplashUrl);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching data from Unsplash: ${error.message}`);
    }
}

// Function to format data according to the required structure
function formatData(data) {
    return data.map(item => ({
        id: item.id,
        description: item.description || '',
        imgThumb: item.urls.thumb,
        img: item.urls.regular,
        link: item.links.html,
        userId: item.user.id,
        userName: item.user.username,
        userLink: item.user.links.html,
        tags: item.tags ? item.tags.map(tag => tag.title) : [] // Ensure item.tags is an array before mapping
    }));
}

// Function to save data to JSON file
function saveDataToFile(data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync('products.json', jsonData);
    console.log('products.json file created successfully.');
}

// Main function to orchestrate the process
async function main() {
    try {
        // Fetch data from Unsplash API
        const unsplashData = await fetchUnsplashData();
        
        // Format the data
        const formattedData = formatData(unsplashData);
        
        // Save formatted data to JSON file
        saveDataToFile(formattedData);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// Call the main function
main();

