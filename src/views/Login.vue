<template>
  <a-row type="flex" style="margin-top: 100px">
    <a-col flex="auto">
      <h2>登录 Password Keeper</h2>
    </a-col>
  </a-row>
  <a-row type="flex" style="height: 80%">
    <a-col flex="auto" class="login-pannel">
      <a-form
        layout="horizontal"
        :model="formState"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
        class="login-form"
      >
        <a-form-item>
          <a-input v-model:value="formState.username" placeholder="Username">
            <template #prefix
              ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-model:value="formState.password"
            type="password"
            placeholder="Password"
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="formState.username === '' || formState.password === ''"
            block
            @click="handleSubmit"
          >
            登录
          </a-button>
        </a-form-item>
        <a-form-item>
          没有Password Keeper?
          <router-link to="/register">创建一个账户。</router-link>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { defineComponent, inject, reactive, UnwrapRef } from "vue";
interface FormState {
  username: string;
  password: string;
}
export default defineComponent({
  setup() {
    const axios: any = inject("axios"); // inject axios
    // axios.defaults.baseURL = "http://localhost:8000";
    // axios.defaults.withCredentials = true;

    const formState: UnwrapRef<FormState> = reactive({
      username: "",
      password: "",
    });
    const handleFinish = (values: FormState) => {
      // console.log(values, formState);
      console.log(values);
    };
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors);
    };
    const handleSubmit = async () => {
      // console.log(formState);
      await axios
        .post("http://localhost:8000/account/login", JSON.stringify(formState))
        .then(
          (res: any) => {
            console.log(res);
            console.log(res.headers);
          },
          (err: any) => {
            console.log(err);
          }
        );
    };
    return {
      formState,
      handleFinish,
      handleFinishFailed,
      handleSubmit,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
});
</script>

<style scoped>
.login-pannel {
  margin: 20px auto;
}
.login-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
