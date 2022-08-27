<template>
	<view class="container">
		<header-bg lowHeaderImg></header-bg>
		<view class="content">
			<h3>礼品名称*</h3>
			<view class="input-content">
				<input type="text" v-model="giftTitle" placeholder="填写礼品名称">
			</view>
			<h3>价格范围*</h3>
			<view class="input-content price">
				<uni-data-select v-model="value" placeholder="选择价格范围" :localdata="range" @change="priceChange">
				</uni-data-select>
				<image src="../../static/images/icon-down.png" @click="priceDown"></image>
			</view>
			<h3>收到日期*</h3>
			<view class="date-content" @click="openCalendar">
				<image class="date-content-img" src="../../static/images/date.png" mode=""></image>
				<input type="text" v-model="date" placeholder="选择日期">
			</view>
			<h3>从哪儿收到*</h3>
			<view class="input-content">
				<input type="text" v-model="from" placeholder="填写公司名称/供应商个人姓名">
			</view>
		</view>
		<view class="gift-img">
			<h3>礼品照片* ({{imgList.length}}/3)</h3>
			<view class="img-content-box">
				<view class="img-content" v-for="(item,index) in imgList" :key="index">
					<image :src="item" mode="aspectFill" @click="previewImage(index)"></image>
					<view class="close-box" @click="delImg(index)">
						<image class="icon-close" src="../../static/images/icon-close.png" mode=""></image>
					</view>
				</view>
				<view class="img-content icon-img" @click="selectImg" v-if="imgList.length<3">
					<image src="../../static/images/icon-up.png"></image>
				</view>
			</view>
		</view>
		<view class="remarks">
			<h3>备注</h3>
			<view class="remark-content">
				<textarea v-model="remark" placeholder="描述礼品/收到的原因" />
			</view>
		</view>
		<view class="info-sure">
			<view class="info-content">
			</view>
			<h5>我确认以上申报信息属实。</h5>
		</view>
		<view class="submit" @click="postapproval">
			提交
		</view>
		<uni-popup ref="calender" type="center">
			<uni-calendar :insert="true" :lunar="true" @change="dateChange" />
		</uni-popup>

	</view>
</template>

<script>
	import headerBg from '../../components/header-bg/header-bg.vue'
	import {
		approvalPost
	} from '@/apis/approval.js'
	import {
		upload
	} from '@/apis/oss.js'
	export default {
		data() {
			return {
				giftTitle: '',
				value: '',
				remark: '',
				from: '',
				range: [{
						value: 0,
						text: "≤ CNY 500"
					},
					{
						value: 1,
						text: "CNY 500 - CNY 2000"
					},
					{
						value: 2,
						text: "≥ CNY 2000"
					},
					{
						value: 3,
						text: "无法确认"
					},
				],
				imgList: [],
				date: ''
			}
		},
		components: {
			headerBg
		},
		onLoad() {},
		methods: {
			// 价格改变
			priceChange(e) {
				// console.log("e:", e);
			},
			// 打开日期模态框
			openCalendar() {
				this.$refs.calender.open()
			},
			// 日期改变
			dateChange(e) {
				this.date = e.fulldate
				this.$refs.calender.close()
			},
			// 选择并增加图片
			selectImg() {
				uni.chooseImage({
					count: 3 - this.imgList.length, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						res.tempFilePaths.forEach(async (item) => {
							const [uperr, upres] = await upload(item)
							this.imgList.push(upres.data)
						})
					}
				});
			},
			// 删除图片
			delImg(index) {
				this.imgList.splice(index, 1)
			},
			// 预览图片
			previewImage(index) {
				uni.previewImage({
					urls: this.imgList,
					current: index
				})
			},
			// 提交申报
			async postapproval() {
				const data = {
					from: this.giftTitle,
					images: this.imgList,
					priceRange: this.value,
					receiptDate: this.date,
					remark: this.remark,
					title: this.giftTitle
				}
				console.log(data)
				return
				await approvalPost(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;

		h3 {
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
		}

		.content {
			margin: 60rpx 40rpx;

			.input-content {
				width: 670rpx;
				height: 80rpx;
				border-radius: 6rpx;
				border: 2rpx solid #DDDDDD;
				margin-top: 20rpx;
				margin-bottom: 60rpx;
				padding: 0 40rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;


				input {
					width: 100%;
					height: 100%;
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
				}

				&.price {
					padding: 0;
					position: relative;
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;

					::v-deep .uni-select {
						border: #FFFFFF;
						padding-left: 40rpx;
						width: 670rpx;
					}

					::v-deep .uni-icons {
						display: none;
					}

					// ::v-deep 样式穿透
					::v-deep .uni-select__selector-empty,
					::v-deep .uni-select__selector-item {
						padding-left: 40rpx;
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
					}

					image {
						width: 32rpx;
						height: 32rpx;
						position: absolute;
						top: 50%;
						right: 40rpx;
						transform: translateY(-50%);
						z-index: -1;
					}
				}
			}


			.date-content {
				width: 670rpx;
				height: 80rpx;
				border-radius: 6rpx;
				border: 2rpx solid #DDDDDD;
				margin-top: 20rpx;
				margin-bottom: 60rpx;
				padding: 0 40rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;

				.date-content-img {
					width: 32rpx;
					height: 32rpx;
					margin-right: 20rpx;
				}

				input {
					width: 100%;
					height: 100%;
					font-size: 26rpx;
				}
			}
		}

		.gift-img {
			margin: 0 40rpx;

			.img-content-box {
				width: 670rpx;
				display: flex;
			}

			.img-content {
				width: 200rpx;
				height: 200rpx;
				border-radius: 6rpx;
				border: 2rpx solid #DDDDDD;
				box-sizing: border-box;
				margin-top: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;

				.close-box {
					padding: 14rpx;
					position: absolute;
					top: 0rpx;
					right: 0rpx;
					font-size: 0;

					.icon-close {
						width: 26rpx;
						height: 26rpx;
						// display: block;
					}
				}


				&.icon-img {
					image {
						width: 32rpx;
						height: 32rpx;
					}
				}

				&~.img-content {
					margin-left: 20rpx;
				}

				image {
					width: 100%;
					height: 100%;
				}
			}

			// .img-content + .img-content{
			// 	margin-left: 20rpx;
			// }
		}

		.remarks {
			margin: 60rpx 40rpx 120rpx;

			.remark-content {
				margin-top: 20rpx;
				width: 670rpx;
				height: 240rpx;
				border-radius: 6rpx;
				border: 2rpx solid #DDDDDD;
				box-sizing: border-box;
				padding: 40rpx 27rpx;

				textarea {
					width: 100%;
					height: 100%;
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}
		}

		.info-sure {
			margin: 0 40rpx;
			display: flex;
			justify-content: flex-start;

			.info-content {
				width: 32rpx;
				height: 32rpx;
				border: 3rpx solid #000000;
				box-sizing: border-box;
				margin-right: 20rpx;
			}

			h5 {
				font-size: 24rpx;
			}
		}

		.submit {
			margin: 43rpx 40rpx;
			width: 670rpx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: #000000;
			opacity: 0.3;
			font-size: 26px;
			color: #FFFFFF;
		}
	}
</style>
