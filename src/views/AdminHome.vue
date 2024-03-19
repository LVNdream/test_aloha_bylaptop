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
          class="text-center mx-2 mt-2 w-12 h-12 bg-gray-200 p-1 rounded-full hover:cursor-pointer hoverAvata "
          :class="{avataUser:!this.isLogin}"
        >
          <img
            class="h-10 w-10 rounded-full"
            :src="this.avataUser"
          >
          </img>
          <div @click="this.handleLogout" class="optionLogout text-red-500 mt-2 bg-slate-300 w-max px-2 py-1">Log out</div>
        </div>
      </div>
    </div>

    <div class="main bg-gray-50 mt-4 w">
      <div class="mb-4">
        <div
          @click="this.handleHiddenModal"
          class="ml-2 text-xl py-2 rounded-xl text-white bg-blue-700 w-40 hover:cursor-pointer"
        >
          <i class="fa-solid fa-plus ml-2 mr-4"></i>Add project
        </div>
      </div>
      <div class="p-2 flex flex-wrap">
        <Project :project="project" :addTask="this.addTask" v-for="project in this.projects"></Project>
      </div>
    </div>
  </div>

  <div class="modal123" v-bind:class="{ hiddenModel: this.isHidden }">
    <div class="content p-3">
      <button class="btn btn-danger button-close" @click="handleHiddenModal">
        X
      </button>

      <form @submit.prevent="handleSubmitProject">
        <div class="inforOrder">
          <div class="mb-3">
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput2" class="form-label">
                Project name
              </label>
              <input
                v-model="project_name"
                required
                type="text"
                class="form-control"
                id="exampleFormControlInput2"
              />
            </div>
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput3" class="form-label">
                Project description
              </label>
              <input
                v-model="project_des"
                required
                type="text"
                class="form-control"
                id="exampleFormControlInput3"
              />
            </div>
          </div>

          <div class="d-flex justify-content-around mt-5">
            <button class="btn btn-danger submit">Add project</button>
          </div>
          <hr />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Project from "@/components/Project.vue";
import authService from "@/services/auth.service";

export default {
  components: {
    Project,
  },

  data() {
    return {
      isHidden: true,
      projects: "",
      project_name: "",
      project_des: "",
      user_infor_id: "",
      isLogin: false,
      avataUser: '',
      auth:''
    };
  },
  created() {
    this.checkLogin()
    this.getProject();
  },
  methods: {

    checkLogin() {
      this.auth = JSON.parse(localStorage.getItem('auth'));
      if (this.auth == null) {
        
        this.$router.replace({ path: '/login' });
      } else if(this.auth != null && this.auth.user.group==0)  {
        this.isLogin = true
        this.avataUser = this.auth.user.user_infor.avata
      }
      else{
        alert(" You are not Admin");
        this.$router.replace({ path: '/login' });

      }

    },
    

    async getProject() {
      try {
        const resultGet = await authService.getProject();
        this.projects = resultGet.data;
        console.log(this.projects);
      } catch (error) {
        console.log(error);
      }
    },
    
    handleHiddenModal() {
      this.isHidden = !this.isHidden;
    },

    async handleSubmitProject() {
      try {
         this.auth = JSON.parse(localStorage.getItem('auth'));

        if(this.auth==null)return alert("Please log in")  

        const data = {
          project_name: this.project_name,
          project_des: this.project_des,
          user_infor_id: this.auth.user.id,
        };
        if (this.auth.user.group == 0) {

          console.log(data,this.auth.access_token)
        const resultAdd = await authService.addProject(this.auth.access_token,data);

          if (resultAdd.status == 200) {
          alert(resultAdd.data)
        } else {
          alert("Have error");
          console.log(resultAdd)
        }
        this.getProject();
          

        }
        else {
          alert("You are not Admin")
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addTask(data) {
      try {
         this.auth = JSON.parse(localStorage.getItem('auth'));

        if(this.auth==null)return alert("Please log in")  

        if (this.auth.user.group == 0) {

        console.log(data,this.auth.access_token)
        const resultAdd = await authService.addTask(this.auth.access_token,data);

          if (resultAdd.status == 200) {
          alert(resultAdd.data)
        } else {
          alert("Have error");
          console.log(resultAdd)
        }
        this.getProject();
        }
        else {
          alert("You are not Admin")
        }
      } catch (error) {
        console.log(error);
      }
    },

    async handleLogout() {
      try {
        this.auth = JSON.parse(localStorage.getItem('auth'));

        if(this.auth==null)return alert("Please log in")  

        const resultLogOut = await authService.logout(this.auth.access_token);

        if (resultLogOut.status == 200) {
          alert(resultLogOut.data.message)
          localStorage.removeItem("auth");
        this.$router.push({ path: '/login' })

        } else {
          alert('Log out faild')
        }
      
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>


.optionLogout{
  position:absolute;
  display: none;
  bottom:-60%;
}
.hoverAvata{
  position: relative;
}
.hoverAvata:hover .optionLogout{
  display: block;
}

.table-headers,
.table-rows {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1.5fr;
}

.modal123 {
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
