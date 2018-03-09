<template>
    
    <div class="add-ad">
        <page-head title="广告管理" ref="head"></page-head>
        <div class="operationBox" ref="operBox" :class="{'top-fixed': oprFixed}">
            <div class="nt-row">
                <div class="nt-col nt-col-12"><a href="javascript:;" @click="back" class="col_57595b f16"><i
                        class="nt-icon-arrow-left f14 mR10" title="返回"></i>广告详情</a>
                </div>
            </div>
        </div>
        <div class="operationBox" :style="{display: oprFixed? 'block':'none'}"></div>
        <div class="contentBox" ref="addAdBox" v-loading.fullscreen.lock="!1">
            <div class="border_layout competing_infor">
                <template>
                    <div class="competing_infor_main ad-detail-top">
                        <nt-row>
                            <nt-col :span="8"><span class="w100 tR inline_block">广告编号：</span><span v-text="model.adNumber"></span></nt-col>
                            <nt-col :span="8">&nbsp;</nt-col>
                            <nt-col :span="8"><span class="w100 tR inline_block">广告状态：</span>已<span v-text="launchProStatus2[model.status]"></span></nt-col>
                        </nt-row>
                    </div>
                </template>
            </div>
            <div class="border_layout competing_infor mT20">
                <div class="competing_infor_title nt-row">
                    <div class="fb nt-col nt-col-24">基本信息</div>
                </div>
                <template>
                    <div class="competing_infor_main">
                        <nt-row class="mB15">
                            <nt-col :span="8"><span class="w100 tR inline_block">广告名称：</span><span v-text="model.campaignName"></span></nt-col>
                            <nt-col :span="8"><span class="w100 tR inline_block">投放国家：</span><span>美国</span><!-- <span v-text="model.salesCountry"></span> --></nt-col>
                            
                            <nt-col :span="8"><span class="w100 tR inline_block">创建时间：</span><span v-text="model.createTime"></span></nt-col>
                        </nt-row>
                        <nt-row>
                            <nt-col :span="8"><span class="w100 tR inline_block">卖家名称：</span><span v-text="seller"></span></nt-col>
                            <nt-col :span="8"><span class="w100 tR inline_block">每天预算：</span><span v-text="model.budget"></span><span>&nbsp;元</span></nt-col>
                            <!-- <nt-col :span="8">
                                <span class="w100 tR inline_block">状态：</span>
                                <nt-switch v-model="model.status === '0'? true: false" 
                                           on-text="" 
                                           off-text=""
                                           class="curdefault"
                                ></nt-switch>
                            </nt-col> -->
                            <nt-col :span="8"><span class="w100 tR inline_block">累计花费总额：</span><span v-text="model.allost"></span><span>&nbsp;元</span></nt-col>
                        </nt-row>
                    </div>
                </template>
            </div>
            <div class="competing_infor mT20">
                <div class="competing_infor_title nt-row">
                    <div class="fb nt-col nt-col-24">广告投放效果</div>
                </div>
                <div class="operationBox competing_infor_main">
                    <span>投放时间：</span>
                    <nt-button type="primary" @click="checkDate(0)" v-if="!1" :class="isDateSelected(0)">今天
                    </nt-button><nt-button type="ghost" @click="checkDate(1)" :class="isDateSelected(1)">7天
                    </nt-button><nt-button type="ghost" @click="checkDate(2)" :class="isDateSelected(2)">14天
                    </nt-button><nt-button type="ghost" @click="checkDate(3)" :class="isDateSelected(3)">30天
                    </nt-button><nt-button type="primary" @click="checkDate(4)" v-if="!1" :class="isDateSelected(4)">自定义时间</nt-button>
                    <div class="date-picker" v-show="customDate">
                        <nt-date-picker 
                                v-model="model.beginDate" 
                                type="date" 
                                placeholder="选择开始日期">
                        </nt-date-picker>
                        <nt-date-picker 
                                v-model="model.endDate" 
                                type="date" 
                                placeholder="选择结束日期">
                        </nt-date-picker>
                    </div>
                </div>
                <div class="chart-sep"></div>
                <ul class="chart-switch">
                    <li v-for="(item, i) in chartItems" :class="isSelected(i)" @click="switchChart(i, item)">
                        <p>
                            <span v-text="item.name"></span>
                            <nt-tooltip placement="top" width="400" trigger="hover" :content="getNoticeDet(i)">
                                <div slot="content" v-text="getNoticeDet(i)"></div>
                                <i class="col_f8ac59 nt-icon-xbn-19"></i>
                            </nt-tooltip>
                        </p>
                        <span v-text="item.value"></span>
                    </li>
                </ul>
                <template>
                    <!-- <ve-line :data="chartData" :settings="chartSetting"></ve-line> -->
                    <div id="chartDiv"></div>
                    <div v-if="noChartData" class="noChartData">
                        您还没有广告投放数据!
                    </div>
                </template>
            </div>
            <div class="border_layout competing_infor mT20">
                <div class="competing_infor_title nt-row">
                    <div class="fb nt-col nt-col-24">投放商品信息</div>
                </div>
                <template>
                    <div class="competing_infor_main">
                        <div class="nt-page-filter">
                            <nt-checkbox v-model="model.showDel" :disabled="showDelDis" v-show="showDel" @change="refreshData" class="mR30">显示“已删除”商品</nt-checkbox>
                            <nt-select v-model="filter.status" :placeholder="putStatus.label" @change="statusChange($event, refreshData)">
                                <nt-option
                                        v-for="item in putStatus.options"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="launchProductsStatusDisabled">
                                </nt-option>
                            </nt-select>
                            <nt-input icon="search"
                                      :on-icon-click="refreshData"
                                      @input="refreshData"
                                      v-model="filter.title"
                                      placeholder="请输入商品标题或ASIN进行搜索"
                                      class="w370 vM asin-search">
                            </nt-input>
                        </div>
                        <nt-table :data='list' ref="proList" class="noBorder">
                            <nt-table-column
                                    prop="title" label="商品信息" min-width="300" sortable1="launStatusSort" class="tl">
                                <template slot-scope="scope">
                                    <div class="pro-info">
                                        <img class="d"
                                             :src="scope.row.imageLink"
                                             alt="">
                                        <!-- <span class="c_575958">{{scope.row.productInfo.desc}}</span> -->
                                        <a class="c_575958" :href="amazon+scope.row.extractKey"
                                           target="_blank" v-text="setListTitle(scope.row)"></a>
                                        <p>
                                            <img src="../../images/flag.png" alt="">
                                            <!-- <span>{{scope.row.productInfo.ASIN}}</span> -->
                                            <span>{{scope.row.extractKey}}</span>

                                            <nt-tooltip placement="top" v-if="scope.row.status == null ? (scope.row.extractStatus == 0 ? true : false) : true">
                                                    <nt-button type="text"><a target="_blank" :href="scope.row.originalUrl"><i class="nt-icon-xbn-62 "></i>1</a></nt-button>
                                                    <div slot="content" >亚马逊链接</div>
                                            </nt-tooltip>
                                            <nt-tooltip placement="top" v-if="scope.row.status == null ? (scope.row.extractStatus == 0 ? false : false) : true">
                                                <nt-button type="text"><a target="_blank" :href="scope.row.link"><i class="nt-icon-xbn-62"></i>2</a></nt-button>
                                                <div slot="content" >落地页链接</div>
                                            </nt-tooltip>
                                        </p>
                                    </div>
                                </template>
                            </nt-table-column>
                                <nt-table-column
                                        prop="exposure" label="曝光量" min-width="100" sortable1>
                                    <template slot-scope="scope">
                                        <span v-text="scope.row.exposure==null?'-':scope.row.exposure "></span>
                                    </template>
                                </nt-table-column>
                                <nt-table-column
                                        prop="clicks" label="点击量" min-width="100" sortable1>
                                    <template slot-scope="scope">
                                        <span v-text="scope.row.clicks==null?'-':scope.row.clicks"></span>
                                    </template>
                                </nt-table-column>
                                <nt-table-column
                                        prop="cpc" label="平均点击单价" min-width="100" sortable1="!1">
                                    <template slot-scope="scope">
                                        <span v-text="scope.row.cpc==null?'-': decimalFill(scope.row.cpc) + '元'"></span>
                                    </template>
                                </nt-table-column>
                                <nt-table-column
                                        prop="earnings" label="销售额" min-width="100" sortable1>
                                    <template slot-scope="scope">

                                        <nt-tooltip placement="top" width="400" ref="statusNoticePop" trigger="hover">
                                            <div slot="content" v-text="'约等于人民币：'+`${(scope.row.earnings==null?0:String(scope.row.earnings).slice(1)*6.7).toFixed(2)}`+'元'"></div>
                                            <span
                                            v-text="`${(scope.row.earnings==null?'-':(String(scope.row.earnings).slice(1)*1).toFixed(2) + '美元')}`"></span>
                                        </nt-tooltip>
                                    </template>
                                </nt-table-column>
                            <nt-table-column
                                    prop="status" label="状态" min-width="90" sortable1="launStatusSort">
                                <template slot-scope="scope">
                                    <span v-text="getLaunchStatusText(scope.row)"></span>
                                </template>
                            </nt-table-column>
                            <template slot="empty" slot-scope="props">
                                您还没有添加任何商品!
                            </template>
                        </nt-table>
                        <div class="center">
                            <nt-button @click="loadList" v-show="showLoadMoreBtn">查看更多</nt-button>
                        </div>
                        <nt-row class="mB15">
                        </nt-row>
                    </div>
                </template>
            </div>
            <div  class="border_layout competing_infor mT20">
                <div class="competing_infor_title nt-row">
                    <div class="fb nt-col nt-col-24">操作日志</div>
                </div>
                <template>
                    <nt-row>
                        <nt-col v-for="i in operations" class="operation-logs">
                            <span v-text="i.createTime"></span>
                            <span v-text="i.message"></span>
                        </nt-col>
                    </nt-row>
                </template>
            </div>
        </div>
    </div>

