<template>
  <div class="px-2 bg-white w-4/12 rounded-xl border-r-8 mb-4">
    <div class="flex justify-between mb-2">
      <div class="text-xl bg-gray-100 p-2">
        <i class="fa-solid fa-computer"></i>
      </div>

      <div class="text-xl font-thin p-2">My Tasks</div>

      <div class="flex">
        <div class="text-xl bg-gray-100 p-2 hover:cursor-pointer">
          <i class="fa-solid fa-plus"></i>
        </div>

        <div class="text-xl bg-gray-100 p-2 hover:cursor-pointer">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>
    </div>
    <div>
      <div class="ml-1 text-lg text-green-700 font-bold">
        <i class="fa-solid fa-circle mr-2"></i>{{ this.status.status_name }}
      </div>

      <div class="mt-4">
        <div class="mt-4">
          <Task :task="task" v-for="task in this.status.task"></Task>
        </div>
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
    status: "",
  },
  created() {
    // this.getMajoring();
    this.status.task
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
  },
};
</script>
<style scoped></style>
