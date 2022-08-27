<template>
	<view class="user-info" v-if="isShowUser">
		<image class="user-head" src="../../static/images/QQ20220823171451.png" mode=""></image>
		<view class="user-content">
			<view class="name">
				<view class="h4">Fiona Wang</view>
				<view class="h6">Department Head</view>
			</view>
			<view class="department">Human Resources</view>
			<view class="number">
				CD0100
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "user-info",
		data() {
			return {

			};
		},
		props: {
			isShowUser: {
				type: Boolean,
				default: false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.user-info {
		width: 710rpx;
		height: 180rpx;
		background: #FFFFFF;
		box-shadow: 2rpx 2rpx 10rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 16rpx;
		margin: 0 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.user-head {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			margin: 0 20rpx 0 40rpx;
		}

		.user-content {
			display: flex;
			flex-direction: column;
			font-family: PingFangSC-Medium, PingFang SC;

			.name {
				display: flex;
				align-items: center;

				.h4 {
					font-size: 36rpx;
					color: #333333;
					font-weight: 500;
					margin-right: 40rpx;
				}

				.h6 {
					width: 220rpx;
					height: 36rpx;
					line-height: 36rpx;
					text-align: center;
					background: #F4F4F4;
					border-radius: 6rpx 0rpx 0rpx 6rpx;
					font-size: 22rpx;
					font-weight: 400;
					color: #1B1B1B;
				}
			}

			.department {
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
			}

			.number {
				font-size: 22rpx;
				font-weight: 400;
				color: #CCCCCC;
			}

		}
	}
</style>