</template>

<script type="text/javascript">
    import {PageHead, TemplateSearchList} from 'xbn-biz-components'
    import CONSTANTS from '../../config/adStrategy/const'
    import MAP from '../../config/map'
    import Highcharts from 'highcharts'
    import STATUSCODE from '../../config/statusCode'

    export default {
        props: {
            pageSize: {
                type: Number,
                default: 10
            }
        },

        data() {
            let adId = this.$route.params[0],
                status = this.$route.query.s,
                seller = this.$route.query.se

            return {
                oprFixed: false,
                model: {

                },
                product: {
                    country: 'am'
                },
                showDel: !0,
                showDelDis: !1,
                showAddPro: !1,
                showChoosePro: !1,
                addedProduct: [],
                customDate: !1,
                launchProductsStatusDisabled: !1,
                adModel: this.ctx.models.MarketingModel.ad,
                productModel: this.ctx.models.MarketingModel.product,
                switchColor: CONSTANTS.switchColor,
                launchProStatus: CONSTANTS.launchProStatus,
                launchProStatus2: CONSTANTS.adStatus,
                amazon: 'https://www.amazon.com/gp/product/',
                lampsuper: 'https://www.lampsuper.com/products/',
                chartData: {},
                adId: adId,
                chartSetting: {
                    lineStyle: {
                        normal: {
                            color: '#2ba3e7'
                        }
                    },
                    //metrics: ['']
                },
                filter: {},
                showLoadMoreBtn: !1,
                putStatus: MAP.adDetailStatus,
                selectedChartItem: '0',
                chartItems: [{
                    name: '曝光量',
                    value: '',
                    type: 'impressions'
                }, {
                    name: '点击量',
                    value: '',
                    type: 'clicks'
                }, {
                    name: '平均点击单价',
                    value: '',
                    type: 'averageCpc'
                }, {
                    name: '花费总额',
                    value: '',
                    type: 'cost'
                }, {
                    name: '销售总额',
                    value: '',
                    type: 'earnings'
                }],
                operations: [],
                list: [],
                noChartData: !1,
                loadAdInfo: !0,
                adStatus: status,
                seller:seller,
                decimalNum: 0,
                isDollor: !1,//图表中是否带$

                reportParam: {
                    campaignId: adId,
                    dateRangeType: 1,
                    pagingInfo: {
                        query: {
                            campaginId: adId,
                            isDelete: '0'
                        },
                        pageNo: 1,
                        pageSize: this.pageSize,
                    }
                }
            }
        },

        methods: {
            async getData() {
                let res = await this.adModel.adDetail(this.adId, this.ctx)
                if (res.statusCode == STATUSCODE.SUCCESS) {
                    this.model = res.data[0]
                    this.model.budget = this.decimalFill(this.model.budget)
                    //this.model.createTime += ':00'
                    //this.adStatus = this.model.status
                }

                //消费总额 由于速度慢
                let res1 = await this.adModel.totalConsumption(this.adId, this.ctx)
                if (res1.statusCode == STATUSCODE.SUCCESS) {
                    this.model.allost = this.decimalFill(res1.data[0].allost)
                }
            },

            //自动补全小数点, 默认2位
            decimalFill(val, num = 2) {
                (val + '').indexOf('.') === -1 && (val += '.')
                return Number(val).toFixed(num)
            },

            back() {
                this.$router.back()//.replace('/ad-strategy')
            },

            getNoticeDet(i) {
                return CONSTANTS.notice['noticeDet' + (++i)]
            },

            checkDate(date) {
                this.reportParam.dateRangeType = date
                this.getReportData()
            },
            
            showExitProduct() {
                this.showChoosePro = !0
            },

            showAddProduct() {
                this.showAddPro = !0
            },

            chooseProduct() {
                this.addedProduct = this.$refs.addedProductList.selected
                this.showChoosePro = !1
                this.$refs.addProList.refreshData()
            },

            getLaunchStatusText(row) {
                return this.launchProStatus[row.status]
            },

            addProduct() {
                this.$refs.productForm.validate((valid) => {
                    if (valid) {
                        let data = {

                        },
                        res = this.ctx.models.MarketingModel.ad.addProduct(data)
                    }
                })
            },

            isDateSelected(i) {
                return this.reportParam.dateRangeType == i? 'active': ''
            },

            isSelected(i) {
                return this.selectedChartItem == i? 'active': ''
            },

            loadList() {
                this.reportParam.pagingInfo.pageSize += this.pageSize
                this.refreshData('loadFromMoreBtn')
            },

            refreshData(loadMore) {
//                if(this.$refs.ha.$el.children[0].className.indexOf('is-checked') > -1){
//                    this.launchProductsStatusDisabled = !0
//                }

                if (!this.model.showDel) {
                    this.launchProductsStatusDisabled = !1
                    this.reportParam.pagingInfo.query.isDelete = '0'
                } else {
//                    this.launchProductsStatusDisabled = !0
                    this.reportParam.pagingInfo.query.isDelete = null
                }
                this.launchProStatus === '9' && (this.reportParam.pagingInfo.query.isDelete = null)

                if (loadMore !== 'loadFromMoreBtn') {
                    this.reportParam.pagingInfo.pageSize = this.pageSize
                }

                let filter = this.filter
                for (let i in filter) {
                   this.reportParam.pagingInfo.query[i] = filter[i]
                }

                let qqq = this.reportParam.pagingInfo.query
                qqq.title? (qqq.productId = qqq.title): delete qqq.productId
                this.getReportData()
            },

            statusChange(val, callback) {
                let i, t = this
                t.showDel = !((i = 'null9'.indexOf(val)) > -1 ? (t.showDelDis = t.model.showDel = !(i === 0 ? 1 : 0), 0) : 1)
                callback()
            },

            switchChart(index, item) {
                this.selectedChartItem = index
                this.setChartData(item.type)
            },

            async getReportData() {
                let res = await this.adModel.adResult(this.reportParam, this.ctx)
                if (res.statusCode == STATUSCODE.SUCCESS) {
                    this.reportData = res.data

                    this.setChartData()
                    this.addLuanchedData()
                    this.setChartItem()
                    this.setLoadMoreBtn()
                } else {

                }
                
            },

            setLoadMoreBtn() {
                let page = this.reportData.campaignProductList.page
                this.showLoadMoreBtn = page.totalCount > page.pageSize? !0: !1
            },

            setListTitle(row) {
                let waitText = null,
                    textType1 = '系统正在收集商品信息，可能要花费一点时间，请耐心等待。',
                    textType2 = '您添加的ASIN有误或网络原因，无法获取商品信息，请删除本商品并重新添加商品。'

                if (row.title == null) {
                    if (row.extractStatus == 0 || row.extractStatus == 1){
                        waitText = textType1;
                    }else if (row.extractStatus == 2 || row.extractStatus == 3) {
                        waitText = textType2
                    }
                    !row.extractStatus && (row.title = textType1)
                } else {
                    waitText = row.title
                }
                return waitText
            },

            //添加图标的数据
            setChartData() {
                let ItemData   = this.reportData.customerReportList,
                    addDecimal = ['cost', 'earnings', 'averageCpc'],
                    columns    = ['date', 'num'],
                    rows = [],
                    date = [],
                    data = [],
                    item = null

                if (!ItemData) return
                ItemData.forEach(i => {
                    rows.push({
                        date: i.reportDate,//.replace(/-/g, '.'),
                        num:  i[this.chartItems[this.selectedChartItem].type]
                    })
                    date.push(i.reportDate.replace(/-/g, '.'))
                    item = this.chartItems[this.selectedChartItem]

                    this.decimalNum = addDecimal.indexOf(item.type) > -1? 2: 0
                    this.isDollor   = !(item.type === 'earnings'? 0: 1)
                    data.push(i[item.type])
                })

                this.chartData = {
                    //columns: columns,
                    //rows: rows,
                    date: date,
                    data: data,
                    item: item
                }

                this.addCharts()
            },

            //添加图片下方的列表
            addLuanchedData() {
                this.list = this.reportData.campaignProductList.list
                /*this.$children.every(i => {
                    let flag = true
                    if (i.$vnode.tag.indexOf('ad-pro') > -1) {
                        i.injectListData()
                        flag = false
                    }
                    return flag
                })*/
            },

            setChartItem() {
                let dd = this.reportData.customerReport
                if (!dd) {
                    this.noChartData = !0
                    return
                }
                this.chartItems = [{
                        name: '曝光量',
                        value: dd.impressions,
                        type: 'impressions'
                    }, {
                        name: '点击量',
                        value: dd.clicks,
                        type: 'clicks'
                    }, {
                        name: '平均点击单价',
                        value: this.decimalFill(dd.averageCpc) + '元',
                        type: 'averageCpc'
                    }, {
                        name: '花费总额',
                        value: this.decimalFill(dd.cost) + '元',
                        type: 'cost'
                    }, {
                        name: '销售总额',
                        value: this.decimalFill(dd.earnings) + '美元',
                        type: 'earnings'
                    }]
            },

            //获取操作日志
            async getOperations() {
                let res = await this.adModel.adOperateLog(this.adId, this.ctx)
                this.operations = res.data
            },

            setScrollBoxHeight() {
                let height = document.body.offsetHeight - 3 - 120 - 50
                this.$refs.addAdBox && (this.$refs.addAdBox.style.height = height + 'px')
            },

            getTooltip() {
                let y = this.decimalNum? this.isDollor? '{point.y}美元': '{point.y}元': '{point.y}'
                let html = [
                    '<span style="fill:#2ba3e7" x="8" dy="15">●</span>',
                    '<span dx="0"> {series.name}: </span>',
                    `<span style="font-weight:bold" dx="0">${y}</span>`
                ].join('')

                return html
            },

            getTooltip2(tar) {
                var html = ''

                //tar.point.forEach(function (item) {
                    let y = this.decimalNum? this.isDollor? tar.y + '美元': tar.y + '元': tar.y

                    html += [
                        tar.x +'<br>',
                        '<span style="fill:#2ba3e7" x="8" dy="15">●</span>',
                        '<span dx="0"> '+ tar.series.name +': </span>',
                        '<span style="font-weight:bold" dx="0">'+ y +'</span>'
                    ].join('')

                //})
                
                return html
            },

            addCharts() {
                var me = this
                Highcharts.chart('chartDiv', {
                    title: {
                        text: ''
                    },

                    credits: {
                        enabled:false //去除版权信息
                    },

                    xAxis: {
                        categories: this.chartData.date,
                        gridLineWidth: 1
                    },
                    
                    tooltip: {
                        valueDecimals: this.decimalNum,
                        formatter() {
                            return me.getTooltip2(this)
                        }
                        //pointFormat: this.getTooltip()//'<span style="font-size: 10px">{point.y}.00</span><br/>'
                    },

                    legend: false,

                    yAxis: {
                        title: '',
                        tickPixelInterval: 36
                    },

                    series: [
                        {
                            name: this.chartData.item.name,
                            data: this.chartData.data,
                            color: '#2ba3e7'
                        }
                    ]

                });
            },
            /**
             * 处理滚动时，保持操作栏位于页面顶端 (会消失的情形下)
             **/
            handleScroll: function() {
                //获取页面头的高度
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > this.$refs.operBox.offsetHeight) {
                    this.oprFixed = true;
                } else {
                    this.oprFixed = false;
                }
            }
            
        },

        mounted() {
            //this.setScrollBoxHeight()
            //window.addEventListener('resize', this.setScrollBoxHeight)
            document.addEventListener('scroll',this.handleScroll)
        },

        destroyed() {
            document.removeEventListener('scroll',this.handleScroll)
        },

        created() {
            this.getData()
            this.getReportData()
            this.getOperations()
        },
  
        computed: {

        },

        components: {
            PageHead,
            TemplateSearchList
        }
    }

