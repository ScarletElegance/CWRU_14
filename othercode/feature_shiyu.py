import pandas as pd
import numpy as np
import sys
import csv
from scipy import stats

argvs = sys.argv

params = {}
params['avg'] = 1
params['std'] = 1
params['var'] = 1
params['skew'] = 1
params['kur'] = 1
params['ptp'] = 1
params['path'] = 'D:/Bearing-fault-prediction-master/new/fengji/data_ocs.csv'
params['opath'] ='D:/Bearing-fault-prediction-master/new/fengji/data_ocs_shiyu.csv'
params['len_piece']=10 #窗口长度

try:
    for i in range(len(argvs)):
        if i < 1:
            continue
        if argvs[i].split('=')[1] == 'None':
            params[argvs[i].split('=')[0]] = None
        else:
            Type = type(params[argvs[i].split('=')[0]])
            params[argvs[i].split('=')[0]] = Type(argvs[i].split('=')[1])
    with open(params['path'],'r') as f:
    #1.创建阅读器对象
        reader = csv.reader(f)
    #2.读取文件第一行数据
        head_row=next(reader)
    data_attribute = []
    for item in head_row:
        if params['avg'] == 1:
            data_attribute.append(item+'_avg')
        if params['std'] == 1:
            data_attribute.append(item+'_std')
        if params['var'] == 1:
            data_attribute.append(item+'_var')
        if params['skew'] == 1:
            data_attribute.append(item+'_skew')
        if params['kur'] == 1:
            data_attribute.append(item+'_kur')
        if params['ptp'] == 1:
            data_attribute.append(item+'_ptp')

# 读取数据并删除最后一列标签
    tn = pd.read_csv(params['path'], low_memory=False)
    tn.dropna(inplace=True)
    train = np.array(tn)
    train_x = train[:, :-1]

# 存标签
    train_y = train[:, -1]
    train_y = np.array(train_y)

    df_data = pd.DataFrame(pd.read_csv(params['path'],low_memory=False))
    sum=len(df_data)
    result_out=[]
    result_out.append(data_attribute)

    for i in range (0,sum,params['len_piece']):
        df=df_data[i:i+params['len_piece']]
        result_list = []
        for i in df.columns:#每一列
            list_para=[]
            if params['avg'] ==1:
                list_para.append(df[i].mean())
            if params['std'] ==1:
                list_para.append(df[i].std())
            if params['var'] ==1:
                list_para.append(np.var(df[i]))
            if params['skew'] ==1:
                list_para.append(stats.skew(df[i]))
            if params['kur'] ==1:
                list_para.append(stats.kurtosis(df[i]))
            if params['ptp'] ==1:
                list_para.append(df[i].ptp())
            result_list.extend(list_para)
        result_out.append(result_list)

    wrtocsv = pd.DataFrame(result_out)
    wrtocsv.to_csv(params['opath'],index=False,header=False)
except Exception as e:
    print(e)