---
title: "Change-point Detection in International Trade Data"
date: 2025-06-10
layout: single
author_profile: true
categories:
  - blog
tags:
  - Change-point detection
  - Time series
footer_scripts:
  - /assets/js/copy-code.js
---

One concern among Asian businesses is that high US tariffs on China will disrupt regional trade patterns. In particular, some are worried that Chinese exporters may decide to "flood" regional markets with goods that they would have otherwise sold to the US.

Change-point detection methods can help identify such changes in trade patterns.

Let's investigate Thailand's merchandise imports from China. First, access the API provided by the [Ministry of Commerce](https://tradereport.moc.go.th/opendata/summarycountries). 

```python
imports = []
dates = []
for year in range(2009,2026):
    year = str(year)
    for month in range(1,13):
        month = str(month)
        dates.append('01/'+month+'/'+year)
        link = 'https://tradereport.moc.go.th/api/summarycountries?year='+year+'&month='+month+'&limit=0'
        
        response = requests.get(link)
        
        if response.status_code == 200:
            data = response.json()  # Convert JSON response to Python dictionary
            china = next(item for item in data if item["country_code"] == "CN")
            values = float(china['value_usd_import'])
            imports.append(values)
            
        else:
            print(f"Error: {response.status_code} for {year,month}")

dates = pd.to_datetime(dates, format='%d/%m/%Y')
data = pd.DataFrame(imports, dates)
data = data.loc[~(data==0).all(axis=1)] #drop zeroes   
```

The `ruptures` package provides a straightforward and fast implementation of offline change-point detection. The code below implements it using the piecewise constant model (`model=l2`).

```python
# Detect change points
algo = rpt.Pelt(model="l2").fit(data)
result = algo.predict(pen=10)

# Get datetime indices for change points (excluding final endpoint)
cp_dates = data.index[result[:-1]]
```
