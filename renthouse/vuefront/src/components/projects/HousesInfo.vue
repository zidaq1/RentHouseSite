<template>
<!--房源信息模块-->
  <!--Project包主要存放各种项目需要的安装模块-->
  <div>


  <el-main>
    <el-row >
      <el-col :span="8" v-for="(house_info, index) in house_infos" :key="o">
        <el-card shadow="always">
          <img v-bind:src='house_info.house_images' class="image" style="height:300px;width: 400px">
          <div style="padding: 10px;">
            <span>房名：<el-link type="primary"  @click="opendetail(index)">{{ house_info.house_title }} </el-link></span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" v-bind:id="index" @click="opendetail(index)" >点击查看详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
    <el-divider></el-divider>
    <!--添加页脚-->
    <el-footer>
    <el-tag>如有疑问请联系QQ:942840260</el-tag>
    </el-footer>
  </div>
</template>

<script>
    export default {
        name: "HousesInfo",
        data(){
            return{
                house_infos :[
                    {
                        house_images:'',
                        house_title:'',
                    }
                ],
            }
        },
      methods:{
            //打开详情页功能
            opendetail(index){
                console.log("当前按钮的id为：");
                console.log(this.house_infos[index]['house_images']);
                console.log(index);
                window.location.href='/housedetail/'+this.house_infos[index]['house_title']; //跳转到指定url
            },
      },
        created(){

        },
        mounted(){
            var that = this;
           let cur_headers = {'Authorization':"JWT " + localStorage.getItem('token')};//添加请求头认证内容,ji
            //请求api/briefhouseinfo接口get请求 获取数据 展示
          this.$axios(
              {
                  url:"api/briefhouseinfo/", //请求的url 由于跨域
                  method:'get',
                  headers:cur_headers,
              }
          ).then(
              function (return_data) {
                  let house_count = return_data.data.count; //获取总共需要展示多少数据
                  console.log(house_count);
                  if (house_count < 1) //说明数据库没有信息可以展示，则退出
                  {
                      console.log("数据库没有资源可以展示");
                      return false;
                  }
                  let house_array = return_data.data.results;
                  let i = 0;
                  for ( ; i < house_count ; i++)
                  {
                      let house_images = house_array[i]['house_images'];
                      let house_title = house_array[i]['house_title'];
                      //i = 0时
                      if (i == 0)
                      {
                          that.house_infos[i]['house_images'] =house_images ;
                          that.house_infos[i]['house_title'] = house_title;
                      }
                      else{
                          //添加数组的方式 实现不定长
                          let add_house = {'house_images':house_images,'house_title':house_title};
                          that.house_infos.push(add_house);
                      }
                  }

              }
          ).catch(
          )
      },
      watch:{
      },

    }
</script>

<style scoped>
  .bottom {
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
