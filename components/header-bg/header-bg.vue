<template>
	<view class="header-bg">
		<image class="headerimg" :class="{'lowHeaderImg':lowHeaderImg}" src="../../static/images/header-bg.png"></image>
		<view class="my-info">
			<user-info :isShowUser="isShowUser"></user-info>
		</view>
	</view>
</template>

<script>
	import userInfo from '@/components/user-info/user-info.vue'
	export default {
		name: "header-bg",
		props: {
			isShowUser: {
				type: Boolean,
				default: false
			},
			lowHeaderImg: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		components: {
			userInfo
		}
	}
</script>

<style lang="scss" scoped>
	.header-bg {
		display: flex;
		justify-content: center;
		position: relative;

		.headerimg {
			width: 750rpx;
			height: 360rpx;

			&.lowHeaderImg {
				width: 750rpx;
				height: 320rpx;
			}

		}

		.my-info {
			position: absolute;
			bottom: -25%;
			left: 50%;
			transform: translateX(-50%);

		}
	}
</style>
