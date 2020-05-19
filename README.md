# CWRU_14
【移动互联网应用课程设计】第14组CWRU项目汇总



------



## 项目概述

本项目针对CWRU数据集进行轴承故障预测，即对测试数据实现4分类——正常基座数据（NORMAL），滚动体故障（B），内圈故障（IR），外圈故障（OR）。最终目标是实现一个可提供给运维人员使用的工业APP。

借助平台：www.phmlearn.com


## 目录结构

**【code】**

* TrainModel

  * STEP1_feature.py
  * STEP2_merge.py
  * STEP3_fill.py
  * STEP4_train&save.py
    

* UseModel

  * STEP1_testdata_feature.py
  * STEP2_usemodel_predict.py
  

**【data】**

* train：训练集
  * NORMAL01.csv  -  NORMAL02.csv
  * B01.csv  -  B06.csv
  * OR01.csv  -  OR14.csv
  * IR01.csv  -  IR06.csv
  
* test1 : 第一组测试集（TEST01.csv  -  TEST14.csv）
  
* test2 : 第二组测试集（TEST1.csv  -  TEST142.csv）


**【miniprogram】**


* commpents：
* components
* imgs：小程序中用到的背景图

* pages
  *chartonea:
  * index：首页
  * my：
  * show：

  
* util：用户配置文件
* app.js / app.json / app.wxss：全局配置文件
* sitemap.json：



**【othercode】**

* balance.py
* feature_shipinyu.py
* feature_shiyu.py



**【cwru.model】**：训练好的四分类模型

**【result.csv】**：第二组测试数据的故障预测结果




## 版本管理

v 1.0.0




## 依赖配置

#### 1. Python环境

- Python 3.6及以上版本


#### 2. python 开发工具

* PyCharm


#### 3. 需要配置的python依赖包

- pandas-0.23.2-cp37-cp37m-win_amd64.whl
- numpy-1.16.6-cp37-cp37m-win_amd64.whl
- scipy-1.4.1-cp37-cp37m-win_amd64.whl
- scikit_learn-0.19.2-cp37-cp37m-win_amd64.whl
- PyWavelets-1.1.1-cp37-cp37m-win_amd64.whl
- json5-0.9.3-py3-none-any.whl
- joblib-0.14.1-py2.py3-none-any.whl
  


#### 4. 微信小程序开发环境

- 微信web开发者工具



## 部署说明

#### 1. Python环境

在Windows环境下推荐直接下载Anaconda完成Python所需环境的配置。

> 下载地址为：https://www.anaconda.com/。

#### 2. PyCharm安装及配置

详细过程可参考教程：https://blog.csdn.net/yang520java/article/details/80255659。

> 下载地址为：http://www.jetbrains.com/pycharm/download/#section=windows。

#### 3.本项目依赖的Python库安装说明

1）更新pip

```
python -m pip install --upgrade pip
```

2）下载库文件（以pandas为例）

在网址https://www.lfd.uci.edu/~gohlke/pythonlibs/ 中找到你需要的库文件版本。

例如windows 64 位 Python3.7 对应下载:pandas-1.0.3-cp37-cp37m-win_amd64.whl。下载后放置到Python的安装目录。

3）安装库文件（以pandas为例）

cmd进入终端，cd到Python的安装目录，即下载文件放置的目录，在终端输入如下命令：

```
pip install pandas-1.0.3-cp37-cp37m-win_amd64.whl
```



## 运行说明
### 一.  算法和模型
#### 1. 训练模型

按照文件名的标注，顺序执行 STEP1 - STEP4 对应的 .py 文件：

* **STEP1_feature：** 对训练数据集进行预处理和特征提取
* **STEP2_merge：** 将处理完的训练数据集合并成一个.csv文件
* **STEP3_fill：** 对NORMAL中的空值进行填充
* **STEP4_train&save：** 使用处理完的训练数据训练模型并保存


#### 2. 调用模型进行预测

按照文件名的标注，顺序执行 STEP1 - STEP2 对应的 .py 文件：

* **STEP1_testdata_feature：** 对测试数据集进行特征提取
* **STEP2_usemodel_predict：** 调用保存的模型对处理后的测试数据进行故障分类


### 二.  微信小程序部分

​	在微信开发者工具中导入miniprogram项目即可进行编译。


## 注意事项

1. 运行代码时，将原路径更换为自己的路径，且路径名最好不含中文
2. 模型的特征维数和测试数据处理后的特征维数必须相等



