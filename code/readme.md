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
  

## 运行说明
### 1.  训练模型

按照文件名的标注，顺序执行 STEP1 - STEP4 对应的 .py 文件：

* **STEP1_feature：** 对训练数据集进行预处理和特征提取
* **STEP2_merge：** 将处理完的训练数据集合并成一个.csv文件
* **STEP3_fill：** 对NORMAL中的空值进行填充
* **STEP4_train&save：** 使用处理完的训练数据训练模型并保存


### 2. 调用模型进行预测

按照文件名的标注，顺序执行 STEP1 - STEP2 对应的 .py 文件：

* **STEP1_testdata_feature：** 对测试数据集进行特征提取
* **STEP2_usemodel_predict：** 调用保存的模型对处理后的测试数据进行故障分类



