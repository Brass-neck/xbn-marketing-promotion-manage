<style lang="less">
    .pdt-manage {
    .nt-textarea{width:65%;vertical-align: top}
        .nt-form--inline .nt-form-item__content {
            width: 100%
        }
        h3 {
            font-weight: 700;
        }
        .mr20 {
            margin-right: 20px;
        }
    .w30p {
        width: 30%
    }
        .w45p {
            width: 45%
        }
        .w100 {
            width: 100px;
        }
        .w100p {
            width: 100%
        }
        .vat {
            vertical-align: top;
        }
        .disib {
            display: inline-block
        }
        .flag_icon {
            background: url(../../images/country_icon.png) no-repeat;
        }

        .flag {
            width: 23px;
            height: 14px;
            position: absolute;
            top: 12px;
            left: 10px;
            display: block;
            vertical-align: -2px;
        }

        /*美国*/
        .amer {
            background-position: -10px -10px;
        }

        .defule_flag .flag {
            position: inherit;
            top: 0px;
            left: 0px;
            display: inline-block;
            margin-right: 7px;
        }

        .opera_btn {
            margin: 0px 8px;
            color: #676a6c;
            transition: color .5s ease 0s;
            i {
                transition: color .5s ease 0s;
                color: #676a6c;
                vertical-align: middle;
            }
            i:hover {
                color: #f8ac59;
                transition: color .5s ease 0s;
            }
        }

        .opera_btn:hover {
            color: #f8ac59;
            transition: color .5s ease 0s;
        }

        .nt-table .nt-tooltip.cell .ellipsis2 {
            white-space: normal;
        }

        .default_img {
            background: url('../../images/default.jpg');
        }

        .edit_box {
            background: #f5f5f5;
            padding: 40px;
            .each_item {
                margin-left: 60px;
                .item_label {
                    vertical-align: top;
                }
                .item_content {
                    word-break: break-all;
                    display: inline-block;
                    width: 80%;
                }
                .necessary_icon {
                    color: red;
                    font-size: 26px;
                    vertical-align: -10px;
                    margin-right: 10px;
                    font-weight: bold;
                }
                .nt-form-item__error {
                    margin: -6px 0 0 128px;
                }
            }
        }
    }
    .shopify .necessary_icon{color:gray!important;}

    #but {
        position: relative;
        top: -45px;
        left: 25px;
    }

    .basics {
        border-radius: 5px;
        border: 01px solid #BBBBBB;
        background: #fff;
    }

    .goods {
        width: 570px;
        height: 20px;
        padding: 5px 10px;
        background: #F5F5F5;
    }

    .sel {
        width: 150px;
        padding: 3px;
    }

    .selg {
        width: 350px;
        padding: 3px;
    }

    .gdprice {
        width: 150px;
        height: 34px;
        line-height: 34px;
        padding: 0px 10px;
    }

    .gdtitle {
        width: 560px;
    }

    

    .upload-trigger .nt-icon-plus {
        position: relative;
        top: -15px;
    }

    .text2 {
        resize: none;
        width: 900px;
        height: 200px;
        padding: 10px 15px;
    }

    .text1 {
        resize: none;
        width: 400px;
        height: 80px;
        padding: 10px 15px;
    }

    .bot {
        text-align: center;
    }

    .uploaderCover {
        position: absolute;
        width: 100px;
        height: 100px;
        top: 0;
        right: 0;
        z-index: 22;
        cursor: pointer;
    }

    .por {
        position: relative;
    }
    .pro-link {
        margin: 0 6px;
        
    }
    .pro-link:hover {
        color: #f8ac59;
    }
    .custom-size {
        .nt-form-item__error {
            margin-left: 0 !important;
        }
    }
