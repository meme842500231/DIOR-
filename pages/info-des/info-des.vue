<template>
	<view class="info-container">
		<view class="info-des">
			<view class="info-status"
				:class="{ 'grayBox':info.status===1,'blueBox':info.status===2,'redBox':info.status===3}">
				{{info.status|statusFilter}}
			</view>
			<view class="progress">
				<image class="icon-star" src="../../static/images/icon_dior.png" mode=""></image>
				<view class="title">
					申报进度
				</view>
			</view>
			<view class="content">
				<view class="progress-bar">
					<view class="white-circle" v-if="info.status===1"></view>
					<view class="circle" v-else></view>
					<view class="line"></view>
					<view class="gray-circle"></view>
				</view>
				<view class="progress-bar-des">
					<view class="progress-bar-title" v-if="info.status===1">待上级{{info.approverName }}审批</view>
					<view class="progress-bar-title" v-else-if="info.status===2">上级
						{{info.approverName }}于{{info.approvalTime}} 审批通过</view>
					<view class="progress-bar-title" v-else="info.status===3">上级
						{{info.approverName }}于{{info.approvalTime}} 审批未通过</view>
					<view class="reason-content">
						<view class="reason" v-show="info.status===3">
							理由：
						</view>
						<view class="reason-des">
							{{info.reason}}
						</view>
					</view>
					<view class="sumbit-date">{{info.approverName}} 于{{info.createTime}}提交申报</view>
				</view>
			</view>
			<view class="empty"></view>
		</view>
		<view class="content-box">
			<view class="gift-info">
				<image class="icon-star" src="../../static/images/icon_dior.png" mode=""></image>
				<view class="title">
					礼品信息
				</view>
			</view>
			<view class="swipe-box">
				<swiper class="swipe-wrap" circular :indicator-dots="indicatorDots">
					<swiper-item v-for="(item,index) in imgList" :key="index">
						<view class="swiper-item uni-bg-red">
							<image :src="item" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="gift-content">
				<view class="gift-des">
					<view class="title">
						礼品名称
					</view>
					<view class="text">
						{{info.title}}
					</view>
				</view>
				<view class="gift-des">
					<view class="title">
						价格范围
					</view>
					<view class="text">
						{{info.priceRange}}
					</view>
				</view>
				<view class="gift-des">
					<view class="title">
						收到日期
					</view>
					<view class="text">
						{{info.receiptDate?info.receiptDate.split(" ")[0]:''}}
					</view>
				</view>
				<view class="gift-des">
					<view class="title">
						从哪儿收到
					</view>
					<view class="text">
						{{info.from}}
					</view>
				</view>
				<view class="gift-des">
					<view class="title">
						备注
					</view>
					<view class="text">
						{{info.remark}}
					</view>
				</view>
			</view>
		</view>
		<view class="empty"></view>
		<view class="informant-box">
			<view class="informant">
				<image class="icon-star" src="../../static/images/icon_dior.png" mode=""></image>
				<view class="title">
					申报人
				</view>
			</view>
			<view class="user-info">
				<image class="user-head" :src="info.avatar" mode=""></image>
				<view class="user-content">
					<view class="name">
						<view class="h4">Fiona Wang</view>
						<view class="h6">Department Head</view>
					</view>
					<view class="department">{{info.store}}</view>
					<view class="number">
						{{info.approverCode}}
					</view>
				</view>
				<!-- <user-info isShowUser></user-info> -->
			</view>
		</view>
	</view>
</template>

