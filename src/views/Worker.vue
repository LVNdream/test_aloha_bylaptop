<template>
  <div class="">
    <div class="header flex justify-between">
      <div class="headerleft flex">
        <div
          class="text-center h-10 w-10 mx-2 mt-2 text-2xl bg-gray-200 px-1 rounded-full hover:cursor-pointer"
        >
          <i class="fa-regular fa-folder"></i>
        </div>
        <div
          class="text-center h-10 w-10 mx-2 mt-2 text-2xl bg-gray-200 p-1 rounded-full hover:cursor-pointer"
        >
          <i class="fa-regular fa-pen-to-square"></i>
        </div>
        <div
          class="text-center h-10 w-10 mx-2 mt-2 text-2xl bg-gray-200 p-1 rounded-full hover:cursor-pointer"
        >
          <i class="fa-regular fa-comment"></i>
        </div>
        <div
          class="text-center h-10 w-10 mx-2 mt-2 text-2xl bg-gray-200 p-1 rounded-full hover:cursor-pointer"
        >
          <i class="fa-solid fa-magnifying-glass color"></i>
        </div>
      </div>
      <div class="headerright flex mr-4">
        <div
          class="text-center h-10 w-10 mx-2 mt-2 text-2xl bg-gray-200 p-1 rounded-full hover:cursor-pointer"
        >
          <i class="fa-regular fa-sun"> </i>
        </div>
        <div
          class="text-center h-10 w-10 mx-2 mt-2 text-2xl bg-gray-200 p-1 rounded-full hover:cursor-pointer"
        >
          <i class="fa-regular fa-envelope"></i>
        </div>
        <div
          class="text-center mx-2 mt-2 w-10 h-10 bg-gray-200 p-1 rounded-full hover:cursor-pointer"
        >
          <img src="https://cdn-icons-png.flaticon.com/256/5373/5373331.png" />
        </div>
        <div
          class="text-center w-10 h-10 mx-2 mt-2 text-2xl bg-gray-200 p-1 rounded-full hover:cursor-pointer"
        >
          <i class="fa-regular fa-bell"></i>
        </div>
        <div
          class="text-center mx-2 mt-2 w-12 h-12 bg-gray-200 p-1 rounded-full hover:cursor-pointer hoverAvata"
        >
          <img class="h-10 w-10 rounded-full" :src="this.avataUser" />

          <div
            @click="this.handleLogout"
            class="optionLogout text-red-500 mt-2 bg-slate-300 w-max px-2 py-1"
          >
            Log out
          </div>
        </div>
      </div>
    </div>

    <div>
      <User :users="this.users"> </User>
    </div>
  </div>
</template>
<script>
import User from "@/components/User.vue";
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      users: "",
      auth: "",
      avataUser: "",
    };
  },
  components: {
    User,
  },

  created() {
    this.getUsers();
    this.checkLogin();
  },

  methods: {
    checkLogin() {
      this.auth = JSON.parse(localStorage.getItem("auth"));
      if (this.auth == null) {
        
        this.$router.replace({ path: "/login" });
      } else if (this.auth != null && this.auth.user.group == 0) {
        this.isLogin = true;
        this.avataUser = this.auth.user.user_infor.avata;
      } else {
        alert(" You are not Admin");
        this.$router.replace({ path: "/login" });
      }
    },
    async getUsers() {
      try {
        const resultGet = await authService.getUser();
        this.users = resultGet.data;
        // console.log(this.users);
      } catch (error) {
        console.log(error);
      }
    },

    async handleLogout() {
      try {
        this.auth = JSON.parse(localStorage.getItem("auth"));

        if (this.auth == null) return alert("Please log in");

        const resultLogOut = await authService.logout(this.auth.access_token);

        if (resultLogOut.status == 200) {
          alert(resultLogOut.data.message);
          localStorage.removeItem("auth");
          this.$router.push({ path: "/login" });
        } else {
          alert("Log out faild");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.optionLogout {
  position: absolute;
  display: none;
  bottom: -60%;
}
.hoverAvata {
  position: relative;
}
.hoverAvata:hover .optionLogout {
  display: block;
}
.users-container {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 35px;
  .container {
    display: flex;
    gap: 30px;
  }
  .table-container {
    background-color: #ffffff;
    border-radius: 30px;
    min-height: 87vh;
    height: auto;
  }
  .table {
    padding: 20px;

    cursor: pointer;
    .add-user {
      display: flex;
      align-items: center !important;
      justify-content: space-between;
      padding: 0 10px;
    }
    .action-user {
      border-top: 0 !important;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      select {
        width: auto;
        option {
          min-height: 50px;
        }
      }
    }
    thead {
      padding: 20px 0;
      border-bottom: 1px solid rgb(241, 243, 244);
      background-color: rgb(244, 246, 248);
    }
    tbody {
      border-bottom: 1px solid rgb(241, 243, 244);
    }
    .actions {
      display: flex;
      gap: 10px;
      .edit {
        cursor: pointer;
        padding: 0 5px;
        font-size: 20px;
      }
      .delete {
        cursor: pointer;
        padding: 0 5px;
        font-size: 20px;
      }
    }
  }
}
</style>