</style>
<template>
    <div class="pdt-manage">
        <template-search-list ref='pageTmpl' title='商品管理' :simple='simpleSearch'
                              :method='getData'
                              :filter='quickFilter'>
            <template slot='page-table-operations'>
                <nt-button type="success" @click="passFailAll($event)">通过</nt-button>
            </template>
            <template slot='page-table' slot-scope='props' class='contentBox'>
                <div class='contentBox' style="position: relative">
                    <nt-table
                            :data="props.tableData"
                            :default-sort="{prop: 'createDate', order: 'descending'}"
                            ref="proListRef"
                            style="width: 100%">
                        <nt-table-column
                                type="selection"
                                width="55">
                        </nt-table-column>
                        <nt-table-column label="商品信息" width="300px">
                            <template slot-scope="scope">
                                <dl class="tab_dl">
                                    <!--<dt class="default_img"><img width="100%" onerror=""-->
                                    <!--:src="scope.row.imageLink" alt=""></dt>-->
                                    <dt class="default_img">
                                    <div :style="scope.row.imageLink ? {width:'80px',height:'80px',background:'#fff url('+ scope.row.imageLink +') no-repeat center center / contain'} : {}"></div>
                                    </dt>


                                    <dd>
                                        <nt-tooltip placement="top" trigger="hover" :content="scope.row.title">
                                            <a href="javascript:;" class="pdt-title tab_dl_link ellipsis2">{{scope.row.title}}</a>
                                        </nt-tooltip>
                                        <p class="tab_dl_tips fix">
                                            <span class="fL defule_flag">
                                                <i class="flag_icon flag amer"></i>
                                                <a href="javascript:;" target="_blank">{{scope.row.extractKey}}</a>

                                                <nt-tooltip placement="top" v-if="scope.row.extractStatus == 0 ? true : (scope.row.extractStatus == 1 ? true : false)">
                                                    <a target="_blank" :href="scope.row.originalUrl" class="pro-link"><i class="nt-icon-xbn-62 "></i>1</a>
                                                    <div slot="content" >亚马逊链接</div>
                                                </nt-tooltip>
                                                <nt-tooltip placement="top" v-if="scope.row.extractStatus == 0 ? false : (scope.row.extractStatus == 1 ? true : false)">
                                                    <a target="_blank" :href="scope.row.link" class="pro-link"><i class="nt-icon-xbn-62 "></i>2</a>
                                                    <div slot="content" >落地页链接</div>
                                                </nt-tooltip>
                                            </span>
                                        </p>
                                    </dd>
                                </dl>
                            </template>
                        </nt-table-column>
                        <nt-table-column label="Google分类" prop="googleCategory">
                            <template slot-scope="scope">
                                <span v-if="scope.row.googleCategory">{{scope.row.googleCategory}}</span>
                                <span v-if="!scope.row.googleCategory">————</span>
                            </template>
                        </nt-table-column>
                        <nt-table-column label="价格" prop="formattedPrice" sortable="0">
                            <template slot-scope="scope">
                                <span v-if="scope.row.formattedPrice">{{scope.row.formattedPrice}}</span>
                                <span v-if="!scope.row.formattedPrice">————</span>
                            </template>
                        </nt-table-column>
                        <nt-table-column label="创建时间" prop="createDate" sortable>
                            <template slot-scope="scope">
                                <span v-if="scope.row.createDate">{{scope.row.createDate}}</span>
                                <span v-if="!scope.row.createDate">————</span>
                            </template>
                        </nt-table-column>
                        <nt-table-column label="广告名称" prop="advertisingStrategy">
                            <template slot-scope="scope">
                                <span v-if="scope.row.advertisingStrategy">{{scope.row.advertisingStrategy}}</span>
                                <span v-if="!scope.row.advertisingStrategy">————</span>
                            </template>
                        </nt-table-column>
                        <nt-table-column label="商家">
                            <template slot-scope="scope">
                                <span v-if="scope.row.userName">{{scope.row.userName}}</span>
                                <span v-if="!scope.row.userName">————</span>
                            </template>
                        </nt-table-column>
                        <nt-table-column label="运营人员" prop="operator"></nt-table-column>
                        <nt-table-column label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.putStatus">{{scope.row.putStatus|handlePutStatus}}</span>
                                <span v-if="!scope.row.putStatus">————</span>
                            </template>
                        </nt-table-column>
                        <nt-table-column label="操作">
                            <!--TODO 通过状态判断操作-->
                            <template slot-scope="scope">
                                <nt-button type="text" v-if="scope.row.putStatus==5" @click="passFail(scope.row.pk)">
                                    通过
                                </nt-button>
                                <nt-button type="text" v-if="scope.row.putStatus==5" @click="showBox(scope.row.pk)">拒绝
                                </nt-button>
                                <nt-button type="text" v-if="scope.row.putStatus==6||scope.row.putStatus==2"
                                           @click="cause(scope.row.productId,scope.row.putStatus)">查看原因
                                </nt-button>
                                <a href="javascript:void(0);" class="main_color" v-if="scope.row.putStatus == 11 || scope.row.putStatus == 6" @click="editPdt(scope.row)">详情</a>
                                <a href="javascript:void(0);" class="main_color" v-else @click="editPdt(scope.row)">编辑</a>
                            </template>
                        </nt-table-column>
                        <nt-table-column width="1" type="expand">
                            <template slot-scope="scope">
                                <edit v-if="isEdit" :row="scope.row"></edit>
                                <detail v-if="!isEdit" :row="scope.row"></detail>
                            </template>
                        </nt-table-column>
                    </nt-table>
                    <nt-dialog title="确定要拒绝通过这个商品吗？" :visible.sync="dialogTableVisible">
                        <nt-form ref="form" :model="ruleForm" :rules="rules" label-width="80px">
                            <nt-form-item label="拒绝理由" prop="reason">
                                <nt-input type="textarea" v-model="ruleForm.reason"></nt-input>
                            </nt-form-item>
                            <nt-form-item>
                                <nt-button @click="dialogTableVisible = false">取 消</nt-button>
                                <nt-button type="primary" @click="submit">确 定</nt-button>
                            </nt-form-item>
                        </nt-form>
                    </nt-dialog>
                </div>
            </template>
        </template-search-list>
    </div>
