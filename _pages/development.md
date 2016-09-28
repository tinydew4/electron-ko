---
title: 개발
permalink: /docs/development/
layout: docs
category: ignore
breadcrumb: 개발
---

<h2 class="docs-heading pb-3 mb-3"><span class="mega-octicon octicon-tools pr-3"></span>Electron 개발</h2>

<ul class="docs-list">
{% assign docs = site.docs | sort: 'sort_title' %}
{% for doc in docs %}
  {% if doc.category == 'Development' %}
    <li>
      <a href="{{ site.baseurl }}{{ doc.url }}">{{ doc.title }}</a>
      <!-- <span class="excerpt">{{ doc.content | strip_html | truncatewords: 50 }}</span> -->
    </li>
  {% endif %}
{% endfor %}
</ul>
