# WeChat Mini Program Number Input

微信小程序中使用的带加减号按钮的数字输入组件

### 功能特征

- 丰富的外部样式配置项, 可自定义组件中几乎每一个样式细节
- 可设定输入的数字范围
- 可自行使用键盘输入指定数值, 且输入的数值同样受设定的范围限制, 超出范围自动重设为最后一次合法的值
- 可设置增减步长

### 安装

1. `npm i wechat-mp-number-input`
2. 微信开发者工具菜单栏 -> 工具(Tools) -> 构建NPM(build NPM)
3. 若组件引用出现异常, 可能需要重启一下开发者工具, 此非本组件之bug

更多关于微信小程序中使用npm包的信息请参考[微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

### 使用示例

在需要使用此组件的页面中, 添加如下代码

_page.json_

```json
{
  "usingComponents": {
    "number-input": "wechat-mp-number-input"
  }
}
```

_page.wxml_

```xml

<number-input class="number_input"
              button-class="button"
              disabled-button-class="disabled_button"
              value="{{quantity}}"
              min="0"
              max="100"
              step="1"
              bindchange="onChanged"
              disabled="{{disabled}}"/>
```

_page.js_

```javascript
Page({
    data: {
        quantity: 1,
        disabled: false,
    },
    onChanged(event) {
        // do what ever you want
    },
});
```

### 配置项

|    属性    |   类型    |   默认值    | 含义                 |
|:--------:|:-------:|:--------:|--------------------|
|  value   | number  |    -     | 输入框数值              |
|   step   | number  |    1     | 递增/递减步长            |
| disabled | boolean |  false   | 是否禁用组件, 禁用后将应用特定样式 |
|   min    | number  |    0     | 数值范围下限, 可为负数       |
|   max    | number  | Infinity | 数值范围上限, 可为负数       |

### 默认样式

组件各部分颜色默认色值分别为:

```less
@textColor: #272727;
@disabledTextColor: #bebebe;
@buttonBackgroundColor: #e5e4e6;
@activeButtonBackgroundColor: #afafb0;
@disabledButtonBackgroundColor: #f3f3f2;
@borderColor: #c0c6c9;
```

除颜色外, 默认值还包括:

- 组件高: 7.5vw
- 边框角弧度: 1rpx
- 按钮宽: 7.5vw
- 按钮字体大小: 24rpx
- 输入框宽: 12vw

### 外部样式类

本组件主要由一个顶层容器以及容器内 **+按钮** , **-按钮** 以及 **输入框** 三部份构成, 每部分可使用的外部样式类如下

| 属性                             | 作用范围         |
|--------------------------------|--------------|
| class                          | 顶层容器         |
| disabled-class                 | (禁用组件时) 顶层容器 |
| button-class                   | 加减按钮         |
| disabled-button-class          | (禁用组件时) 加减按钮 |
| increase-button-class          | 递增(+)按钮      |
| disabled-increase-button-class | (禁用组件时) 递增按钮 |
| decrease-button-class          | 递减(-)按钮      |
| disabled-decrease-button-class | (禁用组件时) 递减按钮 |
| input-class                    | 输入框          |
| disabled-input-class           | (禁用组件时) 输入框  |

详细的外部样式类使用请参考官方文档[外部样式类](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E5%A4%96%E9%83%A8%E6%A0%B7%E5%BC%8F%E7%B1%BB)

> 通常情况下, `increase-button-class` 和 `decrease-button-class` 的优先级高于 `button-class`, 因此 `button-class` 可作为默认选项使用. 但由于微信本身对应用在同一组件上的多个样式类优先级的迷之定义,
> 建议尽量避免同时使用 `increase-button-class`/`decrease-button-class` 和 `button-class`. (`disable-*`同理) 

注: 由于微信小程序对同一节点上同时使用普通样式和外部样式的优先级未作定义, 而为了方便组件开箱即用定义了默认样式,
因此当外部样式因冲突而不生效时, 建议酌情使用`!important`. 例如:

```less
.button {
  width: 30rpx !important;
}
```

### 事件

##### change

输入框数值变化时触发. 注意当输入框的新数值超出设定范围时,将自动重设为旧的数值, 此时数值将被视为没有变化, 此事件不被触发

_(from v1.1.2)_ 事件包含捕获阶段, 且会冒泡

携带参数:

- value: 改变后的数值
- lastValue: 改变前的数值