</template>

<script type="text/javascript">
    import STATUSCODE from '../../config/statusCode'
    import MAP from '../../config/map'
    import Edit from './edit'
    import Detail from './detail'

    export default {
        props: {},

        data() {
            return {
                isEdit:!0,  // 详情还是编辑
                //详情表单验证
                expandProp: {
                    formattedPrice: '',
                    salePriceFormatted: '',
                    tax: '',
                    shipping: '',
                    description: '',
                    title: '',
                    gtin: '',
                    brand: ''
                },  // 展开行获取到的详情内容对象
                validateMsg:'',
                condition: 'New',
                //规则验证
                ruleForm: {
                    reason: ''
                },
                rules: {
                    reason: [{required: true, message: '请填写拒绝理由', trigger: 'blur'}]
                },
                //查看原因
                causemes: '',
                //上次图片数组
                picUrlArr: [],
                //商品pk
                pk: '',
                //隐藏弹框
                dialogTableVisible: false,
                // 商品库存
                availability: [
                    {
                        value: 'in stock',
                        label: 'in stock'
                    },
                    {
                        value: 'out of stock',
                        label: 'out of stock'
                    },
                    {
                        value: 'preorder',
                        label: 'preorder'
                    }
                ],
                availabilityValue: '',

                // size
                size: [
                    {
                        value: 'one size',
                        label: 'one size'
                    },
                    {
                        value: 'OS',
                        label: 'OS'
                    },
                    {
                        value: 'one size fits all',
                        label: 'one size fits all'
                    },
                    {
                        value: 'OSFA',
                        label: 'OSFA'
                    },
                    {
                        value: 'one size fits most',
                        label: 'one size fits most'
                    },
                    {
                        value: 'OSFM',
                        label: 'OSFM'
                    },
                    {
                        value: '自定义',
                        label: '自定义'
                    }
                ],
                customSize:'',

                // 性别
                sex: [
                    {
                        value: 'Male',
                        label: 'Male'
                    },
                    {
                        value: 'Female',
                        label: 'Female'
                    },
                    {
                        value: 'Unisex',
                        label: 'Unisex'
                    }
                ],
                sexValue: 'Male',

                // 年龄组
                age: [
                    {
                        value: 'Newborn',
                        label: 'Newborn'
                    },
                    {
                        value: 'Infant',
                        label: 'Infant'
                    },
                    {
                        value: 'Toddler',
                        label: 'Toddler'
                    },
                    {
                        value: 'Kids',
                        label: 'Kids'
                    },
                    {
                        value: 'Adult',
                        label: 'Adult'
                    }
                ],
                logoUrl: [], // 上传logo信息
                logoUploadUrl: '',
                type: 'image/jpeg,image/png',      // 商品图片的格式
                multiUrls: [
                    {
//                        "fileId": "ff8080815fed41990160268032bd037e",
//                        "name": "16014596_14490548308.jpg",
//                        "url": "http://uimage.xbniao.com/xbngcfs/2017/12/05/e2f76007-c2f8-4ccf-a2de-be9332471470.jpg"
                    }
                ],
                defaultSort: {
                    prop: 'createDate',
                    order: 'descending'
                },
                statusArr: [
                    {'id': 1, 'value': 3, 'label': '投放中'},
                    {'id': 2, 'value': 4, 'label': '已关闭'},
                    {'id': 3, 'value': 0, 'label': '正在审核'},
                    {'id': 4, 'value': 1, 'label': '审核通过'},
                    {'id': 5, 'value': 2, 'label': '审核失败'}
                ],
                simpleSearch: [{
                    'value': 'PMseller',
                    'label': '商家',
                    'placeholder': '输入商家或运营人员名称'
                }, {
                    'value': 'operator',
                    'label': '运营人员',
                    'placeholder': '输入商家或运营人员名称'
                }],

                quickFilter: [MAP.shopCategory, MAP.googleCategory, MAP.putStatus, MAP.createDateNum],
                deletePopoverShow: false,
                showUploadPic: !0,
                updateTime: '',
                upStatus: '',
                showStatus: false,
                showApparel: !1
            }
        },
        async created() {
            this.logoUploadUrl = this.ctx.servers.marketing.options.baseURL + '/file/upload?fileType=1&name=banana.jpg&size=9366'

        // google分类获取 与 其列表赋值

        let googleRes                = await this.ctx.models.MarketingModel.product.googleCategory(this.ctx, 0),
            googleResArr             = googleRes.data,
            len                 = googleResArr.length,
            quickFilterCategory = [];

        for(let i = 0 ; i < len; i++){
            quickFilterCategory[i] = {
                id    : googleResArr[i].id,
                label : googleResArr[i].category,
                value : googleResArr[i].category
            }
        }
        MAP.googleCategory.options = quickFilterCategory


            // 店铺列表赋值

            let shopParam = {
                        pageNo:1,
                        pageSize:10,
                        query:{userId: 0}
                    },
                    shopNameRes  = await this.ctx.models.MarketingModel.product.findShopByPage(this.ctx, shopParam),
                    shopNameList = shopNameRes.data.list;

            shopNameList.forEach((o, i) => {
                MAP.shopCategory.options.push({
                    'id': o.id,
                    'value': o.id,
                    'label': o.shopName
                })
            })
        },
        methods: {
            editPdt: function (row) {
                row.putStatus == 11 ? this.isEdit = !1 : this.isEdit = !0
                let table = this.$refs.proListRef,
                        expand = table.store.states.expandRows,
                        index = expand.indexOf(this.prevExpandRow)

                if (this.prevExpandRow && this.prevExpandRow != row) {
                    //如果不加定时器，edit就不会调用create
                    setTimeout(i => {
                        index > -1 && expand.splice(index, 1)
                }, 100)
                }
                table.store.commit('toggleRowExpanded', row)
                this.prevExpandRow = row
            },


//            async getGoogleCategory(id = 0, index = 'one') {
//                if (id == null) return
//                let res = await this.ctx.models.MarketingModel.product.googleCategory(this.ctx, id)
//                this.googleCat[index] = res.data
//                this.googleProductCategory.length && this.echoGoogleCat()
//            },



            // 上传logo
            uploadLogo: function (event, file, fileList) {
                //this.ctx.models.MarketingModel.product.uploadFile(this.ctx, (1 || file.raw.type), file.name ,file.size)
            },
            beforeLogoUpload(file) {
                //this.logoUploadUrl = this.ctx.servers.marketing.options.baseURL + '/file/upload?fileType=1&name=' + file.name 
            },
            //查看原因
            cause: async function (productId, putStatus) {
                let item = await this.ctx.models.MarketingModel.product.getProductFailReason(this.ctx, productId, putStatus);
                this.causemes = item.data;
                if (item.statusCode == STATUSCODE.SUCCESS && this.causemes) {
                    this.$alert(`${ this.causemes }`, '拒绝理由', {
                        confirmButtonText: '确定',
                        customClass: 'pro-err-reason'
                    });
                }
            },
            del: function () {
                this.picUrlArr.length = 0
            },
           uploadPic:function(){
                           this.$prompt('请输入图片地址', '提示', {
                               confirmButtonText: '确定',
                               cancelButtonText: '取消',
                               inputPattern: /\S/,
                               inputErrorMessage: '图片地址不能为空',
//                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
//                    inputErrorMessage: '邮箱格式不正确'
                           }).then(({ value }) => {

                    //this.picUrlArr.length < 5 ? this.picUrlArr.push(value) : alert('最多5个')
                    if (value.trim()) {
                        let img = new Image()
                        img.src = value
                        let me = this
                        img.onload = function() {
                            me.multiUrls.push({
                                url: value
                            })

                            me.multiUrls.length === 5 && (me.showUploadPic = !1)
                        }
                        img.onerror = function() {
                            me.$alert('图片无效')
                        }
                    }
               });
           },
            //拒绝
            showBox(pk) {
                this.dialogTableVisible = true;
                this.pk = pk;
            },
            //批量通过
            async passFailAll(eve) {
                let select = this.$refs.proListRef.selection,
                    text = select.length ? '确认审核通过所选商品？' : '请选择商品！'

                setTimeout(i => {
                    !select.length && (document.getElementsByClassName('popoverBtn')[0].children[1].style.display = 'none')
                }, 50)    
                await this.$popconfirm(eve.target, text)

                if (select.length) {
                    select.forEach(i => {
                        this.passFail(i.pk)
                    })
                }
            },
            //通过
            passFail: async function (pk) {
                let item = await this.ctx.models.MarketingModel.product.manualReviewStatus(this.ctx, pk, '1', '');
                if (item.data.statusCode == STATUSCODE.SUCCESS) {
                    await this.$refs.pageTmpl.refreshData();
                } else {
                    this.$message({
                        showClose: true,
                        message: '错了哦，这是一条错误消息',
                        type: 'error'
                    }),
                        this.refresh()
                }
            },
            //确定拒绝
            submit: async function () {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        let item = await this.ctx.models.MarketingModel.product.manualReviewStatus(this.ctx, this.pk, '2', this.ruleForm.reason);
                        this.ruleForm.reason = '';
                        this.dialogTableVisible = false;//隐藏弹窗
                        if (item.data.statusCode == STATUSCODE.SUCCESS) {
                            await this.$refs.pageTmpl.refreshData();//刷新列表
                        } else {
                            this.$message({
                                showClose: true,
                                message: '错了哦，这是一条错误消息',
                                type: 'error'
                            }),
                                this.refresh()
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 删除商品图片
            removePdtImg: function(file, fileList){
                this.multiUrls = file[1]
            },
            
            // 编辑商品信息
            async modifyProduct() {
                var that = this
                this.$refs.formBox.validate(async (valid) => {
                    if (valid) {

                        that.expandProp.status = (that.expandProp.status == 2) ? '0' : null
                        let imgLinkArr = []
                        that.multiUrls.forEach(i=>{
                            imgLinkArr.push(i.url)
                        })
                        let len = imgLinkArr.length
                        for(let i = 0 ; i<len;i++){
                            imgLinkArr[i] = '"'+ imgLinkArr[i] +'"'
                        }

                        if(that.expandProp.size == '自定义'){
                            that.expandProp.size = that.expandProp.customSize
                        }
                        that.expandProp.additionalImageLink = '{"largeImages":[[' + imgLinkArr + ']]}'
                        let data = this.expandProp,
                            res = await this.ctx.models.MarketingModel.product.modifyProduct(this.ctx, data);

                        res.statusCode == STATUSCODE.SUCCESS ? (
                            this.$message({
                                showClose: true,
                                type: 'success',
                                message: '编辑成功!'
                            }),
                                    this.validateMsg = '' && this.refresh()
                        ) : (
                                this.validateMsg = res.data[0].description || res.message
                        )
                    }
                })
            },
            getData: async function (query) {
                let param = {
                        query: query.param,
                        pageNo: query.pageNo || 1,
                        pageSize: query.pageSize || 10
                    },
                    data;
                query.query = query.param
                delete query.param

//                let searchParam = query.searchParam || [],
//                    operatorSwift = {
//                        lt: '1',
//                        gt: '2',
//                        eq: '3'
//                    };
//
//                if (searchParam.length) {
//                    //处理高级搜索
//                    for (let i = 0; i < searchParam.length; i++) {
//                        let queryKey = searchParam[i].key
//                        if (!query.query[queryKey + '1']) {
//                            query.query[queryKey + '1'] = searchParam[i].value
//                            query.query[queryKey + 'Tag'] = operatorSwift[searchParam[i].operator]
//                        }
//                        else {
//                            // 重复的key
//                            query.query[queryKey + '2'] = searchParam[i].value
//                            query.query[queryKey + 'Tag'] = '4'
//                        }
//                    }
//                }
//
//                //重组高级搜索时间格式
//                if (query.query) {
//                    'createDate1 createDate2'.split(' ').forEach(i => {
//                        let val = query.query[i],
//                            dd = new Date(val).getTime() - (new Date().getTimezoneOffset() * 60 * 1000)
//                        val && (query.query[i] = new Date(dd))
//                    })
//                }
//
//                // 调整 介于 的两条string大小
//                let item = ['createDate', 'productPrice']
//
//                for (let j = 0; j < item.length; j++) {
//                    if (query.query[item[j] + '1']) {
//                        if (query.query[item[j] + '1'] > query.query[item[j] + '2']) {
//                            let via = query.query[item[j] + '1']
//                            query.query[item[j] + '1'] = query.query[item[j] + '2']
//                            query.query[item[j] + '2'] = via
//                        }
//                    }
//                    else {
//                        continue
//                    }
//                }
                query.query.userFlag = query.query.PMseller ? '0' : (query.query.operator ? '1' : '')
                query.query.userName = query.query.PMseller || query.query.operator
                delete query.query.PMseller
                delete query.query.operator

//                if (JSON.stringify(query.query) == "{}") {
//                    delete query.query
//                }
//                else {
//                    delete query.searchParam
//                    delete query.orderParam
//                }

                //重组后端需要的数据结构
                if (query.orderParam) {
                    let p = query.orderParam[0],
                        orderParamSwift = {
                            createDate: 'create_time',
                            formattedPrice: 'priceFormatted',
                            advertisingStrategy: 'campaignName'
                        }
                    query.orderInfo = {

                        fields: [orderParamSwift[p.orderBy] ? orderParamSwift[p.orderBy] : p.orderBy],
                        type: [p.ascOrDesc]
                    }
                    delete query.orderParam
                }

                data = await this.ctx.models.MarketingModel.product.getPdtList(this.ctx, query);
                return data
            }
        },
        watch: {
            multiUrls() {
                this.showUploadPic = this.multiUrls.length === 5 ? !1 : !0
            }
        },
        filters: {
            handlePutStatus(status) {
                let swift = {
                    0: 'Merchant审核中',
                    1: 'Merchant审核通过',
                    2: 'Merchant审核失败',
                    3: '投放中',
                    4: '已关闭',
                    5: '待审核',
                    6: '人工审核失败',
                    7: '无',
                    11: '已下架'
                };
                return swift[status]
            }
        },
    components:{
        Edit,
        Detail
    }
    }
</script>