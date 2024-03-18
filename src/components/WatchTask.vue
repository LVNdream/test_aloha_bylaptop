<template>
  <div>
    <div class="m-auto text-center">
      Le Viet Nhut (backend@gmail.com) have tasks
    </div>
    <div class="table border-2 relative">
      <div
        class="bg-red-600 text-white w-6 h-6 text-center flex items-center justify-center absolute right-1 top-1"
        @click="
          () => {
            this.toggleWatchTask();
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
        <tbody v-for="task in this.listtask">
          <tr>
            <th scope="row">{{ task.id }}</th>
            <td class="">Xay dung website thuong mai</td>
            <td>Build back end for Project</td>
            <td>Back end</td>

            <td>2024-03-20 00:00:00</td>
            <td>Done</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    toggleWatchTask: "",
    listtask: "",
  },
  created() {
    console.log(this.listtask);
  },
  methods: {},
};
</script>
<style scoped>
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
