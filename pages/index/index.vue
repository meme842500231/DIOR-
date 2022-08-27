<template>
	<view>
		<view class="headerBg">
			<headerBg isShowUser></headerBg>
		</view>
		<view class="my-search">
			<search @inputChange="inputChange"></search>
		</view>
		<view class="index-content">
			<view class="nav">
				<view class="nav-box" v-for="(item,index) in navList" :key="index">
					<view class="title" :class="{'empty':currentNav===index}" @click="selectNav(index)">{{item.text}}
					</view>
				</view>
			</view>
			<view class="index-content-select">
				<view v-for="(item,index) in tabList" :key="index" class="content-select"
					:class="{'content-selected':currentTab===index}" @click="selectTab(index)">
					{{item.text}}
				</view>
			</view>
			<view @click="godes(index)" class="itembox "
				:class="{'graybox':item.status===1,'bluebox':item.status===2,'redbox':item.status ===3}"
				v-for="(item,index) in list" :key="index">
				<view class="emptyItem"></view>
				<view class="item">
					<view class="item-content">
						<view class="h4">{{item.title}}</view>
						<view class="p">{{item.status | statusFilter}}</view>
					</view>
					<view class="item-date">
						<view class="h4">{{item.createTime}}</view>
						<view class="name">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="addApproval" @click="goInfoFill">
			<image class="icon-add" src="../../static/images/jiahao.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import headerBg from '@/components/header-bg/header-bg.vue'
	import search from '@/components/search/search.vue'
	import {
		loginTest
	} from '@/apis/login'
	import {
		approvalPut,
		approvalList,
		approvalDes
	} from '@/apis/approval.js'
	import {
		debounce
	} from '@/utils/tools'

	// 所有的nav item选项
	const navItems = {
		myRequest: {
			id: 0,
			text: '我的申报',
		},
		myTeam: {
			id: 1,
			text: '我收到的申报'
		},
		ccdMe: {
			id: 2,
			text: '抄送给我'
		}
	}

	// 所有的tab item选项
	const tabItems = {
		all: {
			id: 0,
			text: '全部'
		},
		tobeApproved: {
			id: 1,
			text: '待审批'
		},
		approved: {
			id: 2,
			text: '已通过'
		},
		rejected: {
			id: 3,
			text: '未通过'
		}
	}

	export default {
		data() {
			return {
				navList: [],
				tabList: [],
				list: [],
				currentTab: 0,
				currentNav: 0,
				pageNum: 1,
				pageSize: 5,
				keyWord: '',
			};
		},
		filters: {
			statusFilter(status) {
				const statusBox = ['待审批', '已通过', '未通过']
				return statusBox[status - 1]
			}
		},
		onReachBottom() {
			this.pageNum++
			this.requesList()
		},
		created() {
			this.isLogin()
			this.setNav()
			this.setTabList()
			this.requesList()
		},
		components: {
			headerBg,
			search
		},
		methods: {
			// 列表获取
			async requesList() {
				const [err, res] = await approvalList({
					type: this.navList[this.currentNav].id,
					status: this.tabList[this.currentTab].id,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					keyWord: this.keyWord
				})
				if (err) return
				if (this.pageNum === 1) {
					this.list = res.data.list
					return
				}
				this.list = [...this.list, ...res.data.list]
			},
			// 是否登录
			isLogin() {
				if (uni.getStorageSync('token')) return
				this.requestIoginTest()
			},
			// 测试登录
			async requestIoginTest() {
				const [err, res] = await loginTest({
					wwId: 'andy.ma'
				})
				if (err) return
				// console.log(res)
				uni.setStorageSync('userinfo', res.data)
				uni.setStorageSync('token', res.data.token)
			},
			// 分配nav
			setNav() {
				// 对象解构写法
				const {
					myRequest,
					myTeam,
					ccdMe
				} = navItems
				const userinfo = uni.getStorageSync('userinfo')
				switch (userinfo.role) {
					case 'HR':
						this.navList = [myRequest, myTeam, ccdMe]
						break
					case 'AM':
						this.navList = [myRequest, myTeam]
						break
					case 'STAFF':
						this.navList = [myRequest]
						break
				}
				// if (this.user === 'HR') {
				// 	this.navList = [myRequest, myTeam, ccdMe]
				// } else if (this.user === 'AM') {
				// 	this.navList = [myRequest, myTeam]
				// } else if (this.user === 'STAFF') {
				// 	this.navList = [myRequest]
				// }

				// if (this.user === 'HR') {
				// 	this.navList = [navItems.myRequest, navItems.myTeam, navItems.ccdMe]
				// } else if (this.user === 'AM') {
				// 	this.navList = [navItems.myRequest, navItems.myTeam]
				// } else if (this.user === 'STAFF') {
				// 	this.navList = [navItems.myRequest]
				// }
			},
			// 分配tablist
			setTabList() {
				const {
					all,
					tobeApproved,
					approved,
					rejected
				} = tabItems
				this.tabList = [
					all,
					tobeApproved,
					approved,
					rejected
				]
			},
			// 切换tab
			selectTab(index) {
				this.currentTab = index
				this.pageNum = 1
				this.requesList()
			},
			// 切换nav
			selectNav(index) {
				this.currentNav = index
				this.pageNum = 1
				this.requesList()
			},
			async godes(index) {
				uni.navigateTo({
					url: `/pages/info-des/info-des?id=${this.list[index].id}`
				})
			},
			// 输入框改变值
			inputChange: debounce(function(keyWord) {
				this.keyWord = keyWord
				this.pageNum = 1
				this.requesList()
			}),
			goInfoFill(){
				uni.navigateTo({
					url:'/pages/info-fill/info-fill'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-search {
		margin-top: 130rpx;
	}

	.index-content {
		display: flex;
		flex-direction: column;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 400;
		margin: 0 40rpx;

		.nav {
			display: flex;
			align-items: center;

			.nav-box {
				position: relative;

				&~.nav-box {
					margin-left: 40rpx;
				}
			}

			.title {
				height: 52rpx;
				line-height: 52rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #333333;



				// margin-top: 60rpx;
				&.empty {
					border-bottom: 4rpx solid #333333;
					font-size: 28rpx;
					font-weight: 600;
					color: #333333;

				}
			}
		}


		.index-content-select {
			width: 670rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 26rpx;
			color: #999999;
			margin-top: 30rpx;
			margin-bottom: 40rpx;

			.content-select {
				width: 150rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				border-radius: 6rpx;
				opacity: 0.5;
				border: 2rpx solid #DDDDDD;

				&.content-selected {
					font-size: 26rpx;
					font-weight: 500;
					opacity: 1;
					color: #333333;
					font-family: PingFangSC-Medium, PingFang SC;
				}
			}

		}

		.itembox {
			display: flex;
			width: 670rpx;
			height: 179rpx;
			border-radius: 12rpx;
			background: #F9F9F9;

			&.graybox {
				.emptyItem {
					background: #DDDDDD;
				}

				.p {
					color: #999999;
				}
			}

			&.redbox {
				.emptyItem {
					background: #EF4560;
				}

				.p {
					color: #EF4560;
				}
			}

			&.bluebox {
				.emptyItem {
					background: #318ACA;
				}

				.p {
					color: #318ACA;
				}
			}

			.emptyItem {
				width: 12rpx;
				height: 179rpx;
				border-top-left-radius: 12rpx;
				border-bottom-left-radius: 12rpx;
			}

			.item {
				width: 658rpx;
				height: 179rpx;
				padding: 40rpx 40rpx 30rpx 52rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.item-content {
					display: flex;
					justify-content: space-between;

					.h4 {
						font-size: 26rpx;
						font-weight: 400;
					}

					.p {
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
					}
				}

				.item-date {
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}

			&+.itembox {
				margin-top: 20rpx;
			}
		}
	}

	.addApproval {
		width: 90rpx;
		height: 90rpx;
		background: #000000;
		box-shadow: 0rpx 5rpx 15rpx 0rpx rgba(0, 0, 0, 0.3);
		border-radius: 50%;
		position: fixed;
		bottom:64rpx;
		left:50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
		align-items: center;
		
		.icon-add{
			width: 70rpx;
			height: 70rpx;
		}
		
	}
</style>