</script>

<style type="text/css" lang="less">
    @import '../../style/props';

    .add-base-info {
        > .nt-row {
            margin-bottom: 8px;
            > .nt-col {
                > span:first-child {
                    display: inline-block;
                    width: 100px;
                    text-align: right;
                    margin-right: 16px;
                }
            }
        }
    }
    .marketing-main {
        .ad-date-box {
            button {
                background-color: #fff;
                color: @c_green;
                &.active {
                    background-color: @c_green;
                    color: #fefeff;
                }
            }
        }
    }
    .date-picker {
        display: inline-block;
        vertical-align: middle;
        > .nt-date-editor {
            width: 140px;
        }
    }
    .chart-switch {
        height: 70px;
        line-height: 49px;
        padding-left: 60px;
        font-weight: bold;
        border-bottom: 3px solid #e7eaec;
        color: #a9a6a6;
        > li {
            float: left;
            width: 140px;
            height: 68px;
            text-align: center;
            cursor: pointer;
            &.active {
                border-bottom: 3px solid @c_yellow;
                color: #666;
            }
            &:hover {
                color: #666;
            }
            > p {
                margin-bottom: -30px;
            }
        }
        .notice {
            margin-right: -20px;
        }
    }
    .chart-sep {
        height: 4px;
        background-color: #f3f3f4;
        /*width: 105%;*/
        margin-left: -36px;
    }
    .ad-date-box {
        margin-bottom: 8px;
    }
    .w100{
        width: 100px;
    }
    .curdefault{
        cursor: default;
        .nt-switch__label{
            cursor: default;
        }
    }
    .operationBox {
        &.top-fixed {
            position: fixed;
            z-index: 999;
            right: 0;
            left: 0;
            top: 0;
        }
    }
    .noChartData {
        height: 120px;
        line-height: 120px;
        text-align: center;
        color: #5e827b;
    }
    .btn-content {
        display: flex;
        justify-content: flex-end;
    }

    .status-notice {
        position: absolute;
        z-index: 2;
        display: none;
        margin-top: 17px !important;
    }

    .status-checkbox {
        width: 110px;
    }

    .showPro-box > .nt-dialog {
        width: 540px;
    }

    .showAddProNotice {
        position: absolute;
        top: 15px;
        left: 116px;
    }

    .pro-info {
        > img {
            width: 80px;
            height: 80px;
            display: block;
            float: left;
            margin-right: 18px;
        }
        > a {
            display: inline-block;
            height: 32px;
            word-break: break-word;
            white-space: normal;
            padding: 8px 0;
            width: 248px;
            vertical-align: top;
            overflow: hidden;
            margin-bottom: 10px;
        }
    }

    .add-product-box-notice {
        margin-bottom: 14px;
        margin-left: 20px;
        color: #57595b;
    }

    .add-product-box-textarea {
        width: 80%;
        margin-right: 8px;
    }

    .add-product {
        > .nt-page-pagination {
            text-align: center;
            background: #f3f3f4;
            padding-top: 24px;
        }
    }

    .nt-popover .popper__arrow.popper_bottom {
        top: -13px;
        border-bottom-color: #d1e5e3;
        left: 90px;
    }

    .hideConfirmCanBtn {
        > .nt-popover {
            .popoverBtn > button:nth-child(2) {
                display: none;
            }
        }
    }

    .center {
        text-align: center;
    }

    .mR30 {
        margin-right: 30px;
    }

    .add-ad .operationBox {
        box-shadow: none;
    }

    .d {
        background: url("../../images/default.jpg");
        background-repeat: no-repeat;
    }
    .operation-logs {
        padding: 12px 29px;
        > span:first-child {
            margin-right: 80px;
        }
    }
    .ad-detail-top{
        padding: 22px 32px;
    }
    .asin-search {
        margin-top: -3px;
    }
</style>