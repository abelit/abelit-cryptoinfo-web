<template>
  <a-table
    :columns="columns"
    :data-source="accounts"
    :scroll="{ x: 1500, y: 800 }"
  >
    <template #action="{ record }">
      <a-button type="primary" :size="size" @click="getRecord(record.ID)"
        ><BorderOutlined
      /></a-button>
    </template>
  </a-table>

  <a-modal
    v-model:visible="isPassDialog"
    title="Encrypt Password Key"
    @ok="getPassword"
  >
    <a-input-password v-model:value="passwordKey" placeholder="Password Key" />
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import { inject } from "vue";
import { BorderOutlined } from "@ant-design/icons-vue";
import { copyText } from "vue3-clipboard";
import { message } from "ant-design-vue";

const columns = [
  { title: "ID", width: 50, dataIndex: "ID", key: "ID", fixed: "left" },
  { title: "Name", width: 100, dataIndex: "Name", key: "Name", fixed: "left" },
  { title: "UserName", dataIndex: "UserName", key: "UserName", width: 150 },
  { title: "Email", dataIndex: "Email", key: "Email", width: 150 },
  { title: "Phone", dataIndex: "Phone", key: "Phone", width: 150 },
  { title: "URL", dataIndex: "URL", key: "URL", width: 250 },
  { title: "Password", dataIndex: "Password", key: "Password", width: 100 },
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

const accountAPI = "http://localhost:8000/account/data";
const passwordAPI = "http://localhost:8000/account/password";

export default defineComponent({
  data() {
    return {
      columns,
    };
  },
  components: {
    BorderOutlined,
  },
  setup() {
    let size = ref("medium");
    const passwordKey = ref<string>("");
    const recordID = ref<number>();
    let isPassDialog = ref(false);
    let password = ref<string>();
    // const accounts = reactive<DataItem[]>([]);
    let accounts: Ref<DataItem[]> = ref([]);
    const axios: any = inject("axios"); // inject axios

    const getList = async () => {
      await axios.get(accountAPI).then((response: { data: any }) => {
        // console.log(response.data);
        accounts.value = response.data.data;
        // console.log(accounts.value);
      });
    };
    const getPassword = async () => {
      // isPassDialog.value = false;
      let postData = {
        ID: recordID.value,
        Key: passwordKey.value,
      };
      await axios
        .post(passwordAPI, JSON.stringify(postData))
        .then((response: any) => {
          password.value = response.data.data[0].Password;
          isPassDialog.value = false;
          copyText(password.value, undefined, (error: any, _event: any) => {
            if (error) {
              message.error("Can not copy");
              console.log(error);
            } else {
              message.success("Copied to clipboard");
              // console.log(event)
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
      // getRecord();
    });

    return {
      size,
      accounts,
      isPassDialog,
      passwordKey,
      getPassword,
      getList,
      getRecord,
    };
  },
});
</script>
