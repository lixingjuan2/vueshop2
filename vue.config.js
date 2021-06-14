 module.exports = {
   // 配置 文件夹别名
   configureWebpack: {
     resolve: {
       alias: {
         'assets': '@/assets',
         'common': '@/common',
         'components': '@/components',
         'network': '@/network',
         'views': '@/views',
       }
     }
   }
 }