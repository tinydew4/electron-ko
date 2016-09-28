---
title: Versions
permalink: /docs/versions/
layout: docs
category: ignore
---


## 이전 버전

{% for version in site.available_versions reversed %}
- [{{ version }}](https://github.com/electron/electron/tree/{{ version }}/docs)
{% endfor %}
