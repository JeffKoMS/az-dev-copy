---
title: Exercises for Azure developers
permalink: index.html
layout: home
---

<!--<link rel="stylesheet" href="/assets/topic-columns.css">-->

## Overview

The following exercises are designed to provide you with a hands-on learning experience in which you'll explore common tasks that developers perform when building and deploying solutions to Microsoft Azure.

> **Note**: To complete the exercises, you'll need an Azure subscription in which you have sufficient permissions and quota to provision the necessary Azure resources. If you don't already have one, you can sign up for an [Azure account](https://azure.microsoft.com/free). 

Some exercises may have additional, or different, requirements. Those will contain a **Before you start** section specific to that exercise.

## Topic areas
{% assign exercises = site.pages | where_exp:"page", "page.url contains '/instructions'" %}
{% assign grouped_exercises = exercises | group_by: "lab.topic" %}


{% assign total = grouped_exercises.size %}
{% assign half = total | divided_by: 2 %}
{% if total | modulo: 2 != 0 %}
	{% assign half = half | plus: 1 %}
{% endif %}

{% assign first_col = grouped_exercises | slice: 0, half %}
{% assign second_col = grouped_exercises | slice: half, total %}

| Topic |  |
|---|---|
{% for group in first_col %}
| [{{ group.name }}](#{{ group.name | slugify }}) | {% if second_col[forloop.index0] %}[{{ second_col[forloop.index0].name }}](#{{ second_col[forloop.index0].name | slugify }}){% else %} {% endif %} |
{% endfor %}

{% for group in grouped_exercises %}

## <a id="{{ group.name | slugify }}"></a>{{ group.name }} 

{% for activity in group.items %}
[{{ activity.lab.title }}]({{ site.github.url }}{{ activity.url }}) <br/> {{ activity.lab.description }}

---

{% endfor %}
<a href="#overview">Return to top</a>
{% endfor %}

