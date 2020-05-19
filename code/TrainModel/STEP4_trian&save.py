import csv
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn import preprocessing
from sklearn.utils import shuffle
from sklearn.metrics import mean_squared_error, explained_variance_score
import pandas as pd
from sklearn.model_selection import cross_val_score
import joblib
import sklearn

def load_dataset(filename):
    file_reader = csv.reader(open(filename, 'rt'), delimiter=',')
    X, y = [], []
    for row in file_reader:
        X.append(row[0:-1])
        y.append(row[-1])
    # Extract feature names
    feature_names = np.array(X[0])
    return np.array(X[1:]).astype(np.float32), np.array(y[1:]).astype(np.float32), feature_names


if __name__ == '__main__':
    X, y, feature_names = load_dataset('E:/college/2020/keshe/train2_600.csv')
    X, y = shuffle(X, y, random_state=7)  # 打乱数据
    # X, y = random.shuffle(X, y)
    num_training = int(0.9 * len(X))
    X_train, y_train = X[:num_training], y[:num_training]
    X_test, y_test = X[num_training:], y[num_training:]

    rf_clf = RandomForestClassifier(n_estimators=1000, max_depth=10, min_samples_split=2)

    rf_clf.fit(X_train, y_train)
    y_pred = rf_clf.predict(X_test)

    mse = mean_squared_error(y_test, y_pred)
    evs = explained_variance_score(y_test, y_pred)

   with open("E:/college/2020/keshe/model/RF_model.model", "wb") as f:
        #joblib.dump(rf_clf, f)
    f1 = sklearn.metrics.f1_score(y_test, y_pred, average=None)
    score=f1[0]*0.1+f1[1]*0.3+f1[2]*0.3+f1[3]*0.3

    print('f1',f1)
    print('score',score * 100.0)
    #print('特征权重：', rf_clf.feature_importances_)
    print('mse:',mse)
    print('accuracy:',cross_val_score(rf_clf,X_test,y_pred,scoring='accuracy'))
    print('f1:', cross_val_score(rf_clf, X_test, y_pred, scoring='f1_micro'))
    print(pd.crosstab(y_test,y_pred,rownames=['actual'], colnames=['preds']))


