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

**In predicting government default, I find that clustering algorithms provide a viable and objective alternative to credit ratings**.  

The industry standard for measuring sovereign credit risk (probability of government default) are the credit ratings assigned by S&P, Moody's, and Fitch. Businesses rely on these ratings to make decisions. Commercial banks for example, use the ratings to allocate loss provisions across countries. And yet, the prevailing ratings system has long been criticized for being opaque, subjective and having bias See (UNCTAD, 2024) for a recent review. One possible alternative is to use unsupervised learning methods, such as clustering algorithms. The following experiment suggests that clustering is capable of outperforming credit rating agencies in predicting sovereign defaults.

**The Dataset**. 
I analyze a sample of 2,175 country-year observations which range from 2000 to 2021 and select 13 macroeconomic variables which are commonly used as inputs by agencies. (For example, real GDP growth, CPI inflation, current account balances, and central government debt). The variables are downloaded from the World Bank's database. They are imputed wherever missing, by taking the country's variable average if available, and the global average otherwise. Each observation is matched to an indicator variable for default, based on sovereign default estimates compiled by the Bank of Canada and the Bank of England. The latest figures are found [here](https://www.bankofcanada.ca/2024/07/staff-analytical-note-2024-19/). Every observation has a rating assigned by S&P, the data for which can be found on the company's website [here](https://www.spglobal.com/ratings/en/regulatory/article/-/view/sourceId/11824942). 

**The Experiment**.
Using k-means, cluster the observations based on their macroeconomic features, the year, and the one-year lagged indicator variable for default. For a fair comparison, set the number of clusters to 22, which is the same number of classes under the credit-ratings system.  

To compare performance, I fit two logit models that predict the probability of default: one using the clusters and the other using sovereign ratings as predictor variables. The training set is based on observations from 2000-2015, which gives a test set that is roughly 40% of all observations. For validation, set all predicted probabilities that are greater than or equal to 0.5 as a predicted default.   

|                 | precision | recall  | f1-score | support |
|-----------------|-----------|---------|----------|---------|
|**Cluster Model**|           |         |          |         |
| No Default      | 0.914     | 0.882   | 0.898    | 482     |
| Default         | 0.836     | 0.879   | 0.857    | 330     |
| accuracy        |           |         | 0.881    | 812     |
|**Ratings Model**|           |         |          |         |   
| No Default      | 0.892     | 0.774   | 0.829    | 461     |
| Default         | 0.697     | 0.848   | 0.765    | 282     |
| accuracy        |           |         | 0.802    | 743     |

The table above summarizes the results. Except for recall under predicted defaults, the cluster-based model outperforms the ratings-based model, with an overall accuracy of 0.881 (a material improvement from 0.802). 

**Reducing clusters**. There's no reason to believe that 22 clusters yield optimal results. For simplicity, consider k-means clustering with just 2 clusters. The logit model does better on every metric when compared to the one based on 22 clusters, with an overall accuray of 0.895. One possible analogue when using credit-ratings is to group the letter ratings into "investment-grade" and "speculative-grade". Interestingly, the logit model worsens under this classification.


|                 | precision | recall  | f1-score | support |
|-----------------|-----------|---------|----------|---------|
|**Cluster Model**|           |         |          |         |
| No Default      | 0.925     | 0.900   | 0.913    | 482     |
| Default         | 0.860     | 0.894   | 0.877    | 330     |
| accuracy        |           |         | 0.898    | 812     |
|**Ratings Model**|           |         |          |         |   
| No Default      | 0.902     | 0.707   | 0.793    | 482     |
| Default         | 0.675     | 0.888   | 0.767    | 330     |
| accuracy        |           |         | 0.781    | 812     |

**Illustrative examples**.  Continuing with the 2-cluster set up, the figure below helps to visualize the differences between the k-means clusters and S&P's credit-ratings. To reduce dimensionality and facilitate understanding, the plot shows only the first two principal components of the dataset. K-means separates the data cleanly. S&P's ratings do not.

![Clusters vs ratings chart](/assets/images/pca_clusters_vs_ratings.png)

One major sovereign default in recent history is that by Greece in 2015. The cluster-based model successfully predicts the event. It should be noted that S&P downgraded Greece in 2010, in response to weak economic data. Viewed this way, S&P's judgment adds value in a way that the cluster-based model does not. The key limitation is that the cluster model depends on historic precedent. In particular, notice that the estimated probability of default jumped to 0.8 in 2013 because the clusters took into account the round of debt restructuring that took place in 2012 (which the Bank of Canada considers as a form of sovereign default). One solution worth exploring in the future is to use timelier data such as high-frequency market indicators to help fine-tune the clustering algorithm. 

![greece](/assets/images/defaultprob.png)


**Summary**. This experiment relied solely on annual macroeconomic and lagged sovereign default data to determine clusters, but still managed to deliver better predictive accuracy than credit ratings when fed into a logit model. And while the sovereign ratings process involves "expert" judgment, clustering is data-driven and reproducible. A cluster-based approach can also help us to group countries that are not covered by credit-rating agencies, as the World Bank dataset has larger coverage.

