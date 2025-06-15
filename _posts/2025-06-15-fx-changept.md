---
title: "Change-point Detection in Exchange Rate Data"
date: 2025-06-10
layout: single
author_profile: true
categories:
  - blog
tags:
  - Change-point detection
  - Time series
---
<p style="font-size: 14px;">
In the context of exchange rate forecasting with ARIMA models, I find limited evidence that change point detection yields major improvements in forecast accuracy. I consider six currencies relative to the US dollar: the Malaysian ringgit (MYR), Indonesian rupiah (IDR), Singapore dollar (SGD), Korean won (KRW), Japanese yen (JPY), and the Australian dollar (AUD).  

The experiment outline is as follows.  

1. For each currency, use the first 90% of the sample as training set.  
2. Using the PELT algorithim in `ruptures`, identify the last change point in the training data.  
3. Obtain a subsample from the training data using the change point.  
4. Fit two ARIMA models, one on the full training data and one on the subsample.  
5. Evalute each model's forecasts on the test set.
</p>


  
|Currency| Change Point | Subsample Size | MSE Full  |  MSE Subsample | ARIMA Full | ARIMA Subsample |
|--------|--------------|----------------|-----------|----------------|------------|-----------------|
|  MYR   |  2022-04-25  |      56        |  0.001325 |   0.001388     | (1, 1, 0)  |     (1, 1, 0)   |
|  IDR   |  2018-04-16  |      266       |  0.004565 |   0.004518     | (0, 1, 1)  |     (0, 1, 1)   |
|  SGD   |  2014-12-08  |      409       |  0.003890 |   0.003969     | (0, 1, 1)  |     (1, 1, 1)   |
|  KRW   |  2022-04-25  |      24        |  0.003976 |   0.003263     | (1, 1, 1)  |     (0, 1, 1)   |
|  JPY   |  2022-03-21  |      29        |  0.002907 |   0.002885     | (0, 1, 1)  |     (1, 1, 0)   |
|  AUD   |  2020-08-03  |      114       |  0.001153 |   0.001220     | (0, 1, 1)  |     (1, 1, 0)   |




                               
     
    
   
