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
				let data = e.detail.value
				this.value = data.replace(/./g, '*')
				if (data.substr(data.length - 1, 1) == '*' || data.substr(data.length - 1, 1) == '') {
					this.fromvalue.pop()
				} else {
					this.fromvalue.push(data.substr(data.length - 1, 1))
				}
				console.log('fromvalue', this.fromvalue)
			}
		}
	}
</script>

<style>
</style>
