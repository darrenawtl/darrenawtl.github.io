---
title: "Towards objectivity in sovereign credit ratings"
date: 2025-06-10
layout: single
author_profile: true
categories:
  - blog
tags:
  - Clustering
  - Sovereign defaults
---

Is there a way for us to objectively measure sovereign credit risk? The following experiment suggests that even a simple k-means algorithm is capable of outperforming credit rating agencies in predicting sovereign defaults. 

**The Dataset**  
To measure sovereign defaults, I'll use estimates compiled by the Bank of Canada and the Bank of England. The latest figures are found [here](https://www.bankofcanada.ca/2024/07/staff-analytical-note-2024-19/).  
The World Bank has a database of macroeconomic indicators, which also conveniently has an API.


