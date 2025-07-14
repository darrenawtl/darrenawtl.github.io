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

**When predicting government default, I find that clustering algorithms are a viable and objective alternative to credit ratings**.  

Businesses rely on sovereign credit ratings assigned by S&P, Moody's and Fitch to gauge the probability of government default and to make decisions. Commercial banks for example, use the ratings to allocate loss provisions across countries. Yet, the prevailing ratings system has long been criticized for being opaque, subjective and having bias. (*See UNCTAD, 2024 for a recent review*). The following experiment shows we can do better with clustering algorithms which, in addition to being data-driven and reproducible, have higher predictive power. (*See the full code [here](https://github.com/darrenawtl/darrenawtl.github.io/tree/master/code/macroclusters)*).

**The Dataset**. 
I analyze a sample of 2,175 country-year observations which range from 2000 to 2021 and select 13 macroeconomic variables which are commonly used as inputs by agencies. (For example, real GDP growth, CPI inflation, current account balances, and central government debt). Data for central government debt are taken from IMF's Global Debt Database, while the other variables are downloaded from the World Bank's database. They are imputed wherever missing, by taking the country's variable average if available, and the global average otherwise. Each observation is matched to an indicator variable for default, based on sovereign default estimates compiled by the Bank of Canada and the Bank of England. The latest figures are found [here](https://www.bankofcanada.ca/2024/07/staff-analytical-note-2024-19/). Every observation has a rating assigned by S&P, the data for which can be found on the company's website [here](https://www.spglobal.com/ratings/en/regulatory/article/-/view/sourceId/11824942). 

**The Experiment**.
For simplicity, use k-means to cluster the observations based on their macroeconomic features, the year, and the one-year lagged indicator variable for default. For a fair comparison, set the number of clusters to 22, which is the same number of classes under the credit-ratings system.  

To compare performance, I fit two logit models that predict the probability of default: one using the clusters and the other using sovereign ratings as predictor variables. The training set is based on observations from 2000-2015, which gives a test set that is roughly 40% of all observations. For validation, set all predicted probabilities that are greater than or equal to 0.5 as a predicted default.   

|                 | precision | recall  | f1-score | support |
|-----------------|-----------|---------|----------|---------|
|**22-Cluster Model**|           |         |          |         |
| No Default      | 0.914     | 0.882   | 0.898    | 482     |
| Default         | 0.836     | 0.879   | 0.857    | 330     |
| accuracy        |           |         | 0.881    | 812     |
|**22-Ratings Model**|           |         |          |         |   
| No Default      | 0.892     | 0.774   | 0.829    | 461     |
| Default         | 0.697     | 0.848   | 0.765    | 282     |
| accuracy        |           |         | 0.802    | 743     |

The table above summarizes the results. Except for recall under predicted defaults, the cluster-based model outperforms the ratings-based model, with an overall accuracy of 0.881 (a material improvement from 0.802). 

**Reducing number of clusters**. Credit ratings can also be divided into "investment-grade" and "speculative-grade", so it is worth considering if this level of aggregation gives better results. Using k-means clustering with just 2 clusters, the logit model does better on every metric, with an overall accuracy of 0.895. But the ratings-based model worsens. 


|                 | precision | recall  | f1-score | support |
|-----------------|-----------|---------|----------|---------|
|**2-Cluster Model**|           |         |          |         |
| No Default      | 0.925     | 0.900   | 0.913    | 482     |
| Default         | 0.860     | 0.894   | 0.877    | 330     |
| accuracy        |           |         | 0.898    | 812     |
|**2-Ratings Model**|           |         |          |         |   
| No Default      | 0.902     | 0.707   | 0.793    | 482     |
| Default         | 0.675     | 0.888   | 0.767    | 330     |
| accuracy        |           |         | 0.781    | 812     |

**Illustrative examples**.  Continuing with the 2-cluster set up, the figure below helps to visualize the differences between the k-means clusters and S&P's credit-ratings. To reduce dimensionality and facilitate understanding, the plot shows only the first two principal components of the dataset. The first component has a high positive correlation with GDP per capita and the current account balance, while the second component has a high positive correlation with central government debt and taxes. Loosely speaking, the first component can be thought of as a measure of economic strength while the second component is a representation of a government's fiscal policy stance. In any case, clustering by  K-means separates the data cleanly. S&P's ratings do not.

![Clusters vs ratings chart](/assets/images/pca_clusters_vs_ratings.png)

One major sovereign default in recent history is that by Greece, which was characterized by a debt restructuring in 2012 and then a default on IMF loans in 2015. The two events are recorded as defaults in the Bank of Canada's database, but the cluster-based model is only successful in predicting the IMF default. The key limitation is that the cluster model depends on historic precedent; Greece did not default before 2012. By contrast, S&P downgraded Greece in 2009 due to concerns about fiscal stability, which translates to a successful prediction in the logit model in both 2012 and 2015. However, this should not be viewed as a failure of clustering, but rather a lack of timelier data. A solution worth exploring in the future is to use high-frequency market indicators --- such as credit-default swaps --- to help fine-tune the clustering algorithm. 

![greece](/assets/images/defaultprob.png)

**Summary**. This experiment shows that clustering has the potential to replace the prevailing sovereign credit ratings system. Relying solely on annual macroeconomic and lagged sovereign default data, a simple k-means algorithm is still able to deliver better predictive accuracy than credit ratings when fed into a logit model. And while the sovereign ratings process involves "expert" judgment, clustering is data-driven and reproducible. A cluster-based approach can also help us to group countries that are not covered by credit-rating agencies --- the only constraint being data availability.

<ins>References</ins>  
*UNCTAD. (2024). A world of debt: A growing burden to global prosperity (UNCTAD Global Policy Report). United Nations Conference on Trade and Development.*

