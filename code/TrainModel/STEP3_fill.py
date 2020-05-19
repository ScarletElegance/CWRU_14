# 空值填充0，主要是对normal类
import os
import pandas as pd
outputfile='D:/0bearing/train_600.csv'
df = pd.read_csv(outputfile)
for i in df.columns.values:
    df[i].fillna(0, inplace=True)
df.to_csv(outputfile,index=False,header=True)
print("Done.")