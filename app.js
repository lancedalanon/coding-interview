// app.js
const express = require("express");
const app = express();
const axios = require("axios");
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Problem 1

// Can you categorize the animalsArray into the following categories?

// Desired Output
// {
//     Mammals: [ 'Elephant' ],
//     Birds: [ 'Eagle' ],
//     Insects: [ 'Dragonfly' ]
// }

//

// First, we need to define the Animal Category and Animal Names array
const animalsArray = ["Elephant", "Eagle", "Dragonfly"];
const animalsCategory = ["Mammals", "Birds", "Insects"];

// Next, we need to create a function containing a for loop that will iterate through
// the animals and categories together and form the categorizedAnimalsArray array  
const categorizeAnimals = (animalsArray, animalsCategory) => {
  const categorizedAnimalsArray = {};

  // Loop through the animals and categories arrays simultaneously
  // The categorization of animals will be based on the index of the category
  animalsArray.forEach((animal, index) => {
    const category = animalsCategory[index];
    // Initialize the category array if it doesn't exist
    if (!categorizedAnimalsArray[category]) {
      categorizedAnimalsArray[category] = [];
    }
    // Add the animal to the category array
    categorizedAnimalsArray[category].push(animal);
  });

  return categorizedAnimalsArray;
};

// Finally, we implement the API to call for our categorized animals
// This should output the following:
// {
//     Mammals: [ 'Elephant' ],
//     Birds: [ 'Eagle' ],
//     Insects: [ 'Dragonfly' ]
// }
app.get("/categorized-animals", (req, res) => {
  const categorizedAnimals = categorizeAnimals(animalsArray, animalsCategory);
  res.json(categorizedAnimals);
});

// Problem 2

// After you get the design output create an API call to this API endpoint
// https://api.api-ninjas.com/v1/animals
// Or Visit this URL for more info: https://api-ninjas.com/api/animals
// API-Key to use: ccCBd7oOPGXnF/Byo9+rUw==FrPn9rqGncHCgE4u

// First we define the API KEY
const API_KEY = "ccCBd7oOPGXnF/Byo9+rUw==FrPn9rqGncHCgE4u";

// Then we create a function to make the API call
async function fetchAnimals(name) {
  const endpoint = `https://api.api-ninjas.com/v1/animals?name=${name}`;
  
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching animal data:", error);
    throw error;
  }
}

// Finally implement the API for the animal fetching of data
// This will require the name of the animal as name to the parameter
// Example working API call: http://127.0.0.1:3000/animals?name=cheetah
// Example Output:
// [
//   {
//       "name": "Cheetah",
//       "taxonomy": {
//           "kingdom": "Animalia",
//            other taxonomy
//       },
//       "locations": [
//           "Africa",
//            other locations
//       ],
//       "characteristics": {
//           "prey": "Gazelle, Wildebeest, Hare",
//            other characteristics
//       }
//   }
// ]
app.get("/animals", async (req, res) => {
  const name = req.query.name;
  
  if (!name) {
    return res.status(400).json({ error: "Name parameter is required" });
  }
  
  try {
    const data = await fetchAnimals(name);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch animal data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
