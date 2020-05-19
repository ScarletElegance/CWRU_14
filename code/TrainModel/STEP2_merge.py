# 合并训练集
import os
import pandas as pd
filePath='D:/0bearing/data2feature_600'
outputfile='D:/0bearing/train2_600.csv'
fileList = os.listdir(filePath)
# print(fileList)
# print(len(fileList))
path = os.path.join(filePath, fileList[0])
df = pd.read_csv(path)
df.to_csv(outputfile,index=False, header=True)
for i in range (1,len(fileList)):
    path = os.path.join(filePath, fileList[i])
#     print(path)
    df = pd.read_csv(path)
    df.to_csv(outputfile, mode='a', index=False, header=False)
print("Done.")