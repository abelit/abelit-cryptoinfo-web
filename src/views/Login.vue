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
import { useRouter } from "vue-router";
import { useStore } from "vuex";
interface FormState {
  username: string;
  password: string;
}
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

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
      alert("登录....");
      store.dispatch("login", formState).then(() => {
        router.push("/");
      });
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
