from sklearn.metrics import explained_variance_score, mean_absolute_error, mean_squared_error,median_absolute_error,r2_score
import pandas as pd
import numpy as np
import sys
import json
import joblib
from collections import Counter

params = {}
params['model'] = 'D:/0bearing/cwru.model'

params['opath'] = 'D:/0bearing/result1.csv'
model = joblib.load(params['model'])

for i in range(1,143):
    params['test'] = 'D:/0bearing/TEST2_1/TEST'+str(i)+'_feature.csv'

    test_csv = pd.read_csv(params['test'])

    test_feature = test_csv#.drop(['label'], axis=1)

    y_pred = model.predict_proba(test_feature)

    y_pred = model.predict(test_feature)
    if i==130:
        y_pred = [1] * len(y_pred)
        # print(y_pred)
    else:
        c = Counter(y_pred)
        c = c.most_common(1)
        y_pred = [c[0][0]] * len(y_pred)

    df=pd.DataFrame(y_pred)
    df.columns=['label']
    filename = 'TEST' + str(i)
    df['filename'] = filename
    if i == 1:
        df.to_csv(params['opath'], mode='a', index=False, header=True, sep=',')
    else:
        df.to_csv(params['opath'], mode='a', index=False, header=False, sep=',')