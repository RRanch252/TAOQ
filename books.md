---
layout: page
title: Books
permalink: /books/
---

# Book Summaries

Comprehensive analyses of books that have shaped my thinking.

{% for book in site.books %}
<article class="post-preview">
  <h2><a href="{{ book.url | relative_url }}">{{ book.title }}</a></h2>
  <p class="post-meta">{{ book.author }} • {{ book.date | date: "%B %Y" }}</p>
  <p>{{ book.excerpt }}</p>
  <p class="tags">
    {% for tag in book.tags %}
      <span class="tag">{{ tag }}</span>
    {% endfor %}
  </p>
</article>
{% endfor %}
