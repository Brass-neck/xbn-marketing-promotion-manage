
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
    let url = reason?'/product/manualReviewStatus?pk='+pk+'&status='+status+'&reason='+reason:'/product/manualReviewStatus?pk='+pk+'&status='+status;

    let config = {
        url: ctx.servers.marketing.options.baseURL + url,
        method: 'put'
    }
    return (await ctx.request(config))
    //return await ctx.put(ctx.servers.marketing.options.baseURL + '/product/manualReviewStatus?pk='+pk+'&status='+status+'&reason='+reason);
}

//审核失败原因
async function getProductFailReason(ctx,productId,putStatus){
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/product/getProductFailReason?productId=' + productId+'&putStatus='+putStatus)
}


// 编辑商品信息
async function modifyProduct(ctx, param) {
    //return await ctx.put(ctx.servers.marketing.options.baseURL + '/product/modifyProduct', param)
    let config = {
        url: ctx.servers.marketing.options.baseURL + '/product/modifyProduct',
        method: 'put',
        data: param
    }
    return (await ctx.request(config)).data
}

//获取Google Category
async function googleCategory(ctx, id){
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/googleCategory/googleCategory/' + id)
}

// 上传文件
async function uploadFile(ctx, fileType, name ,size){
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/file/upload?fileType=' + fileType + '&name=' + name + '&size=' + size)
}

// 获取店铺列表
async function findShopByPage(ctx, param){
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/shop/findShopByPage2', param)
}

export default {
    getPdtList,
    getProductInfo,
    manualReviewStatus,
    modifyProduct,
    getProductFailReason,
    googleCategory,
    uploadFile,
    findShopByPage
}