const MAP = {
    googleCategory:{
        'key': 'googleCategoryRoot',
        'label': 'google分类',
        'size': 'large',
        'options': [

        ]
    },
    adStatus: {
        'key': 'status',
        'label': '广告状态',
        'size': 'large',
        'options': [
            {'id': 8, 'value': null, 'label': '全部'},
            {'id': 3, 'value': 0, 'label': '已开启'},
            {'id': 4, 'value': 1, 'label': '已关闭'},
        ]
    },
    adDetailStatus: {
        'key': 'status',
        'label': '商品状态',
        'size': 'large',
        'options': [
            {'id': 8, 'value': null, 'label': '全部'},
            {'id': 3, 'value': 0, 'label': '正在审核'},
            {'id': 5, 'value': 2, 'label': '审核失败'},
            {'id': 6, 'value': 3, 'label': '投放中'},
            {'id': 7, 'value': 4, 'label': '已关闭'},
            {'id': 8, 'value': 9, 'label': '已删除'}
        ]
    },
    putStatus: {
        'key': 'putStatus',
        'label': '商品状态',
        'size': 'large',
        'options': [
            {'id': 8, 'value': null, 'label': '全部'},
            {'id': 0, 'value': 0, 'label': 'Merchant审核中'},
            {'id': 1, 'value': 1, 'label': 'Merchant审核通过'},
            {'id': 2, 'value': 2, 'label': 'Merchant审核失败'},
            {'id': 3, 'value': 3, 'label': '投放中'},
            {'id': 4, 'value': 4, 'label': '已关闭'},
            {'id': 5, 'value': 5, 'label': '待审核'},
            {'id': 6, 'value': 6, 'label': '人工审核失败'},
            {'id': 7, 'value': 7, 'label': '未获取到数据'},
            {'id': 9, 'value': 11, 'label': '已下架'}
        ]
    },
    createDateNum: {
        'key': 'createDateNum',
        'label': '创建时间',
        'size': 'large',
        'options': [
            {'id': 8, 'value': null, 'label': '全部'},
            {'id': 1, 'value': 3, 'label': '近3天'},
            {'id': 2, 'value': 7, 'label': '近7天'},
            {'id': 3, 'value': 15, 'label': '近15天'},
            {'id': 4, 'value': 30, 'label': '近1月'}
        ]
    },
    shopCategory: {
        'key': 'shopId',
        'label': '店铺名称',
        'size': 'large',
        'options': [

        ]
    }
}

export default MAP