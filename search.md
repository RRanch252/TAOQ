---
layout: page
title: Search
permalink: /search/
---

<input type="text" id="search-input" placeholder="Search the library...">
<ul id="results-container"></ul>

<script src="https://unpkg.com/simple-jekyll-search/dest/simple-jekyll-search.min.js"></script>
<script>
SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '{{ site.baseurl }}/search.json',
  searchResultTemplate: '<li><a href="{url}">{title}</a> - {category}</li>',
  noResultsText: 'No results found',
  fuzzy: true
})
</script>
