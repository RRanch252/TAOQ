---
layout: default
title: Home
---

# Welcome to The Art of Quality Library

*A curated collection of ideas worth revisiting. A digital library focused on timeless knowledge, clear thinking, and intellectual craftsmanship.*

---

## Recent Additions

{% assign all_posts = site.books | concat: site.essays | concat: site.notes | concat: site.guides | sort: 'date' | reverse %}

{% for post in all_posts limit: 10 %}
<div class="post-preview">
  <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
  <p class="post-meta">
    {% if post.collection == "books" %}📚 Book{% endif %}
    {% if post.collection == "essays" %}📝 Essay{% endif %}
    {% if post.collection == "notes" %}📌 Note{% endif %}
    {% if post.collection == "guides" %}📖 Guide{% endif %}
    {% if post.author %} • {{ post.author }}{% endif %}
    • {{ post.date | date: "%B %Y" }}
  </p>
  {% if post.excerpt %}
    <p>{{ post.excerpt | strip_html | truncate: 200 }}</p>
  {% endif %}
</div>
{% endfor %}

---

## Featured Quote

> "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
> 
> — Aristotle

---

## Explore the Library

<div class="explore-grid">
  <div class="explore-item">
    <h3>📚 <a href="{{ '/books' | relative_url }}">Books</a></h3>
    <p>Deep dives into transformative books that have shaped our thinking.</p>
  </div>
  
  <div class="explore-item">
    <h3>📝 <a href="{{ '/essays' | relative_url }}">Essays</a></h3>
    <p>Original explorations of ideas, connections, and insights.</p>
  </div>
  
  <div class="explore-item">
    <h3>📌 <a href="{{ '/notes' | relative_url }}">Notes</a></h3>
    <p>Atomic insights and observations worth preserving.</p>
  </div>
  
  <div class="explore-item">
    <h3>📖 <a href="{{ '/guides' | relative_url }}">Guides</a></h3>
    <p>Practical knowledge and systematic approaches to learning.</p>
  </div>
</div>

---

## About This Library

Each piece is chosen for its lasting value—these are ideas worth returning to, concepts that deepen with each reading, and insights that compound over time.

The library is organized not by date but by depth. Some pieces are meant to be read once and understood. Others reveal new layers with each return. All are selected for their ability to change how we see and think.

*Currently housing {{ site.books.size | plus: site.essays.size | plus: site.notes.size | plus: site.guides.size }} pieces of curated content.*
