<template>
  <div>
    <div>
      <div class="users-container">
        <div class="table-container">
          <div class="table text-left">
            <table class="table table-borderless table-hover">
              <thead class="text-lg">
                <tr>
                  <th class="w-1/12" scope="col">ID</th>
                  <th class="w-3/12 text-lg" scope="col">
                    <div class="text-blue-600">
                      <i class="fa-regular fa-envelope"></i> Email
                    </div>
                  </th>
                  <th class="w-2/12" scope="col">
                    <div class="text-blue-600">
                      <i class="fa-regular fa-user"></i> Name
                    </div>
                  </th>

                  <th class="w-2/12" scope="col">
                    <div class="text-blue-600">
                      <i class="fa-solid fa-location-dot"></i> Majoring
                    </div>
                  </th>

                  <th class="w-2/12" scope="col">
                    <div class="text-blue-600">
                      <i class="fa-solid fa-mobile-screen-button"></i> Phone
                    </div>
                  </th>
                  <th class="w-1/12" scope="col">
                    <div class="text-blue-600">
                      <i class="fa-solid fa-venus-mars"></i> Gender
                    </div>
                  </th>

                  <th class="w-1/12" scope="col">
                    <div class="text-blue-600">
                      <i class="fa-solid fa-hand-point-down"></i> Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody v-for="user in this.users">
                <tr>
                  <th scope="row">{{ user.id }}</th>
                  <td>{{ user.user.email }}</td>
                  <td>{{ user.fullname }}</td>
                  <td>{{ user.majoring.majoring_name }}</td>

                  <td>{{ user.phone }}</td>
                  <td>nam</td>
                  <td class="actions">
                    <div
                      @click="
                        () => {
                          this.toggleWatchTask(user.id);
                        }
                      "
                      title="show"
                      class="btn btn-warning"
                    >
                      <i class="fa-regular fa-eye"></i>
                    </div>
                  </td>
                </tr>
                <tr class="w-full"></tr>
              </tbody>
              <tbody></tbody>
            </table>

            <div :class="{ hiddenWatchTask: this.isHiddenWatchTask }">
              <!-- <WatchTask :toggleWatchTask="this.toggleWatchTask"
              :listtask="this.tasks"></WatchTask> -->

              <div>
                <div class="m-auto text-center">
                  {{ this.get_user_infor.fullname + " (" + this.email + ")" }}

                  have tasks
                </div>
                <div>
                  <div class="flex my-2 gap-2 text-yellow-700">
                    <div>Filter By:</div>
                    <select
                      v-model="this.status_id"
                      class="text-white font-bold bg-blue-600"
                      @change="
                        () => {
                          this.filterTaskByStatus(this.status_id);
                        }
                      "
                    >
                      <option value="">Choose status</option>
                      <option
                        :value="itemStatus.id"
                        v-for="itemStatus in this.listStatus"
                      >
                        {{ itemStatus.status_name }}
                      </option>
                    </select>
                  </div>

                  <div class="table border-2 relative">
                    <div
                      class="bg-red-600 text-white w-5 h-5 text-center flex items-center justify-center absolute right-1 top-1"
                      @click="
                        () => {
                          this.isHiddenWatchTask = true;
                        }
                      "
                    >
                      X
                    </div>
                    <table class="table table-borderless table-hover">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Project</th>
                          <th scope="col">Task</th>
                          <th scope="col">Tag</th>

                          <th scope="col">Deadline</th>

                          <th scope="col">
                            <div class="text-green-600">
                              <i class="fa-solid fa-circle"></i> Status
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody v-for="itemTask in this.listTasksFilter">
                        <tr>
                          <th scope="row">{{ itemTask.task.id }}</th>
                          <td class="">
                            {{ itemTask.task.project.project_name }}
                          </td>
                          <td>{{ itemTask.task.task_name }}</td>
                          <td>{{ itemTask.task.task_tag }}</td>

                          <td>{{ itemTask.task.dealine }}</td>
                          <td>{{ itemTask.task.status.status_name }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WatchTask from "@/components/WatchTask.vue";
import authService from "@/services/auth.service";
export default {
  data() {
    return {
      isHiddenWatchTask: true,
      listTasks: "",
      listTasksFilter: "",
      get_user_infor: "",
      email: "",
      listStatus: "",
      status_id: "",
    };
  },
  props: {
    users: "",
  },
  components: {
    WatchTask,
  },

  created() {
    this.getStatus();
  },

  methods: {
    toggleWatchTask(id) {
      this.isHiddenWatchTask = false;

      if (id) {
        const user = this.users.filter((itemUser) => {
          return itemUser.id == id;
        });
        this.listTasks = user[0].worker;
        this.listTasksFilter = this.listTasks;
        this.get_user_infor = user[0];
        this.email = this.get_user_infor.user.email;
      }
    },

    async getStatus() {
      try {
        const resultGet = await authService.getStatus();
        this.listStatus = resultGet.data;
      
      } catch (error) {
        console.log(error);
      }
    },

    filterTaskByStatus(id) {
      if (id == "") {
        this.listTasksFilter = this.listTasks;
      } else {
        this.listTasksFilter = this.listTasks.filter((itemTask) => {
          return itemTask.task.status.id == id;
        });
      }
      console.log(this.listTasksFilter);
    },
  },
};
</script>
<style scoped>
.hiddenWatchTask {
  display: none;
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
    /* min-height: 87vh; */
    height: auto;
  }
  .table {
    /* padding: 20px; */
    margin: 0 !important;
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
