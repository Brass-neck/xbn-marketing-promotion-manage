
// 商品列表
async function getPdtList(ctx, param) {
	return await ctx.post(ctx.servers.marketing.options.baseURL + '/product/getManualReviewProductList', param)
    //return await ctx.post('https://easy-mock.com/mock/5a1bbb039144e669fc6e5e86/manage/manageList')
}

// 根据pk查询商品详情
async function getProductInfo(ctx, pk) {
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/product/getProductDetails?pk=' + pk)
    //return await ctx.post('https://easy-mock.com/mock/5a1bbb039144e669fc6e5e86/manage/details')
}

//修改人工审核状态
async function manualReviewStatus(ctx, pk,status,reason){
    return await ctx.put(ctx.servers.marketing.options.baseURL + '/product/manualReviewStatus?pk='+pk+'&status='+status+'&reason='+reason);
}

// 编辑商品信息
async function modifyProduct(ctx, param) {
    return await ctx.put(ctx.servers.marketing.options.baseURL + '/product/modifyProduct', param)
}

export default {
    getPdtList,
    getProductInfo,
    manualReviewStatus,
    modifyProduct
}