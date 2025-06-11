---
layout: home
title: Home
---

# Welcome to The Art of Quality Library

> A curated collection of ideas worth revisiting. A digital library focused on timeless knowledge, clear thinking, and intellectual craftsmanship.

## Featured Quote

> "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
> — Aristotle

## Recent Additions

<div class="home-content">
{% for book in site.books limit:3 %}
  <article class="post-preview">
    <h3><a href="{{ book.url | relative_url }}">{{ book.title }}</a></h3>
    <p class="post-meta">{{ book.author }} • {{ book.date | date: "%B %Y" }}</p>
    <p>{{ book.excerpt }}</p>
  </article>
{% endfor %}

{% for essay in site.essays limit:3 %}
  <article class="post-preview">
    <h3><a href="{{ essay.url | relative_url }}">{{ essay.title }}</a></h3>
    <p class="post-meta">Essay • {{ essay.date | date: "%B %Y" }}</p>
    <p>{{ essay.excerpt }}</p>
  </article>
{% endfor %}
</div>

## Explore by Type

- [📚 Books]({{ site.baseurl }}/books/) - Deep dives into transformative books
- [📝 Essays]({{ site.baseurl }}/essays/) - Original thinking and explorations  
- [📌 Notes]({{ site.baseurl }}/notes/) - Atomic insights and observations
- [📖 Guides]({{ site.baseurl }}/guides/) - Practical knowledge and how-tos

## About This Library

Each piece is chosen for its lasting value—these are ideas worth returning to, concepts that deepen with each reading, and insights that compound over time.
