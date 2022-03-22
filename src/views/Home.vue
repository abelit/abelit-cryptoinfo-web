<template>
  <div>
    <a-input-search
      v-model:value="value"
      placeholder="input search text"
      enter-button
      @search="onSearch"
      style="max-width: 500px; margin: 30px 0px 20px 0px; margin-right: 30px"
    />
    <a-table
      :columns="columns"
      :data-source="accounts"
      :scroll="{ x: 1500, y: 800 }"
    >
      <template #action="{ record }">
        <a-button type="primary" :size="size" @click="getRecord(record.ID)"
          ><EditOutlined
        /></a-button>
      </template>
      <template #copypassword="{ record }">
        <a-button type="primary" :size="size" @click="getRecord(record.ID)"
          ><CopyOutlined
        /></a-button>
      </template>
    </a-table>

    <a-modal
      v-model:visible="isPassDialog"
      title="Encrypt Password Key"
      @ok="getPassword"
    >
      <a-input-password
        v-model:value="passwordKey"
        placeholder="Password Key"
      />
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import { EditOutlined, CopyOutlined } from "@ant-design/icons-vue";
import { copyText } from "vue3-clipboard";
import { message } from "ant-design-vue";

import { getAccountList, getAccountPassword } from "@/api/account";

const columns = [
  { title: "No.", width: 50, dataIndex: "No", key: "No", fixed: "left" },
  { title: "Name", width: 100, dataIndex: "Name", key: "Name", fixed: "left" },
  { title: "UserName", dataIndex: "UserName", key: "UserName", width: 150 },
  { title: "Email", dataIndex: "Email", key: "Email", width: 150 },
  { title: "Phone", dataIndex: "Phone", key: "Phone", width: 150 },
  { title: "URL", dataIndex: "URL", key: "URL", width: 250 },
  {
    title: "Password",
    dataIndex: "Password",
    key: "Password",
    width: 100,
    slots: { customRender: "copypassword" },
  },
  { title: "GroupName", dataIndex: "GroupName", key: "GroupName", width: 150 },
  // { title: "Desc", dataIndex: "Desc", key: "Desc", width: 150 },

  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 80,
    slots: { customRender: "action" },
  },
];

interface DataItem {
  ID: number;
  Name: string;
  UserName: string;
  Email: string;
  Phone: string;
  URL: string;
  Password: string;
  GroupName: string;
  // Desc: string;
}

export default defineComponent({
  data() {
    return {
      columns,
    };
  },
  components: {
    EditOutlined,
    CopyOutlined,
  },
  setup() {
    let size = ref("medium");
    const passwordKey = ref<string>("");
    const recordID = ref<number>();
    let isPassDialog = ref(false);
    let password = ref<string>();
    let accounts: Ref<DataItem[]> = ref([]);
    const value = ref<string>("");

    const onSearch = (searchValue: string) => {
      console.log("use value", searchValue);
      console.log("or use this.value", value.value);
    };
    const getList = async () => {
      await getAccountList().then((res) => {
        res.data.forEach((item: any, index: number) => {
          item.No = index + 1;
        });
        accounts.value = res.data;
      });
    };
    const getPassword = async () => {
      let postData = {
        ID: recordID.value,
        Key: passwordKey.value,
      };
      await getAccountPassword(postData).then((res) => {
        password.value = res.data[0].Password;
        isPassDialog.value = false;
        copyText(password.value, undefined, (error: any, _event: any) => {
          if (error) {
            message.error("Can not copy");
            console.log(error);
          } else {
            message.success("Copied to clipboard");
          }
        });
      });
    };

    const getRecord = async (id: number) => {
      isPassDialog.value = true;
      recordID.value = id;
    };

    onMounted(() => {
      getList();
    });

    return {
      size,
      accounts,
      isPassDialog,
      passwordKey,
      getPassword,
      getList,
      getRecord,
      onSearch,
      value,
    };
  },
});
</script>
