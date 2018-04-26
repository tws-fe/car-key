const Mock = require('mockjs')

let data = Mock.mock({
  "data": {
    "data|8-24": [{
      "createDate": 1523891921000,//格式 yyyy-MM-dd HH:mi:ss
      "creator": 0,//创建人Id
      "id": '@id',//车Id
      "imageUrl": "@img(320x280,@color)",//车图片，拼上图片的访问地址即可访问到图片
      "isStatus": 1,//1:正常 2：报废 3 维修
      "isStatus2|1-2": 1,//车领用状态 1：已领用 2 未领用
      "modelId": 0,
      "modifyUserId": 0,//修改人Id
      "no": "RGZ567",//车牌号码
      "orgCode": "456",//单位编码
      "orgId": 456,//单位ID
      "purchaseDateTime": 1523891805000,//购买日期
      "remark": "xxx",
      "seat": 4,//座位
      "typeId": 0,
      "version": 1,
      "typeName": "轿车",
      "modelName": "大众",
      "borrowDate" : 1523891805000,
      "borrowUser": "@cname",
      "borrowReason": "领用理由",
      "RebackDate": 1523891805000
    }]
  },
  "Xldata": {
    "data|10": [
        {
            "id|+1": 1,
            "remark": "@ctitle"
        }
    ]
  },
  "errorCode": 0,
  "msg": "",
  "success": true
})


export default data