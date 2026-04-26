// Blog Data Store — Magnitude Academy
// Connects to Cloudflare KV via Pages Functions API

const BLOG_STORAGE_KEY = 'magnitude_blog_posts';
const API_URL = '/api/posts';

// Fallback seed posts to ensure the site looks great immediately
const SEED_POSTS = [
  {
    id: 'jee-2026-preparation-strategy',
    title: 'Complete JEE 2026 Preparation Strategy: Month-by-Month Guide',
    excerpt: 'A detailed roadmap from our IITian faculty on how to plan your JEE Main & Advanced preparation for 2026 — covering syllabus division and mock-test schedules.',
    content: `## Why a Structured Strategy Matters

Every year, lakhs of students sit for JEE, but only those with a **clear, month-by-month plan** end up cracking it. At Magnitude Academy, our IITian faculty have coached 1,000+ students through this exact journey. Here's the playbook.

---

## Phase 1 — Foundation Building (June – September)

### Months 1–2: Solidify the Basics
- **Physics:** Kinematics, Laws of Motion, Work-Energy-Power
- **Chemistry:** Atomic Structure, Periodic Table, Chemical Bonding
- **Maths:** Sets, Relations, Trigonometric Functions

> 💡 **Pro Tip:** Don't skip NCERT. 30% of JEE Main questions are directly NCERT-based.

---

## Phase 2 — Deep Dive (October – January)

This is where most students either surge ahead or fall behind. Tackle **Organic Chemistry** early — it compounds over time. **Calculus** is king for JEE Advanced. Take **weekly mock tests** and analyse every wrong answer.

---

## Key Takeaways

1. Start early and stay consistent.
2. Choose your teachers wisely — at Magnitude, you pick your IITian mentor.
3. Use technology — AI doubt solving, app-based revision, and analytics dashboards.`,
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
    excerpt: 'Biology accounts for 360 marks in NEET. Learn the exact chapter-wise weightage and scoring shortcuts from our NEET mentors.',
    content: `## Biology Is Your Ticket to a Top Medical College

In NEET, Biology carries **360 out of 720 marks** — exactly half the paper. If you master Biology, you're already halfway to AIIMS.

---

## Highest-Weightage Chapters

### Botany
- Genetics & Molecular Biology (5–6 Qs)
- Ecology & Environment (4–5 Qs)
- Plant Physiology

### Zoology
- Human Physiology (7–8 Qs)
- Biotechnology (3–4 Qs)
- Animal Kingdom

---

## Top Scoring Tips

1. **NCERT Is Your Bible**: Read every line, diagram, and footnote.
2. **Diagram Practice**: Draw at least 5 diagrams daily.
3. **Use Mnemonics**: Our Vidya AI Tutor can generate custom mnemonics for any topic.`,
    author: 'Dr. Meera Patel',
    authorRole: 'NEET Biology Expert',
    category: 'NEET Preparation',
    coverImage: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=2070',
    coverColor: 'linear-gradient(135deg, #27AE60 0%, #2ECC71 50%, #1ABC9C 100%)',
    date: '2026-04-15',
    readTime: 6,
    featured: true
  },
  {
    id: 'vidya-ai-tutor-launch',
    title: 'Introducing Vidya AI Tutor: Your 24/7 Doubt-Solving Companion',
    excerpt: 'We built India\'s first AI tutor specifically designed for JEE & NEET students. Ask doubts anytime — even at 2 AM.',
    content: `## Meet Vidya — Your AI Study Partner

Imagine having an IITian available **24 hours a day** to answer any question and generate practice problems on demand. That's Vidya.

---

## How Vidya Works

1. **Ask Your Doubt**: Type or photograph your question.
2. **Get Instant Explanation**: Vidya provides step-by-step solutions.
3. **Practice More**: Get 3 similar problems to test your understanding.

---

## Available at 2 AM
Our data shows that 23% of student doubts come between 11 PM and 3 AM. Vidya never sleeps. Every Magnitude student gets **unlimited access**.`,
    author: 'Magnitude Tech',
    authorRole: 'Engineering Team',
    category: 'Product Updates',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070',
    coverColor: 'linear-gradient(135deg, #2980B9 0%, #3498DB 50%, #1ABC9C 100%)',
    date: '2026-03-28',
    readTime: 4,
    featured: false
  }
];

async function getBlogPosts() {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const livePosts = await response.json();
      if (livePosts && livePosts.length > 0) return livePosts;
    }
  } catch (e) {
    console.warn("API fallback to static data");
  }

  const local = localStorage.getItem(BLOG_STORAGE_KEY);
  if (local) {
    const parsed = JSON.parse(local);
    if (parsed.length > 0) return parsed;
  }
  
  return [...SEED_POSTS];
}

async function getBlogPost(id) {
  const posts = await getBlogPosts();
  return posts.find(p => p.id === id) || null;
}

async function addBlogPost(post, password) {
  const posts = await getBlogPosts();
  posts.unshift(post);
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post, password })
    });
    return await response.json();
  } catch (e) {
    return { error: "Could not connect to server" };
  }
}

function getCategories() {
  return ['JEE Preparation', 'NEET Preparation', 'Board Exams', 'Education Insights', 'Product Updates'];
}
