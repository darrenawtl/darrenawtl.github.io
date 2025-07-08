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

The industry standard for measuring sovereign credit risk (probability of government default) are the credit ratings assigned by S&P, Moody's, and Fitch. Businesses rely on these ratings to make important decisions. Commercial banks for example, use the ratings to allocate loss provisions across countries. Yet the prevailing ratings system has long been criticized for being subjective and bias. A simple solution to the problem is to use unsupervised learning methods, such as clustering algorithms. The following experiment suggests that clustering is capable of outperforming credit rating agencies in predicting sovereign defaults.

**The Dataset** 
We analyze a sample of 2,175 country-year observations and select 13 macroeconomic variables which are commonly used as inputs by agencies. (For example, real GDP growth, CPI inflation, current account balances, and central government debt). The variables are downloaded from the World Bank's database. They are imputed wherever missing, by taking the country's variable average if available, and the global average otherwise. Each observation is matched to an indicator variable for default, based off sovereign default estimates compiled by the Bank of Canada and the Bank of England. The latest figures are found [here](https://www.bankofcanada.ca/2024/07/staff-analytical-note-2024-19/). Every observation has a rating assigned by S&P, the data for which can be found on the company's website [here](https://www.spglobal.com/ratings/en/regulatory/article/-/view/sourceId/11824942). 

**The Experiment**
Using a Gaussian Mixture Model, we cluster the observations based on their macroeconomic features, the year, and the indicator variable for default, lagged by a year. We want to see how these clusters perform compared to prevailing sovereign ratings. To do so, we fit two logit models that predict the probability of default: one using the clusters and the other using sovereign ratings as predictor variables.


--- Cluster Model ---
|          |precision|recall|f1-score|support|
|----------|---------|------|--------|-------|
|No Default|0.885    |0.927 |0.906   |482    |
|Default   |0.886    |0.824 |0.854   |330    |
|accuracy  |                |0.885   |812    |  
|----------|---------|------|--------|-------|

    accuracy                          0.885       812
   macro avg      0.886     0.876     0.880       812
weighted avg      0.885     0.885     0.885       812


--- S&P Rating Model ---
              precision    recall  f1-score   support

         0.0      0.892     0.774     0.829       461
         1.0      0.697     0.848     0.765       282

    accuracy                          0.802       743
   macro avg      0.795     0.811     0.797       743
weighted avg      0.818     0.802     0.805       743


--- Cluster + S&P Model ---
              precision    recall  f1-score   support

         0.0      0.914     0.924     0.919       461
         1.0      0.874     0.858     0.866       282

    accuracy                          0.899       743
   macro avg      0.894     0.891     0.892       743
weighted avg      0.899     0.899     0.899       743

