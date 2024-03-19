<template>
  <div class="mt-4 ml-1 p-2 bg-gray-100 rounded-lg">
    <div
      v-if="
        this.task.project_name != null || this.task.project_name != undefined
      "
      class="flex gap-2 items-center"
    >
      <div class="text-xl font-extrabold text-blue-600">Project:</div>
      <div class="text-lg text-blue-600">{{ this.task.project_name }}</div>
    </div>
    <div class="text-xl flex justify-between">
      <div>{{ this.task.task_name }}</div>
      <div
        class="font-bold text-xl text-red-600 hover:cursor-pointergit hover:cursor-pointer"
        @click="this.handleDeleteTaskInProject()"
        :class="{ hiddenEdit: isHiddenEdit }"
      >
        <i class="fa-solid fa-trash"></i>
      </div>
    </div>
    <div
      class="flex p-1 w-min text-xl my-2 border-2 text-gray-400 bg-50 border-gray-200 rounded-xl hover:bg-sky-600"
    >
      <div class="mr-2"><i class="fa-solid fa-tag"></i></div>
      <div>{{ this.task.task_tag }}</div>
    </div>
    <div class="flex items-center">
      <div class="text-lg font-bold w-3/12">Nhân viên:</div>
      <div class="w-8/12 flex flex-wrap">
        <div
          class="mx-1 mt-1 bg-gray-200 p-1 w-10 rounded-full relative"
          v-for="worker in this.task.worker"
        >
          <img class="w-10 rounded-full" :src="worker.user_infor.avata" />
          <div
            class="absolute -top-3 text-xs right-0 font-bold text-red-600 hover:cursor-pointer"
            :id="worker.user_infor.id"
            @click="
              (e) => {
                console.log(e.target.id);
                this.handleDeleteWorker(parseInt(e.target.id));
              }
            "
            :class="{ hiddenEdit: isHiddenEdit }"
          >
            X
          </div>
          <div
            class="absolute -bottom-2 text-xs -right-3 font-bold text-red-600 hover:cursor-pointer"
            :id="worker.user_infor.id"
            @click="
              (e) => {
                this.toggleModalUpdatePermission();
                console.log(e.target.id);
                this.user_infor_id = e.target.id;
              }
            "
            :class="{ hiddenEdit: isHiddenEdit }"
          >
            Edit
          </div>
        </div>
      </div>
      <div
        class="font-bold text-xl w-1/12 text-orange-400 text-right"
        @click="
          () => {
            this.toggleModalAddUser(this.isHiddenModalAddUser);
          }
        "
        :class="{ hiddenEdit: isHiddenEdit }"
      >
        <i class="fa-solid fa-pencil hover:cursor-pointer"></i>
      </div>
    </div>

    <div class="flex p-2 text-sm mt-1">
      <div class="mr-2 font-bold">
        <i class="fa-solid fa-hourglass-start"></i> Create:
      </div>
      <div>{{ this.task.created_at }}</div>
    </div>

    <div class="flex justify-between">
      <div class="flex p-2 text-sm mt-1">
        <div class="mr-2 font-bold">
          <i class="fa-solid fa-hourglass-end"></i> Dealine:
        </div>
        <div>{{ this.task.task_dealine }}</div>
      </div>
      <div
        class="font-bold text-sm text-orange-400"
        @click="this.toggleModalUpdateDealine"
        :class="{ hiddenEdit: isHiddenEdit }"
      >
        <i class="fa-solid fa-pencil hover:cursor-pointer"></i>
      </div>
    </div>

    <div class="flex justify-between">
      <div class="flex p-2 text-sm mt-1">
        <div class="mr-2 font-bold text-green-700">
          <i class="fa-solid fa-circle"></i> Trạng thái:
        </div>
        <div>{{ this.task.status.status_name }}</div>
      </div>
      <div
        class="font-bold text-sm text-orange-400"
        @click="this.toggleModalUpdateStatus"
      >
        <i class="fa-solid fa-pencil hover:cursor-pointer"></i>
      </div>
    </div>

    <div :class="{ hiddenModelAdduser: isHiddenModalAddUser }">
      <ModalAddUser
        :toggleModalAddUser="this.toggleModalAddUser"
        :handleAddUser="this.handleAddUser"
        :task_id="this.task.id"
      ></ModalAddUser>
    </div>

    <div :class="{ hiddenModelUpdateStatus: isHiddenModalUpdateStatus }">
      <ModalUpdateStatus
        :toggleModalUpdateStatus="this.toggleModalUpdateStatus"
        :handleUpdateStatus="this.handleUpdateStatus"
        :task_id="this.task.id"
        :user_infor_id="this.auth.user.user_infor.id"
      ></ModalUpdateStatus>
    </div>

    <div :class="{ hiddenModelUpdateDealine: isHiddenModalUpdateDealine }">
      <ModalUpdateDealine
        :toggleModalUpdateDealine="this.toggleModalUpdateDealine"
        :handleUpdateDealine="this.handleUpdateDealine"
        :task_id="this.task.id"
        :user_infor_id="this.auth.user.id"
      ></ModalUpdateDealine>
    </div>

    <div
      :class="{ hiddenModelUpdatePermission: isHiddenModalUpdatePermission }"
    >
      <ModalUpdatePermission
        :toggleModalUpdatePermission="this.toggleModalUpdatePermission"
        :handleUpdatePermission="this.handleUpdatePermission"
        :task_id="this.task.id"
        :user_infor_id="this.user_infor_id"
      ></ModalUpdatePermission>
    </div>
  </div>
