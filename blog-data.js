// Blog Data Store — Magnitude Academy
// Purely static system — Always uses the data in this file.

const SEED_POSTS = [
  {
    "id": "highly-important-points-for-neet-2026",
    "title": "Highly Important Points for NEET 2026",
    "content": "🎯 NEET Exam Day Checklist (Do This Exactly)\n\n🌅 1. Morning Routine\n\nWake up at least 3–4 hours before exam\n\nLight revision only:\n\nBiology NCERT highlights\n\nKey formulas (Physics + Chem)\n\nEat light, familiar food (avoid anything new/heavy)\n\nStay hydrated (but don’t overdrink)\n\n🎒 2. What to Carry\n\nAdmit card (2–3 printouts)\n\nValid ID proof (Aadhar/PAN/etc.)\n\nPassport-size photos (same as application)\n\nTransparent water bottle\n\nSimple analog watch (if allowed)\n\nBlue/black ball pen (as per instructions)\n\n🚫 Avoid:\n\nGadgets, notes, calculators, smart watches\n\n📍 3. Reach Early\n\nReach center 60–90 minutes before\n\nAvoid last-minute panic or rushing\n\nLocate your room & seat calmly\n\n🧠 4. Before Paper Starts\n\nDon’t discuss tough topics with others\n\nStay calm—your preparation is already done\n\nRead instructions carefully on OMR\n\n⏱️ 5. Attempt Strategy (Very Important)\n\nSuggested Order:\n\n👉 Biology → Chemistry → Physics\n\nTime Split:\n\n🧬 Biology → 50–60 min\n\n⚗️ Chemistry → 40–45 min\n\n⚙️ Physics → 60–70 min\n\n🧾 6. While Solving Paper\n\n✔ First Round\n\nSolve easy + direct questions only\n\nSkip anything confusing immediately\n\n✔ Second Round\n\nAttempt moderate questions\n\nUse elimination method\n\n✔ Final Round\n\nAttempt only if ≥50% sure\n\n⚠️ 7. Negative Marking Control\n\nAvoid blind guessing\n\nEach wrong = -1 mark = rank drop\n\nFocus on accuracy > attempts\n\n📝 8. OMR Sheet Rules\n\nFill bubbles carefully & immediately\n\nDon’t leave too many for the end\n\nDouble-check question number vs bubble\n\n😌 9. If You Panic During Exam\n\nPause for 10–15 seconds\n\nTake 3 deep breaths\n\nRestart with Biology (confidence booster)\n\n🚨 10. Common Mistakes to Avoid\n\n❌ Spending too long on one question\n\n❌ Misreading NCERT-based questions\n\n❌ OMR bubbling errors\n\n❌ Over-attempting due to pressure\n\n🔥 Final Mindset\n\nPaper is same for everyone\n\nTough paper = lower cutoff = advantage\n\nStay consistent, not emotional\n\n",
    "excerpt": "🎯 NEET Exam Day Checklist (Do This Exactly)\n\n🌅 1. Morning Routine\n\nWake up at least 3–4 hours before exam\n\nLight revision only:\n\nBiology NCERT highl...",
    "coverImage": "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=2070",
    "author": "Admin",
    "authorRole": "Educator",
    "category": "NEET Preparation",
    "coverColor": "var(--red)",
    "date": "2026-04-26",
    "readTime": 2,
    "featured": false
  },
  {
    "id": "jee-2026-preparation-strategy",
    "title": "Complete JEE 2026 Preparation Strategy: Month-by-Month Guide",
    "excerpt": "A detailed roadmap from our IITian faculty on how to plan your JEE Main & Advanced preparation for 2026.",
    "content": "## Why a Structured Strategy Matters...",
    "author": "Prof. Rajesh Sharma",
    "authorRole": "IIT Delhi Alumnus",
    "category": "JEE Preparation",
    "coverImage": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2070",
    "coverColor": "linear-gradient(135deg, #C0392B 0%, #E74C3C 50%, #F39C12 100%)",
    "date": "2026-04-20",
    "readTime": 8,
    "featured": true
  },
  {
    "id": "neet-biology-score-boost",
    "title": "How to Score 350+ in NEET Biology: Chapter-wise Weightage",
    "excerpt": "Biology accounts for 360 marks in NEET. Learn the exact chapter-wise weightage from our NEET mentors.",
    "content": "## Biology Is Your Ticket to a Top Medical College...",
    "author": "Dr. Meera Patel",
    "authorRole": "NEET Biology Expert",
    "category": "NEET Preparation",
    "coverImage": "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=2070",
    "coverColor": "linear-gradient(135deg, #27AE60 0%, #2ECC71 50%, #1ABC9C 100%)",
    "date": "2026-04-15",
    "readTime": 6,
    "featured": true
  }
    {
    "id": "vidya-ai-tutor-launch",
    "title": "Introducing Vidya AI Tutor: Your 24/7 Doubt-Solving Companion",
    "excerpt": "We built India's first AI tutor specifically designed for JEE & NEET students. Ask doubts anytime — even at 2 AM.",
    "content": "## Meet Vidya — Your AI Study Partner\n\nImagine having an IITian available **24 hours a day** to answer any question and generate practice problems on demand. That's Vidya.\n\n---\n\n## How Vidya Works\n\n1. **Ask Your Doubt**: Type or photograph your question.\n2. **Get Instant Explanation**: Vidya provides step-by-step solutions.\n3. **Practice More**: Get 3 similar problems to test your understanding.\n\n---\n\n## Available at 2 AM\nOur data shows that 23% of student doubts come between 11 PM and 3 AM. Vidya never sleeps. Every Magnitude student gets **unlimited access**.",
    "author": "Magnitude Tech",
    "authorRole": "Engineering Team",
    "category": "Product Updates",
    "coverImage": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070",
    "coverColor": "linear-gradient(135deg, #2980B9 0%, #3498DB 50%, #1ABC9C 100%)",
    "date": "2026-03-28",
    "readTime": 4,
    "featured": false
  }

];

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
