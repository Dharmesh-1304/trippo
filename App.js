const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Sample data for categories and products
const categories = [
  { id: 1, name: "Beach", description: "Products for sunny beach trips", image: "/images/beach.jpg" },
  { id: 2, name: "Mountain", description: "Gear for mountain adventures", image: "/images/mountain.jpg" },
  { id: 3, name: "City", description: "Essentials for urban explorers", image: "/images/city.jpg" },
];

const products = [
  { id: 1, name: "Sunscreen", category: "Beach", type:"Skincare", price: "$15", description: "Protect your skin under the sun.", image: "/images/sunscreen.jpg" },
  { id: 2, name: "Hiking Boots", category: "Mountain", type:"Accessories", price: "$80", description: "Durable and comfortable.", image: "/images/hikingboots.jpg" },
  { id: 3, name: "Travel Pouch", category: "City", type:"Accessories", price: "$25", description: "Stylish and compact.", image: "/images/travelpouch.jpg" },
];

// Routes
app.get("/", (req, res) => {
  res.render("index", { categories });
});

// app.get("/products/:category", (req, res) => {
//   const category = req.params.category;
//   const filteredProducts = products.filter((product) => product.category === category);
//   res.render("products", { category, filteredProducts });
// });

// drop down buttons
app.get("/products/:section", (req, res) => {
  const section = req.params.section;
  
  // Filter products for the requested section
  const filteredProducts = products.filter((product) =>
    (product.type.toLowerCase() === section.toLowerCase()) || (product.category.toLowerCase() === section.toLowerCase())
  );

  if (filteredProducts.length > 0) {
    res.render("products", { category: section, filteredProducts });
  } else {
    res.render("products", { category: section, filteredProducts: [] });
  }
});



// Search endpoint
app.get("/search", (req, res) => {
  const query = req.query.query; // Extract query from URL
  if (!query) {
    return res.send("Please enter a search term."); // Handle empty search
  }

  // Filter products based on the query
  const filteredProducts = products.filter((product) => product.category.toLowerCase().includes(query.toLowerCase()));

  if (filteredProducts.length > 0) {
    // Render a results page with the filtered products
    res.render("products", { category:`Results for "${query}"` , filteredProducts });
  } else {
    res.send(`<h2>No results found for "${query}".</h2>`); // No matches
  }
});





// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server running at http://localhost:${PORT}');
});