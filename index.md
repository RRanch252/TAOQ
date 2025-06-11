---
layout: home
title: "The Art of Quality Library"
author_profile: false
classes: wide
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
---

> A curated collection of ideas worth revisiting. A digital library focused on timeless knowledge, clear thinking, and intellectual craftsmanship.

---

## Recent Additions

<div class="entries-list">
  {% assign all_posts = site.books | concat: site.essays | concat: site.notes | concat: site.guides | sort: 'date' | reverse %}
  {% for post in all_posts limit: 10 %}
    <article class="archive__item">
      <h3 class="archive__item-title no_toc">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h3>
      <p class="archive__item-excerpt">
        <small>
          {% case post.collection %}
            {% when 'books' %}📚 Book Summary{% when 'essays' %}📝 Essay{% when 'notes' %}📌 Note{% when 'guides' %}📖 Guide
          {% endcase %}
          {% if post.author %} • {{ post.author }}{% endif %}
          • {{ post.date | date: "%B %Y" }}
          {% if post.read_time %} • {% include read-time.html %}{% endif %}
        </small>
      </p>
      {% if post.excerpt %}
        <p class="archive__item-excerpt">{{ post.excerpt | markdownify | strip_html | truncate: 200 }}</p>
      {% endif %}
    </article>
  {% endfor %}
</div>

---

## Featured Quote

> "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
> 
> <cite>— Aristotle</cite>

---

## Explore the Library

<div class="feature__wrapper">
  <div class="feature__item">
    <div class="archive__item">
      <div class="archive__item-body">
        <h3 class="archive__item-title">📚 Books</h3>
        <div class="archive__item-excerpt">
          <p>Deep dives into transformative books that have shaped our thinking. Currently featuring {{ site.books.size }} carefully selected summaries.</p>
          <p><a href="{{ '/books/' | relative_url }}" class="btn btn--primary">Browse Books</a></p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="feature__item">
    <div class="archive__item">
      <div class="archive__item-body">
        <h3 class="archive__item-title">📝 Essays</h3>
        <div class="archive__item-excerpt">
          <p>Original explorations of ideas, connections, and insights. {{ site.essays.size }} pieces on thinking, creativity, and understanding.</p>
          <p><a href="{{ '/essays/' | relative_url }}" class="btn btn--primary">Read Essays</a></p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="feature__item">
    <div class="archive__item">
      <div class="archive__item-body">
        <h3 class="archive__item-title">📌 Notes</h3>
        <div class="archive__item-excerpt">
          <p>Atomic insights and observations worth preserving. {{ site.notes.size }} concentrated thoughts and revelations.</p>
          <p><a href="{{ '/notes/' | relative_url }}" class="btn btn--primary">View Notes</a></p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="feature__item">
    <div class="archive__item">
      <div class="archive__item-body">
        <h3 class="archive__item-title">📖 Guides</h3>
        <div class="archive__item-excerpt">
          <p>Practical knowledge and systematic approaches to learning. {{ site.guides.size }} guides for building better thinking systems.</p>
          <p><a href="{{ '/guides/' | relative_url }}" class="btn btn--primary">Explore Guides</a></p>
        </div>
      </div>
    </div>
  </div>
</div>

---

## About This Library

Each piece is chosen for its lasting value—these are ideas worth returning to, concepts that deepen with each reading, and insights that compound over time.

The library is organized not by date but by depth. Some pieces are meant to be read once and understood. Others reveal new layers with each return. All are selected for their ability to change how we see and think.

This is not a blog that chases the new, but a library that honors the enduring. It's a space for slow thinking in a fast world, for depth in an age of surfaces, for synthesis when everything pushes toward fragmentation.

**Currently housing {{ site.books.size | plus: site.essays.size | plus: site.notes.size | plus: site.guides.size }} pieces of carefully curated content.**

---

*Last updated: {{ site.time | date: "%B %d, %Y" }}*
