let currentIndex = 0;
const slideDuration = 2500; // Set slide duration in milliseconds (e.g., 5000ms = 5 seconds)
let slideInterval;

// Navigate to category page
function navigateToCategory(category) {
  window.location.href = `/products/${category}`;
}

// Move slides
function moveSlide(step) {
  const slides = document.querySelectorAll(".carousel-slide");
  slides[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + step + slides.length) % slides.length;
  slides[currentIndex].classList.add("active");
}

// Auto-play slides
function startAutoPlay() {
  slideInterval = setInterval(() => {
    moveSlide(1);
  }, slideDuration);
}

// Stop auto-play on user interaction
function stopAutoPlay() {
  clearInterval(slideInterval);
}

// Initialize the carousel
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  if (slides.length > 0) slides[0].classList.add("active");

  // Start the auto-play
  startAutoPlay();

  // Pause auto-play when user interacts (e.g., clicks next/prev)
  document.querySelectorAll(".carousel-btn").forEach((btn) => {
    btn.addEventListener("click", stopAutoPlay);
  });
});

// Function to handle search icon click
function triggerSearch() {
  const query = document.getElementById("searchInput").value.trim();
  if (query) {
    console.log(`Searching for: ${query}`);
    window.location.href = `/search?query=${encodeURIComponent(query)}`;
  } else {
    alert("Please enter a search query.");
  }
}

// Function to handle Enter key in the search bar
function handleSearch(event) {
  if (event.key === "Enter") {
    triggerSearch(); // Reuse the same function
  }
}

// Add an event listener to the search bar for Enter key
document.getElementById("searchInput").addEventListener("keydown", handleSearch);

// Add an event listener to the search icon
document.getElementById("searchIcon").addEventListener("click", triggerSearch);