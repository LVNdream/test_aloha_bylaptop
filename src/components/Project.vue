<template>
  <div class="px-2 bg-white w-4/12 rounded-xl border-r-8 border-t-8">
    <div class="flex justify-between mb-2">
      <div class="text-2xl bg-gray-100 p-2">
        <i class="fa-solid fa-computer"></i>
      </div>
      <div class="flex">
        <div class="text-2xl bg-gray-100 p-2 hover:cursor-pointer">
          <i class="fa-solid fa-plus"></i>
        </div>
        <div class="text-2xl bg-gray-100 p-2 hover:cursor-pointer">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>
    </div>
    <div>
      <div class="ml-1 text-2xl text-orange-700">
        {{ this.project.project_name }}
      </div>

      <div class="flex mt-1">
        <div class="text-lg ml-1 break-all">
          {{ this.project.project_des }}
        </div>
      </div>

      <div class="mt-4">
        <Task :task="task" v-for="task in this.project.task"></Task>
      </div>

      <div class="my-4 w-fit mx-auto" @click="handleHiddenModal">
        <div
          class="text-xl px-4 py-2 rounded-xl text-white bg-blue-600 hover:cursor-pointer"
        >
          <i class="fa-solid fa-plus mr-2"></i>Add Task
        </div>
      </div>
    </div>

    <div class="modal123" v-bind:class="{ hiddenModel: this.isHidden }">
      <div class="content p-3">
        <button class="btn btn-danger button-close" @click="handleHiddenModal">
          X
        </button>

        <form @submit.prevent="handleSubmitTask">
          <div class="inforOrder">
            <div class="mb-3">
              <div class="mb-3">
                <label htmlFor="exampleFormControlInput2" class="form-label">
                  Task name
                </label>
                <input
                  v-model="task_name"
                  required
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput2"
                />
              </div>

              <div class="mb-3">
                <label htmlFor="exampleFormControlInput24" class="form-label">
                  Task tag
                </label>
                <input
                  v-model="task_tag"
                  required
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput24"
                />
              </div>

              <div class="mb-3">
                <select
                  class="form-select form-select-sm"
                  aria-label="Small select example"
                  v-model="this.majoring_id"
                  @change="
                    () => {
                      console.log(this.majoring_id);
                      if (this.majoring_id != '') {
                        this.getUserByMajoring();
                      }
                    }
                  "
                  required
                >
                  <option value="" selected>Choose majoring</option>

                  <option value="1" selected>Back_End</option>
                  <option value="2" selected>Front_End</option>
                  <option value="3" selected>Designer</option>
                  <option value="4" selected>Data_Analyst</option>
                  <option value="5" selected>BA</option>
                </select>
              </div>

              <div class="mb-3" v-if="this.usersByMajoring != ''">
                <select
                  class="form-select form-select-sm"
                  aria-label="Small select example"
                  v-model="this.user_infor_id"
                  required
                >
                  <option value="" selected>Choose User</option>
                  <option
                    :value="useritem.id"
                    v-for="useritem in this.usersByMajoring"
                  >
                    {{ useritem.fullname + " " + useritem.user.email }}
                  </option>
                </select>
              </div>

              <div class="mb-3 w-4/12">
                <label htmlFor="exampleFormControlInput3" class="form-label">
                  Task dealine
                </label>
                <input
                  v-model="task_dealine"
                  required
                  type="date"
                  class="form-control"
                  id="exampleFormControlInput3"
                />
              </div>
            </div>

            <div class="d-flex justify-content-around mt-5">
              <button class="btn btn-danger submit">Add task</button>
            </div>
            <hr />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Task from "@/components/Task.vue";
import authService from "@/services/auth.service";
export default {
  components: {
    Task,
  },
  props: {
    project: "",
    addTask: "",
  },
  created() {
    // this.getMajoring();
  },
  data() {
    return {
      usersByMajoring: "",
      majoring_id: "",
      majorings: "",
      isHidden: true,
      project_id: "",
      user_infor_id: "",
      task_name: "",
      task_dealine: "",
      task_tag: "",
    };
  },
  methods: {
    async getMajoring() {
      try {
        const resultGet = await authService.getMajoring();
        this.majorings = resultGet.data;
        // console.log(this.majorings);
      } catch (error) {
        console.log(error);
      }
    },

    async getUserByMajoring() {
      try {
        // console.log(this.majoring_id)
        const resultGet = await authService.getUserByMajoring(this.majoring_id);
        this.usersByMajoring = resultGet.data;
        // console.log(this.usersByMajoring);
      } catch (error) {
        console.log(error);
      }
    },

    handleHiddenModal() {
      this.isHidden = !this.isHidden;
    },

    handleSubmitTask() {
      const data = {
        user_infor_id: this.user_infor_id,
        project_id: this.project.id,
        task_name: this.task_name,
        task_dealine: this.task_dealine,
        task_tag: this.task_tag,
      };
      this.addTask(data);
    },
  },
};
</script>
<style scoped>
.table-headers,
.table-rows {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1.5fr;
}

.modal123 {
  z-index: 99999999999;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .button-close {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 13px;
    text-align: center;
    /* // vertical-align: middle; */
    display: inline-block;
  }

  .content {
    position: relative;
    /* // left: 13%;
    // transform: translate(-75%,0); */
    width: 40%;
    height: 70%;
    background: white;
    overflow: scroll;
  }
}

.hiddenModel {
  display: none;
}

.sidebar {
  color: white;
  background-color: #173451;
  position: sticky;
  top: 0;
  left: 0;
  height: 100%;
  min-height: 100vh;
  padding: 30px;
}

.bg {
  background-color: #173451;
}

.navbar {
  /* // margin:0 15px; */
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.16);
}

.content-header {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.table-headers {
  text-transform: uppercase;
  font-weight: 600;
  border-bottom: 1px solid #d2d2d2;
  padding: 20px 0;
}

.table-rows {
  border-bottom: 1px solid #d2d2d2;
  padding: 20px 0;
}

.login-page {
  min-height: 100vh;
  background-color: lightblue;

  .login-modal {
    width: 40%;
    padding: 20px;
  }
}

img {
  max-width: 100%;
}

.img-items {
  border: 1px solid #d2d2d2;
  border-radius: 5px;
}

.loadingSpiner {
  min-height: 50vh;
}

.logoCart {
  width: 40px;
  color: red;
}

.aticleBtnUpDate {
  text-align: center;
}
</style>