<script>
	import userInfo from '../../components/user-info/user-info.vue'
	import {
		approvalDes
	} from '@/apis/approval.js'
	export default {
		data() {
			return {
				id: 0,
				info: {},
				status: 0,
				imgList: [],
				indicatorDots: true,
			};
		},
		components: {
			userInfo
		},
		onLoad: function(option) {
			// console.log(option.id)
			this.id = option.id
		},
		created() {
			this.desInfo()
		},
		filters: {
			statusFilter(status) {
				const statusBox = ['待审批', '已通过', '未通过']
				return statusBox[status - 1]
			}
		},
		methods: {
			async desInfo() {
				const [err, res] = await approvalDes(
					this.id
				)
				this.info = res.data
				this.imgList = res.data.images
				console.log(res)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info-des {
		font-family: PingFangSC-Medium, PingFang SC;
		color: #333333;

		.info-status {
			width: 750rpx;
			height: 68rpx;
			font-size: 26rpx;
			font-weight: 500;
			line-height: 68rpx;
			text-align: center;

			&.grayBox {
				background: #DDDDDD;
				color: #333333;
			}

			&.blueBox {
				background: #318ACA;
				color: #FFFFFF;
			}

			&.redBox {
				background: #EF4560;
				color: #FFFFFF;
			}
		}

		.progress {
			width: 750rpx;
			padding: 43rpx 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;

			.icon-star {
				width: 40rpx;
				height: 40rpx;
				margin-right: 9rpx;
				margin-left: 20rpx;
			}

			.title {
				font-size: 32rpx;
				font-weight: 500;
			}
		}

		.content {
			width: 750rpx;
			height: 123rpx;
			display: flex;
			align-items: center;
			padding: 0 40rpx 43rpx;
			box-sizing: border-box;

			.progress-bar {
				width: 16rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 10rpx;

				.white-circle {
					width: 16rpx;
					height: 16rpx;
					border: 2rpx solid #333333;
					border-radius: 50%;
					margin-right: 18rpx;
				}

				.circle {
					width: 16rpx;
					height: 16rpx;
					background: #333333;
					border-radius: 50%;
					margin-right: 18rpx;
				}

				.line {
					width: 16rpx;
					text-align: center;
					height: 81rpx;
					border-left: 2rpx dashed #CCCCCC;
				}

				.gray-circle {
					width: 16rpx;
					height: 16rpx;
					background: #999999;
					border-radius: 50%;
					margin-right: 18rpx;
				}
			}
		}

		.progress-bar-des {
			height: 123rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			box-sizing: border-box;

			.progress-bar-title {
				font-size: 26rpx;
				font-weight: 400;
			}


			.reason-content {
				display: flex;

				.reason {
					font-size: 22rpx;
					font-weight: 400;
					color: #999999;
				}

				.reason-des {
					font-size: 22rpx;
					font-weight: 400;
					color: #EF4560;
				}
			}

			.sumbit-date {
				font-size: 26rpx;
				font-weight: 400;
				color: #999999;
			}
		}

		.empty {
			width: 750rpx;
			height: 16rpx;
			background: #F9F9F9;
		}
	}

	.content-box {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		font-family: PingFangSC-Medium, PingFang SC;
		color: #333333;
		padding: 40rpx 40rpx;
		box-sizing: border-box;

		.gift-info {
			display: flex;
			margin-top: 45rpx;

			.icon-star {
				width: 40rpx;
				height: 40rpx;
				margin-left: -20rpx;
			}

			.title {
				font-size: 32rpx;
				font-weight: 500;
				margin-left: 9rpx;
			}
		}

		.swipe-box {
			width: 100%;
			height: 517rpx;
			background: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 45rpx;



			.swipe-wrap {
				height: 450rpx;
				width: 302rpx;
				background: #FFFFFF;
				border-radius: 6rpx;
				display: flex;
				justify-content: center;
				position: relative;


				.swiper-item {
					height: 400rpx;
					width: 100%;

					image {
						width: 302rpx;
						height: 400rpx;
					}
				}

				::v-deep .uni-swiper-dots {
					position: absolute;
					bottom: 0;

					.uni-swiper-dot {
						margin-top: 20rpx;
						margin-right: 0;

						&~.uni-swiper-dot {
							margin-left: 20rpx;

						}


					}

				}
			}
		}

		.gift-content {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 15rpx 0;
			box-sizing: border-box;

			.gift-des {
				display: flex;
				justify-content: space-between;
				height: 60rpx;
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				line-height: 60rpx;
				font-weight: 400;

				.title {
					color: #999999;

				}

				.text {

					color: #333333;
				}
			}
		}

	}

	.empty {
		width: 750rpx;
		height: 16rpx;
		background: #F9F9F9;
	}

	.informant-box {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		font-family: PingFangSC-Medium, PingFang SC;
		color: #333333;
		// padding: 45rpx 40rpx;
		// box-sizing: border-box;

		.informant {
			display: flex;
			padding: 45rpx 40rpx;

			.icon-star {
				width: 40rpx;
				height: 40rpx;
				// margin-left: -20rpx;

			}

			.title {
				font-size: 32rpx;
				font-weight: 500;
				margin-left: 9rpx;
			}
		}

		.user-info {
			width: 100%;
			height: 180rpx;
			background: #FFFFFF;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-bottom: 209rpx;

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

	}
</style>
