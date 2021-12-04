<template>
	<view>
		my
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
		   async hhh(){
			   let [res,err] = await this.$https.login()
			}
		}
	}
</script>

<style lang="scss">

</style>
