<script lang="ts" setup>
import { CirclePlus, Delete, Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { reactive, ref } from "vue"

/** 表格数据类型 */
interface UserInfo {
  id: number
  name: string
  gender: string
  age: number
  phone: string
  email: string
  address: string
  createTime: string
}

/** 表格数据 */
const tableData = ref<UserInfo[]>([
  {
    id: 1,
    name: "李明上",
    gender: "男",
    age: 25,
    phone: "13800138001",
    email: "liming@example.com",
    address: "上海市浦东新区张江集电路123号",
    createTime: "2023-07-15 14:23:45"
  },
  {
    id: 2,
    name: "张伟",
    gender: "男",
    age: 30,
    phone: "13900139001",
    email: "zhangwei@example.com",
    address: "北京市海淀区中关村大街10号",
    createTime: "2022-03-08 09:12:33"
  },
  {
    id: 3,
    name: "王芳嗄",
    gender: "女",
    age: 28,
    phone: "13700137001",
    email: "wangfang@example.com",
    address: "广州市天河区黄埔大道西100号",
    createTime: "2024-01-20 18:45:22"
  },
  {
    id: 4,
    name: "赵强",
    gender: "男",
    age: 35,
    phone: "13600136001",
    email: "zhaoqiang@example.com",
    address: "深圳市南山区科技中一路2号",
    createTime: "2021-09-12 11:30:55"
  },
  {
    id: 5,
    name: "孙丽",
    gender: "女",
    age: 22,
    phone: "13500135001",
    email: "sunli@example.com",
    address: "成都市武侯区桐梓林北路35号",
    createTime: "2025-02-28 16:05:18"
  },
  {
    id: 6,
    name: "周杰轮",
    gender: "男",
    age: 29,
    phone: "13400134001",
    email: "zhoujie@example.com",
    address: "重庆市渝中区解放碑步行街8号",
    createTime: "2023-11-05 13:40:32"
  },
  {
    id: 7,
    name: "吴敏",
    gender: "女",
    age: 26,
    phone: "13300133001",
    email: "wumin@example.com",
    address: "杭州市西湖区文三路456号",
    createTime: "2024-08-17 08:15:09"
  },
  {
    id: 8,
    name: "陈涛",
    gender: "男",
    age: 32,
    phone: "13200132001",
    email: "chentao@example.com",
    address: "南京市鼓楼区中山北路9号",
    createTime: "2022-06-30 17:50:41"
  },
  {
    id: 9,
    name: "刘洋",
    gender: "男",
    age: 27,
    phone: "13100131001",
    email: "liuyang@example.com",
    address: "武汉市武昌区珞喻路1037号",
    createTime: "2021-04-14 10:25:37"
  },
  {
    id: 10,
    name: "徐静",
    gender: "女",
    age: 24,
    phone: "13000130001",
    email: "xujing@example.com",
    address: "西安市雁塔区科技路1号",
    createTime: "2025-05-09 15:35:27"
  },
  {
    id: 11,
    name: "马超",
    gender: "男",
    age: 31,
    phone: "12900129001",
    email: "machao@example.com",
    address: "青岛市市南区香港中路62号",
    createTime: "2023-02-18 12:05:44"
  },
  {
    id: 12,
    name: "黄蓉",
    gender: "女",
    age: 23,
    phone: "12800128001",
    email: "huangrong@example.com",
    address: "厦门市思明区鹭江道101号",
    createTime: "2024-10-03 14:55:12"
  },
  {
    id: 13,
    name: "朱莉",
    gender: "女",
    age: 25,
    phone: "12700127001",
    email: "zhuli@example.com",
    address: "长沙市岳麓区梅溪湖街道洋湖路1号",
    createTime: "2022-12-25 09:45:50"
  },
  {
    id: 14,
    name: "何勇",
    gender: "男",
    age: 33,
    phone: "12600126001",
    email: "heyong@example.com",
    address: "天津市和平区南京路75号",
    createTime: "2021-07-06 16:20:33"
  },
  {
    id: 15,
    name: "郭静",
    gender: "女",
    age: 29,
    phone: "12500125001",
    email: "guojing@example.com",
    address: "沈阳市和平区三好街12号",
    createTime: "2025-03-14 11:10:28"
  },
  {
    id: 16,
    name: "梁山",
    gender: "男",
    age: 27,
    phone: "12400124001",
    email: "liangshan@example.com",
    address: "大连市中山区人民路100号",
    createTime: "2023-09-22 13:30:17"
  },
  {
    id: 17,
    name: "林涛",
    gender: "男",
    age: 30,
    phone: "12300123001",
    email: "lintao@example.com",
    address: "青岛市崂山区海尔路178号",
    createTime: "2024-04-07 10:55:05"
  },
  {
    id: 18,
    name: "程静",
    gender: "女",
    age: 26,
    phone: "12200122001",
    email: "chengjing@example.com",
    address: "郑州市金水区东风路6号",
    createTime: "2022-08-19 15:25:49"
  },
  {
    id: 19,
    name: "高其强",
    gender: "男",
    age: 32,
    phone: "12100121001",
    email: "gaoqiang@example.com",
    address: "济南市历下区经十路11111号",
    createTime: "2025-06-30 17:05:36"
  },
  {
    id: 20,
    name: "董丽其",
    gender: "女",
    age: 28,
    phone: "12000120001",
    email: "dongli@example.com",
    address: "哈尔滨市南岗区红军街14号",
    createTime: "2021-11-11 12:40:22"
  }
])

// #region 表格数据筛选
/** 筛选性别 */
function filterGender(value: string, row: UserInfo) {
  return row.gender === value
}
// #endregion

// #region 表格分页
const pageData = ref<UserInfo[]>([])

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(tableData.value.length)

function updatePageData() {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  pageData.value = tableData.value.slice(start, end)
}

updatePageData()

function handleSizeChange(newSize: number) {
  pageSize.value = newSize
  updatePageData()
}

function handleCurrentChange(newPage: number) {
  currentPage.value = newPage
  updatePageData()
}
// #endregion

// #region 表格多选数据
const multipleSelection = ref<UserInfo[]>([])

function handleSelectionChange(val: UserInfo[]) {
  multipleSelection.value = val
}
// #endregion

// #region 增

// #endregion

// #region 删
// 删除后的分页边界
function handlePageAfterDelete() {
  const maxPage = Math.ceil(total.value / pageSize.value)

  // 如果当前页超过最大页数
  if (currentPage.value > maxPage) {
    currentPage.value = maxPage || 1 // 防止page=0的情况
  }
}
// 根据id删除
async function deleteTableDataById(id: number): Promise<void> {
  try {
    tableData.value = tableData.value.filter(item => id !== item.id)
    total.value = tableData.value.length
    updatePageData()
    handlePageAfterDelete()
  } catch (error) {
    ElMessage.error("删除失败")
    throw error
  }
}
// 操作-删除
function handleDelete(row: UserInfo) {
  ElMessageBox.confirm(`正在删除用户：${row.name}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteTableDataById(row.id).then(() => {
      ElMessage.success("删除成功")
    })
  })
}
// 批量删除
function handleSelectionDelete() {
  const selectedIds = multipleSelection.value.map(item => item.id)

  tableData.value = tableData.value.filter(
    item => !selectedIds.includes(item.id)
  )

  total.value = tableData.value.length

  multipleSelection.value = []

  updatePageData()

  handlePageAfterDelete()

  ElMessage.success(`已删除${selectedIds.length}条数据`)
}
// #endregion

// #region 改
/** 编辑 */
function handleEdit(index: number, row: UserInfo) {
  console.log(index, row)
}
// #endregion

// #region 查
const searchData = reactive({
  username: "",
  usergender: "",
  usercreatedtime: null as Date | null
})

function handleSearch() {
  const { username, usergender, usercreatedtime } = searchData

  const filteredData = tableData.value.filter((item) => {
    const nameMatch = username
      ? item.name.includes(username)
      : true

    const genderMatch = usergender
      ? item.gender === usergender
      : true

    const dateMatch = usercreatedtime
      ? new Date(item.createTime.substring(0, 10)) > usercreatedtime
      : true

    return nameMatch && genderMatch && dateMatch
  })

  // 更新表格数据
  tableData.value = filteredData
  total.value = tableData.value.length
  updatePageData()
  handlePageAfterDelete()
}

function resetSearch() {
  searchData.username = ""
  searchData.usergender = ""
  searchData.usercreatedtime = null

  tableData.value = [...tableData.value]
  total.value = tableData.value.length
  updatePageData()
  handlePageAfterDelete()
}
// #endregion
</script>

<template>
  <div class="app-container">
    <div class="alert-container">
      <el-alert
        title="数据来源"
        type="success"
        description="本表格使用element-plus制作，数据不具备真实性，仅供简单的 CRUD 操作演示"
        show-icon
      />
    </div>
    <div class="table-container">
      <div class="toolbar-wrapper">
        <div class="search-content">
          <el-form :inline="true" :model="searchData" class="custom-form">
            <el-form-item label="用户名" class="custom-form-item">
              <el-input v-model="searchData.username" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="性别" class="custom-form-item">
              <el-select
                v-model="searchData.usergender"
                placeholder="请选择"
                clearable
              >
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间" class="custom-form-item">
              <el-date-picker
                v-model="searchData.usercreatedtime"
                type="date"
                placeholder="请选择时间"
                clearable
              />
            </el-form-item>
            <el-form-item class="custom-form-item">
              <el-button type="primary" :icon="Search" @click="handleSearch">
                查询
              </el-button>
              <el-button :icon="Refresh" @click="resetSearch">
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tool-content">
          <div>
            <el-button type="primary" :icon="CirclePlus" class="item-left">
              新增用户
            </el-button>
            <el-button type="danger" :icon="Delete" class="item-left" @click="handleSelectionDelete()">
              批量删除
            </el-button>
          </div>
          <div>
            <el-button type="primary" :icon="Download" circle class="item-right" />
            <el-button type="primary" :icon="RefreshRight" circle class="item-right" />
          </div>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table
          :data="pageData"
          :default-sort="{ prop: 'id', order: 'ascending' }"
          max-height="800"
          style="width: 97%"
          class="custom-table"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="id" label="编号" width="100" fixed sortable />
          <el-table-column prop="name" label="用户名" width="100" />
          <el-table-column
            prop="gender"
            label="性别"
            width="100"
            :filters="[
              { text: '男', value: '男' },
              { text: '女', value: '女' },
            ]"
            :filter-method="filterGender"
          >
            <template #default="scope">
              <el-tag
                :type="scope.row.gender === '男' ? 'primary' : 'success'"
                disable-transitions
              >
                {{ scope.row.gender }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="100" sortable />
          <el-table-column prop="phone" label="手机号" width="200" />
          <el-table-column prop="email" label="邮箱" width="280" />
          <el-table-column prop="address" label="地址" width="300" />
          <el-table-column prop="createTime" label="创建时间" width="200" />
          <el-table-column label="操作" fixed="right" width="150">
            <template #default="scope">
              <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">
                编辑
              </el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
}

.alert-container {
  min-height: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.table-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color-primary);

  .toolbar-wrapper {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .search-content {
      width: 100%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
      .el-form-item {
        width: 20%;
        margin: 10px 15px; /* 上下间距10px，左右间距15px */
      }
    }
    .tool-content {
      width: 100%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item-left {
        margin-left: 20px;
      }
      .item-right {
        margin-right: 25px;
      }
    }
  }

  .table-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-color-primary);
  }

  .pager-wrapper {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
