### gsq-citypicker 省市区选择组件

省市区选择组件，组件名：``gsq-citypicker``，代码块： GsqCitypicker。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
单页面引用
import GsqCitypicker from "@/components/gsq-citypicker/gsqCityPicker.vue"
export default {
    components: {GsqCitypicker}
}
```

在 ``template`` 中使用组件

```html
<GsqCitypicker ref='citypicker'></GsqCitypicker>
```

打开组件
this.$refs.citypicker.show()

**config 属性说明：**

|属性名		|类型	|默认值	                    |说明					|
|themeColor	|String	|''	            			|主题色					|
|listpickerValueDefault		|Array	|[]	            			|默认值省市区[0,0,0]				|


