<template>
  <div class="modal123">
    <div class="content p-3">
      <button class="btn btn-danger button-close" @click="this.toggle">
        X
      </button>

      <form @submit.prevent="this.addUserInTask">
        <div class="inforOrder">
          <div class="mb-3">
            <div class="mt-6">
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
                <option :value="majoring.id" v-for="majoring in this.majorings">
                  {{ majoring.majoring_name }}
                </option>
              </select>
            </div>

            <div class="mt-3" v-if="this.usersByMajoring != ''">
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
          </div>

          <div class="d-flex justify-content-around mt-5">
            <button class="btn btn-danger submit">Add User</button>
          </div>
          <hr />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import authService from "../services/auth.service";

export default {
  data() {
    return {
      usersByMajoring: "",
      majoring_id: "",
      majorings: "",
      user_infor_id: "",
    };
  },
  props: {
    toggleModalAddUser: "",
    handleAddUser: "",
    task_id: "",
  },
  created() {
    this.getMajoring();
  },
  methods: {
    toggle() {
      this.toggleModalAddUser();
    },

    addUserInTask() {
      const data = {
        user_infor_id: this.user_infor_id,
        task_id: this.task_id,
      };
        
        this.handleAddUser(data);
    },

    async getMajoring() {
      try {
        const resultGet = await authService.getMajoring();
        this.majorings = resultGet.data;
       
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
  
    display: inline-block;
  }

  .content {
    position: relative;
   
    width: 40%;
    height: 70%;
    background: white;
    overflow: scroll;
  }
}

.hiddenModelAdduser {
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