</template>
<script>
import authService from "../services/auth.service";
import ModalAddUser from "@/components/ModalAddUser.vue";
import ModalUpdateStatus from "@/components/ModalUpdateStatus.vue";
import ModalUpdateDealine from "@/components/ModalUpdateDealine.vue";
import ModalUpdatePermission from "@/components/ModalUpdatePermission.vue";

export default {
  components: {
    ModalAddUser,
    ModalUpdateStatus,
    ModalUpdateDealine,
    ModalUpdatePermission,
  },
  props: {
    task: "",
  },
  data() {
    return {
      user_infor_id: "",
      isHiddenEdit: true,
      auth: "",
      worker: "",
      isHiddenModalAddUser: true,
      isHiddenModalUpdateStatus: true,
      isHiddenModalUpdateDealine: true,
      isHiddenModalUpdatePermission: true,
    };
  },
  created() {
    // console.log(this.task);
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.auth.user.group == 0
      ? (this.isHiddenEdit = false)
      : (this.isHiddenEdit = true);
  },

  methods: {
    async handleAddUser(data) {
      try {
        if (this.auth == null) {
          // alert("Please, log in");
          this.$router.push({ path: "/login" });
        }
        if (this.auth.user.group == 0) {
          console.log(data, this.auth.access_token);
          const resultAdd = await authService.addUserInTask(
            this.auth.access_token,
            data
          );

          if (resultAdd.status == 200) {
            alert(resultAdd.data);
          } else {
            alert("Have error");
            console.log(resultAdd);
          }

          this.$router.go(0);
        } else {
          alert("You are not Admin");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async handleDeleteWorker(worker_id) {
      try {
        if (this.auth == null) {
          // alert("Please, log in");
          this.$router.push({ path: "/login" });
        }
        if (this.auth.user.group == 0) {
          const data = {
            task_id: this.task.id,
            user_infor_id: worker_id,
            auth_id: this.auth.user.id,
          };

          if (confirm("Delete this worker") == true) {
            console.log(data, this.auth.access_token);
            const resultDelete = await authService.deleteWorkerInTask(
              this.auth.access_token,
              data
            );

            if (resultDelete.status == 200) {
              alert(resultDelete.data);
            } else {
              alert("Have error");
              console.log(resultDelete);
            }

            this.$router.go(0);
          } else {
            console.log("No delete");
          }
        } else {
          alert("You are not Admin");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async handleDeleteTaskInProject() {
      try {
        if (this.auth == null) {
          // alert("Please, log in");
          this.$router.push({ path: "/login" });
        }
        if (this.auth.user.group == 0) {
          const data = {
            task_id: this.task.id,
            auth_id: this.auth.user.id,
          };

          if (confirm("Delete this task") == true) {
            console.log(data, this.auth.access_token);
            const resultDelete = await authService.deleteTaskInProject(
              this.auth.access_token,
              data
            );

            if (resultDelete.status == 200) {
              alert(resultDelete.data);
            } else {
              alert("Have error");
              console.log(resultDelete);
            }

            this.$router.go(0);
          } else {
            console.log("No delete");
          }
        } else {
          alert("You are not Admin");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async handleUpdateStatus(data) {
      try {
        if (this.auth == null) {
          
          this.$router.push({ path: "/login" });
        }
        if (this.auth.user.group == 0 || this.auth.user.group == 1) {
          console.log(data, this.auth.access_token);
          const resultAdd = await authService.updateStatus(
            this.auth.access_token,
            data
          );

          if (resultAdd.status == 200) {
            alert(resultAdd.data);
          } else {
            alert("Have error");
            console.log(resultAdd);
          }

          this.$router.go(0);
        } else {
          alert("You are not Admin");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async handleUpdateDealine(data) {
      try {
        if (this.auth == null) {
          // alert("Please, log in");
          this.$router.push({ path: "/login" });
        }
        if (this.auth.user.group == 0) {
          console.log(data, this.auth.access_token);
          const resultUpdateDealine = await authService.updateDealine(
            this.auth.access_token,
            data
          );

          if (resultUpdateDealine.status == 200) {
            alert(resultUpdateDealine.data);
          } else {
            alert("Have error");
            console.log(resultAdd);
          }

          this.$router.go(0);
        } else {
          alert("You are not Admin");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async handleUpdatePermission(data) {
      try {
        if (this.auth == null) {
          this.$router.push({ path: "/login" });
        }
        if (this.auth.user.group == 0) {
          console.log(data, this.auth.access_token);
          const resultUpdatePermission = await authService.updatePermission(
            this.auth.access_token,
            data
          );

          if (resultUpdatePermission.status == 200) {
            alert(resultUpdatePermission.data);
          } else {
            alert("Have error");
            console.log(resultUpdatePermission);
          }

          this.$router.go(0);
        } else {
          alert("You are not Admin");
        }
      } catch (error) {
        console.log(error);
      }
    },

    toggleModalAddUser() {
      this.isHiddenModalAddUser = !this.isHiddenModalAddUser;
    },
    toggleModalUpdateDealine() {
      this.isHiddenModalUpdateDealine = !this.isHiddenModalUpdateDealine;
    },
    toggleModalUpdateStatus() {
      this.isHiddenModalUpdateStatus = !this.isHiddenModalUpdateStatus;
    },
    toggleModalUpdatePermission() {
      this.isHiddenModalUpdatePermission = !this.isHiddenModalUpdatePermission;
    },
  },
};
</script>
<style scoped>
.hiddenEdit {
  display: none;
}
.hiddenModelAdduser {
  display: none;
}
.hiddenModelUpdateStatus {
  display: none;
}
.hiddenModelUpdateDealine {
  display: none;
}
.hiddenModelUpdatePermission {
  display: none;
}
</style>
