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

The industry standard for measuring sovereign credit risk (probability of government default) are the credit ratings assigned by S&P, Moody's, and Fitch. Businesses rely on these ratings to make decisions. Commercial banks for example, use the ratings to allocate loss provisions across countries. Yet the prevailing ratings system has long been criticized for being subjective and bias. One possible solution is to use unsupervised learning methods, such as clustering algorithms. The following experiment suggests that clustering is capable of outperforming credit rating agencies in predicting sovereign defaults.

**The Dataset**. 
I analyze a sample of 2,175 country-year observations which range from 2000 to 2021 and select 13 macroeconomic variables which are commonly used as inputs by agencies. (For example, real GDP growth, CPI inflation, current account balances, and central government debt). The variables are downloaded from the World Bank's database. They are imputed wherever missing, by taking the country's variable average if available, and the global average otherwise. Each observation is matched to an indicator variable for default, based off sovereign default estimates compiled by the Bank of Canada and the Bank of England. The latest figures are found [here](https://www.bankofcanada.ca/2024/07/staff-analytical-note-2024-19/). Every observation has a rating assigned by S&P, the data for which can be found on the company's website [here](https://www.spglobal.com/ratings/en/regulatory/article/-/view/sourceId/11824942). 

**The Experiment**.
Using a Gaussian Mixture Model, I cluster the observations based on their macroeconomic features, the year, and the indicator variable for default, lagged by a year. For a fair comparison, set the number of clusters to 22, which is the same number of classes under the credit-ratings system.  

Let us now see how these clusters perform compared to prevailing sovereign ratings. To do so, I fit two logit models that predict the probability of default: one using the clusters and the other using sovereign ratings as predictor variables. The training set is based on observations from 2000-2015, which gives us a test set that is roughly 40% of all observations. For validation, set all predicted probabilities that are greater than or equal to 0.5 as a predicted default.   

The table below summarizes the results. Except for recall under predicted defaults, the cluster-based model outperforms the ratings-based model, with an overall accuracy of 0.885 (a material improvement from 0.802).



|                 | precision | recall  | f1-score | support |
|-----------------|-----------|---------|----------|---------|
|**Cluster Model**|           |         |          |         |
| No Default      | 0.885     | 0.927   | 0.906    | 482     |
| Default         | 0.886     | 0.824   | 0.854    | 330     |
| accuracy        |           |         | 0.885    | 812     |
|**Ratings Model**|           |         |          |         |   
| No Default      | 0.892     | 0.774   | 0.829    | 461     |
| Default         | 0.697     | 0.848   | 0.765    | 282     |
| accuracy        |           |         | 0.802    | 743     |
