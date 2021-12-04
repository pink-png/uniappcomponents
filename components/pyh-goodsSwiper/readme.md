### pyh-goodsSwiper 多语言切换组件

多语言切换组件，组件名：``goodsSwiper``，代码块： goodsSwiper。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
单页面引用
import goodsSwiper from "@/components/pyh-goodsSwiper/pyh-goodsSwiper.vue"
export default {
    components: {goodsSwiper}
}
```

在 ``template`` 中使用组件

```html
<goodsSwiper :datas="detail" :config="config" @change="swiperChange" @tapFun="tapFun"></goodsSwiper>
```

在 ``script`` 中detail说明
可自定义（需要修改组件内对应参数名）

**detail 属性说明：**

|属性名		|类型	|默认值	                    |说明					|
|---		|----	|---	                    |---					|
|title		|String	|''	            			|标题					|
|subLable	|String	|''	            			|标签					|
|list		|Array	|[]	            			|商品数组				|

**config 属性说明：**

|属性名		|类型	|默认值	                    |说明					|
|---		|----	|---	                    |---					|
|more		|Boolean|false            			|是否显示更多			|
|autoplay	|Boolean|false            			|是否自动轮播			|
|multiple	|Number	|3	            			|单页滑块数量			|
|shadow		|Boolean|false            			|是否显示两边渐变		|

**更新记录：**

创建

**感谢：**

> 有更多优化建议和需求，请联系作者。谢谢！