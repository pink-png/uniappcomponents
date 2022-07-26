<template>
	<view class="">
		<input @input="getvalue" v-model="value">
		{{fromvalue.join('')}}
	</view>
</template>
<script>
	export default {
		data() {
			return {
				value: '',
				fromvalue: []
			}
		},
		methods: {
			getvalue(e) {
				console.log('e', e)
				const data = e.detail.value
				const subdata = data.substr(data.length - 1, 1)
				this.value = data.replace(/./g, '*')
				if (subdata == '*' || subdata == '') {
					this.fromvalue.pop()
				} else {
					this.fromvalue.push(subdata)
				}
				console.log('fromvalue', this.fromvalue)
			}
		}
	}
</script>

<style>
</style>
