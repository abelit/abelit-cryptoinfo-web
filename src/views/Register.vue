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
          <a-input v-model:value="formState.email" placeholder="Email">
            <template #prefix
              ><MailOutlined style="color: rgba(0, 0, 0, 0.25)"
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
          <a-input
            v-model:value="formState.repassword"
            type="password"
            placeholder="Repassword"
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
            注册
          </a-button>
        </a-form-item>
        <a-form-item>
          已有Password Keeper?
          <router-link to="/login">登录。</router-link>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { defineComponent, reactive, UnwrapRef } from "vue";
interface FormState {
  username: string;
  password: string;
}
export default defineComponent({
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      username: "",
      email: "",
      password: "",
      repassword: "",
    });
    const handleFinish = (values: FormState) => {
      // console.log(values, formState);
      console.log(values);
    };
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors);
    };
    const handleSubmit = () => {
      console.log(formState);
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
    MailOutlined,
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
