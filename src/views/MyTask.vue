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
          <image src="https://cdn-icons-png.flaticon.com/256/5373/5373331.png">
          </image>
        </div>
        <div
          class="text-center w-10 h-10 mx-2 mt-2 text-2xl bg-gray-200 p-1 rounded-full hover:cursor-pointer"
        >
          <i class="fa-regular fa-bell"></i>
        </div>
        <div
          class="text-center mx-2 mt-2 w-12 h-12 bg-gray-200 p-1 rounded-full hover:cursor-pointer hoverAvata"
          :class="{ avataUser: !this.isLogin }"
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

    <div class="main bg-gray-50 mt-4 w">
      <div class="mb-4">
        <div
          @click="this.handleHiddenModal"
          class="ml-2 text-xl py-2 rounded-xl text-white bg-blue-700 w-40 hover:cursor-pointer"
        >
          <i class="fa-solid fa-plus ml-2 mr-4"></i> Add status
        </div>
      </div>
      <div class="p-2 flex flex-wrap">
        <Status
          :status="status"
          v-for="status in this.listStatusSorted"
        ></Status>
      </div>
    </div>
  </div>
</template>
<script>
import Status from "@/components/Status.vue";
import authService from "@/services/auth.service";

export default {
  components: {
    Status,
  },

  data() {
    return {
      listStatus: [],
      user_infor_id: this.$route.params.id,
      isLogin: false,
      avataUser: "",
      auth: "",
      tasks: "",
      listStatusSorted: "",
    };
  },
  created() {
    this.checkLogin();
    this.getStatus();
    // this.getTasks();
  },
  mounted() {
    // this.sortListTask();
  },
  methods: {
    checkLogin() {
      this.auth = JSON.parse(localStorage.getItem("auth"));
      if (
        this.auth != null &&
        this.auth.user.user_infor.id == this.$route.params.id
      ) {
        
        this.isLogin = true;
        this.avataUser = this.auth.user.user_infor.avata;
      } else {
        this.$router.replace({ path: "/login" });
      }
    },

    async getStatus() {
      try {
        const resultGet = await authService.getStatus();
        this.listStatus = resultGet.data;
        this.getTasks();
       
      } catch (error) {
        console.log(error);
      }
    },

    async getTasks() {
      try {
        const resultGet = await authService.getTaskById(this.user_infor_id);
        this.tasks = resultGet.data;
    
        this.sortListTask();
      } catch (error) {
        console.log(error);
      }
    },

    sortListTask() {
    
      this.listStatusSorted = this.listStatus.map((status) => {
        let data = { ...status, task: [] };
        // console.log(status);
        this.tasks.forEach((extask) => {
          //   console.log(extask.task.status_id);

          if (status.id == extask.task.status_id) {
          
            extask.task = {
              status: { status_name: status.status_name },
              id: extask.task.id,
              project_name: extask.task.project.project_name,
              task_name: extask.task.task_name,
              task_tag: extask.task.task_tag,
              created_at: extask.task.created_at,
              task_dealine: extask.task.task_dealine,
              worker: extask.task.worker,
            };
            data.task.push(extask.task);
          }
        });
        return data;
      });
      
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
.avataUser {
  display: none;
}

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
</style>
