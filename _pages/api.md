---
title: API 참고서
permalink: /docs/api/
layout: docs
category: ignore
breadcrumb: API
---

<h2 class="docs-heading pb-3 mb-3"><span class="mega-octicon octicon-gear pr-3"></span>API 참고서</h2>

<table class="table table-ruled table-full-width table-with-spacious-second-column">
<tr>
  <th>API</th><th>프로세스</th><th>설명</th>
</tr>

{% assign docs = site.docs | sort: 'sort_title' %}
{% for doc in docs %}
  {% if doc.category == 'API' %}
    <tr>
      <td><a href="{{ site.baseurl }}{{ doc.url }}">{{ doc.title }}</a></td>
      <td>{{ site.data.processes[doc.title] | replace: 'Process', '' | replace: 'Processes', '' }}</td>
      <td>{{ doc.excerpt }}</td>
    </tr>
  {% endif %}
{% endfor %}
</table>
