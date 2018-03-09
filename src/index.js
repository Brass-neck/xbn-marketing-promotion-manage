import {ProductManage, AdManageList, AdManageDetail} from './pages/index'
import * as MarketingModel from './models/index'
import '!style-loader!css-loader!less-loader!./style/index.less'
import './config/component'
import './config/statusCode'

const routes = [
    {
        path: '/product-manage',
        component: ProductManage
    },
    {
        path: '/ad-manage-list',
        component: AdManageList
    },
    {
        path: '/ad-manage-list/*',
        component: AdManageDetail
    }
];

export default {
    routes,
    models: [MarketingModel],
}