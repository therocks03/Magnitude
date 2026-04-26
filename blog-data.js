// Blog Data Store — Magnitude Academy
// Purely static system — Always uses the data in this file.

// ALL YOUR POSTS ARE STORED IN THIS ARRAY
// When you download this file from the editor, this list updates.
const SEED_POSTS = [
  {
    id: 'jee-2026-preparation-strategy',
    title: 'Complete JEE 2026 Preparation Strategy: Month-by-Month Guide',
    excerpt: 'A detailed roadmap from our IITian faculty on how to plan your JEE Main & Advanced preparation for 2026.',
    content: `## Why a Structured Strategy Matters...`,
    author: 'Prof. Rajesh Sharma',
    authorRole: 'IIT Delhi Alumnus',
    category: 'JEE Preparation',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2070',
    coverColor: 'linear-gradient(135deg, #C0392B 0%, #E74C3C 50%, #F39C12 100%)',
    date: '2026-04-20',
    readTime: 8,
    featured: true
  },
  {
    id: 'neet-biology-score-boost',
    title: 'How to Score 350+ in NEET Biology: Chapter-wise Weightage',
    excerpt: 'Biology accounts for 360 marks in NEET. Learn the exact chapter-wise weightage from our NEET mentors.',
    content: `## Biology Is Your Ticket to a Top Medical College...`,
    author: 'Dr. Meera Patel',
    authorRole: 'NEET Biology Expert',
    category: 'NEET Preparation',
    coverImage: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=2070',
    coverColor: 'linear-gradient(135deg, #27AE60 0%, #2ECC71 50%, #1ABC9C 100%)',
    date: '2026-04-15',
    readTime: 6,
    featured: true
  }
];

// Returns all posts — Always uses the file's SEED_POSTS list
function getBlogPosts() {
  return [...SEED_POSTS];
}

// Returns a single post by ID
function getBlogPost(id) {
  return getBlogPosts().find(p => p.id === id) || null;
}

// Used by the editor to update the list in memory before download
function addBlogPostLocal(post) {
  SEED_POSTS.unshift(post);
  return SEED_POSTS;
}

function getCategories() {
  return ['JEE Preparation', 'NEET Preparation', 'Board Exams', 'Education Insights', 'Product Updates'];
}

// Helper to generate the full JS file content for download
function generateDataFileContent(posts) {
  return `// Blog Data Store — Magnitude Academy
// Purely static system — Always uses the data in this file.

const SEED_POSTS = ${JSON.stringify(posts, null, 2)};

function getBlogPosts() {
  return [...SEED_POSTS];
}

function getBlogPost(id) {
  return getBlogPosts().find(p => p.id === id) || null;
}

function addBlogPostLocal(post) {
  SEED_POSTS.unshift(post);
  return SEED_POSTS;
}

function getCategories() {
  return ['JEE Preparation', 'NEET Preparation', 'Board Exams', 'Education Insights', 'Product Updates'];
}

function generateDataFileContent(posts) {
  return ""; // Not needed in the exported file
}
`;
}
