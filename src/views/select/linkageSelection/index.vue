<template>
  <div class="app-container">
    <el-form size="small" label-width="50px">
      <el-row>
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="姓名:">
            <form-item-search
              :id="id"
              :search-key="'name'"
              :options="options"
              :total="total"
              :loading="loading"
              style="width: 50%"
              @change="change"
              @remoteMethod="remoteMethod"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="地址:">
            <form-item-search
              :id="id"
              :search-key="'address'"
              :options="options"
              :total="total"
              :loading="loading"
              style="width: 50%"
              @change="change"
              @remoteMethod="remoteMethod"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="selectRows" style="margin-top: 100px">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="date" label="日期" />
    </el-table>
  </div>
</template>

<script>
import { getSelectTableList } from '@/api/table'
import FormItemSearch from './components/FormItemSearch'

export default {
  name: 'LinkageSelection',
  components: {
    FormItemSearch
  },
  data() {
    return {
      options: [],
      loading: false,
      total: 0,
      id: '',
      selectRows: []
    }
  },
  methods: {
    // 请求数据
    remoteMethod(params, isConcatList) {
      this.loading = true
      setTimeout(() => {
        getSelectTableList(params)
          .then((res) => {
            if (Number(res.code) == 200) {
              const rows = res.data || []
              this.options = isConcatList ? this.options.concat(rows) : rows

              this.loading = false
              this.total = res.total
            }
          })
          .catch((err) => {
            console.log(err)
            this.loading = false
          })
      }, 1500)
    },

    // 选中的数据
    change(id) {
      this.id = id
      this.selectRows = this.options.filter((item) => item.id == id)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
