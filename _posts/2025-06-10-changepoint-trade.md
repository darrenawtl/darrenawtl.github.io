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

Change-point detection methods can help identify such shifts in trade patterns.

Let's investigate Thailand's merchandise imports from China. The code below does the following:
(1) Accesses the API provided by the [Ministry of Commerce](https://tradereport.moc.go.th/opendata/summarycountries).
(2) Cleans the data
(3) Runs the PELT algorithm using the l2 model
(4) Visualize the results.

The plot below is partitioned into red and blue regions based on the change points detected by the algorithm.



```python
import requests
import pandas as pd
import ruptures as rpt
import matplotlib.pyplot as plt

### (1) Download the data ###
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

###(2) Data Cleaning ###
dates = pd.to_datetime(dates, format='%d/%m/%Y')
data = pd.DataFrame(imports, dates)
data = data.loc[~(data==0).all(axis=1)] #drop zeroes

### (3) Execute algorithm and obtain results ###
algo = rpt.Pelt(model="l2").fit(data)
result = algo.predict(pen=10)

# Get datetime indices for change points (excluding final endpoint)
cp_dates = data.index[result[:-1]]

### (4) Plot the results ###
# Plot original data
fig, ax = plt.subplots(figsize=(14, 6))
ax.plot(data.index, data.values, label='Imports (US$mn)', color='black')
ax.set_title("Thailand Imports from China")
#ax.set_xlabel("")
ax.set_ylabel("Imports")
ax.grid(True)

prev_date = data.index[0]
# Plot shaded regions between change points
colors = ['#ffcccc', '#cce5ff']
for i, date in enumerate(cp_dates):
    ax.axvspan(prev_date, date, color=colors[i % len(colors)], alpha=0.3)
    prev_date = date

# Shade the final segment
ax.axvspan(prev_date, data.index[-1], color='blue', alpha=0.15)

plt.tight_layout()
plt.savefig("thimports_cn.png", dpi=300)

plt.show()

# Print the exact dates
print("Change points detected at the following dates:")
for date in cp_dates:
    print(date.strftime("%Y-%m-%d"))   
```


