<template>
	<view class="search">
		<image class="icon-search" src="../../static/images/icon-search.png" mode=""></image>
		<input type="text" v-model="value" @input="inputChange" placeholder="搜索员工姓名/工号">
		<image class="icon-close" src="../../static/images/guanbi.png" mode="" @click="iconClose"></image>
	</view>
</template>

<script>
	export default {
		name: "search",
		data() {
			return {
				value: ''
			};
		},
		props: {
			isShowSearch: {
				type: Boolean,
				default: false
			},
		},
		methods: {
			iconClose() {
				this.value = ''
				this.$emit('inputChange', this.value)
			},
			inputChange(e) {
				this.$emit('inputChange', e.target.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		width: 670rpx;
		height: 80rpx;
		background: #F4F4F4;
		border-radius: 12rpx;
		border: 2rpx solid #F4F4F4;
		display: flex;
		align-items: center;
		margin: 60rpx 40rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;

		.icon-search {
			width: 32rpx;
			height: 32rpx;
		}

		input {
			width: 100%;
			font-size: 26rpx;
			font-weight: 400;
			color: #333333;
			margin-left: 20rpx;
			margin-right: 30rpx;
		}

		.icon-close {
			width: 26rpx;
			height: 26rpx;
			border-radius: 50%;
			background: #DDDDDD;
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>
