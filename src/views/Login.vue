<template>
  <div>
    <section
      class="max-w-[1060px] min-h-[713px] mx-auto border rounded-2xl mt-16"
    >
      <div class="p-5 md:p-10 flex flex-1 justify-center gap-10">
        <div class="hidden lg:flex flex-1 flex-shrink-0">
          <img
            src="https://raw.githubusercontent.com/Quynhhuong150322/DIKO_STUDY_TRAVEL_WEB/main/src/assets/images/Login/loginImg.png"
            alt="Login"
            class="object-contain"
          />
        </div>
        <div class="flex-1 py-10 flex justify-center">
          <div class="flex flex-col flex-1 gap-4">
            <h1 class="text-xl font-bold">Login</h1>
            <p class="text-xs font-normal">
              Login to access EasySet 24 account
            </p>
            <form
              @submit.prevent="submitLogin"
              class="flex flex-col flex-1 gap-5"
            >
              <div class="flex flex-col flex-1 gap-1">
                <label
                  htmlFor="email"
                  class="text-sm font-normal cursor-pointer"
                >
                  Email
                </label>
                <div class="flex items-center">
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    placeholder="EasySet24@gmail.com"
                    class="w-full h-[48px] p-3 border rounded text-xs font-normal"
                    required
                  />
                </div>
              </div>
              <div class="flex flex-col flex-1 gap-1">
                <label
                  htmlFor="password"
                  class="text-sm font-normal cursor-pointer"
                >
                  Password
                </label>
                <div class="flex items-center">
                  <input
                    v-model="password"
                    type="password"
                    id="password"
                    placeholder="***************"
                    class="w-full h-[48px] p-3 border rounded text-xs font-normal"
                    required
                  />
                </div>
              </div>
              <div
                class="flex justify-between md:flex-row flex-col gap-2 md:gap-0"
              >
                <div class="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    class="w-6 h-6 cursor-pointer"
                  />
                  <label
                    htmlFor="remember"
                    class="text-sm font-normal text-[#112211] cursor-pointer"
                  >
                    Remember Me
                  </label>
                </div>
                <div>
                  <span
                    class="text-sm font-normal text-[#07689F] cursor-pointer hover:text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </span>
                </div>
              </div>

              <button
                class="text-base font-medium text-white cursor-pointer flex-1 max-h-[48px] bg-[#07689F] text-center rounded border px-2 py-3 hover:bg-gray-500 cursor-pointer"
              >
                login
              </button>

              <div class="text-center text-sm font-normal">Or</div>
              <div class="flex justify-center gap-10">
                <div
                  class="p-3 border rounded bg-[#FFFFFF] cursor-pointer hover:scale-110 hover:bg-blue-300 w-16"
                >
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-facebook-2038470-1718513.png"
                    alt="Facebook"
                    class=""
                  />
                </div>
                <div
                  class="p-3 border rounded bg-[#FFFFFF] cursor-pointer hover:bg-blue-300 w-16"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                    alt="Apple"
                  />
                </div>
                <div
                  class="p-3 border rounded bg-[#FFFFFF] cursor-pointer hover:bg-blue-300 w-16"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/2991/2991148.png"
                    alt="Google"
                  />
                </div>
              </div>
              <div
                class="flex justify-center items-center gap-2 flex-col md:flex-row"
              >
                <p class="text-xs font-normal">
                  Don't have an account in EasySet24 yet?
                </p>
                <p>
                  <span
                    class="text-xs font-normal text-blue-400 cursor-pointer hover:underline hover:text-blue-500"
                  >
                    <router-link to="/register"> Register</router-link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import authService from "@/services/auth.service";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async submitLogin() {
      try {
        const data = {
          email: this.email,
          password: this.password,
        };
       
        const resutlLogin = await authService.login(data);

        if (resutlLogin.status == 200) {
          alert(resutlLogin.data.mess);
          const auth = {
            access_token: resutlLogin.data.access_token,
            user: resutlLogin.data.user,
          };
          localStorage.setItem("auth", JSON.stringify(auth));

          const profile = resutlLogin.data;
          if ( profile.user.group == 0) {
            this.$router.push({ path: "/admin" });
           
          } else if ( profile.user.group == 1) {
            this.$router.push({
              path: `/mytask/${profile.user.user_infor.id}`,
            });
          }
        } else {
          alert(resutlLogin.data.mess);
        }

        this.email = "";
        this.password = "";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style></style>
