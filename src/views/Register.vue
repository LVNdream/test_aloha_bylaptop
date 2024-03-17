<template>
    <div>
        <section class="w-[1060px] mx-auto border rounded-2xl mt-16">
            <div class="p-5 md:p-10 flex flex-1 justify-center gap-10">
                <div class="w-[416px]  hidden lg:flex flex-1 flex-shrink-0">
                    <img src="https://raw.githubusercontent.com/Quynhhuong150322/DIKO_STUDY_TRAVEL_WEB/main/src/assets/images/Login/loginImg.png"
                        alt="Login" />
                </div>
                <div class="flex-1 flex justify-center">
                    <div class="flex flex-col flex-1 gap-4 max-w-[393px]">
                        <h1 class="text-xl font-bold">Register</h1>

                        <form @submit.prevent="submitRegister" class="flex flex-col flex-1 gap-3">
                            <div class="flex flex-col flex-1 gap-1">
                                <label htmlFor="firstname" class="text-sm font-normal cursor-pointer">
                                    Full Name
                                </label>
                                <div class="flex items-center">
                                    <input type="text" name="firstname" v-model="fullname" id="firstname"
                                        placeholder="EasySet24"
                                        class="w-full h-[48px] p-3 border rounded text-xs font-normal" required />
                                </div>
                            </div>
                            <div class="flex flex-col flex-1 gap-1">
                                <label htmlFor="birthday" class="text-sm font-normal cursor-pointer">
                                    Birthday
                                </label>
                                <div class="flex items-center">
                                    <input type="date" name="birthday" v-model="birthday" id="birthday"
                                        placeholder="EasySet24"
                                        class="w-full h-[48px] p-3 border rounded text-xs font-normal" required />
                                </div>
                            </div>

                            <div class="flex gap-4">
                                <div class="form-check">
                                    <input class="form-check-input" v-model="gender" type="radio"
                                        name="flexRadioDefault" value="male" checked id="flexRadioDefault1" required>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Male
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" v-model="gender" type="radio"
                                        name="flexRadioDefault" value="female" id="flexRadioDefault2" required>
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Female
                                    </label>
                                </div>
                            </div>

                            <label htmlFor="majoring" class="text-sm font-normal cursor-pointer">
                                Majoring
                            </label>
                            <select v-model="majoring_id" class="form-select" id="majoring" required>
                                <option value="" selected>Choose majoring</option>
                                <option v-for="majoring in this.majorings" :key="majoring.id" :value="majoring.id">
                                    {{ majoring.majoring_name }}</option>
                            </select>


                            <div class="flex flex-col flex-1 gap-1">
                                <label htmlFor="phone" class="text-sm font-normal cursor-pointer">
                                    Phone number
                                </label>
                                <div class="flex items-center">
                                    <input type="text" name="phone" v-model="phone" id="phone" placeholder="093xxxxxxx"
                                        class="w-full h-[48px] p-3 border rounded text-xs font-normal" required />
                                </div>
                            </div>

                            <div class="flex flex-col flex-1 gap-1">
                                <label htmlFor="avata" class="text-sm font-normal cursor-pointer">
                                    Avata
                                </label>
                                <div class="flex items-center">
                                    <input type="text" name="avata" v-model="avata" id="avata" placeholder="http::/..."
                                        class="w-full h-[48px] p-3 border rounded text-xs font-normal" required />
                                </div>
                            </div>

                            <div class="flex flex-col flex-1 gap-1">
                                <label htmlFor="email" class="text-sm font-normal cursor-pointer">
                                    Email
                                </label>
                                <div class="flex items-center">
                                    <input type="email" v-model="email" name="email" id="email"
                                        placeholder="EasySet24@gmail.com"
                                        class="w-full h-[48px] p-3 border rounded text-xs font-normal" required />
                                </div>
                            </div>
                            <div class="flex flex-col flex-1 gap-1">
                                <label htmlFor="password" class="text-sm font-normal cursor-pointer">
                                    Password
                                </label>
                                <div class="flex items-center">
                                    <input type="password" name="password" v-model="password" id="password"
                                        placeholder="***************" value="{registerInput.password}"
                                        class="w-full h-[48px] p-3 border rounded text-xs font-normal" required />
                                </div>
                            </div>

                            <div class="flex justify-between md:flex-row flex-col gap-2 md:gap-0">
                                <div class="flex gap-3 items-center">
                                    <input type="checkbox" name="remember" id="remember"
                                        class="w-6 h-6 cursor-pointer" />
                                    <label htmlFor="remember" class="text-xs font-normal text-[#112211] cursor-pointer">
                                        I agree to all the Terms and Privacy Policies
                                    </label>
                                </div>
                            </div>
                            <div
                                class="flex-1 max-h-[48px] bg-[#07689F] text-center rounded border px-2 py-3 hover:bg-gray-500 cursor-pointer">
                                <button
                                    class=" w-full text-base font-medium text-white cursor-pointer">Register</button>
                            </div>
                            <div class="flex justify-center items-center gap-2 flex-col md:flex-row">
                                <p class="text-xs font-normal">Already have an account?</p>
                                <span
                                    class="text-xs font-normal text-blue-400 cursor-pointer hover:underline hover:text-blue-500">
                                    <p><router-link to="/login">Login</router-link></p>
                                </span>
                            </div>
                            <div class="text-center text-sm font-normal">Or</div>
                            <div class="flex justify-center gap-10">
                                <div
                                    class="p-3 border rounded bg-[#FFFFFF] cursor-pointer hover:scale-110 hover:bg-blue-300 w-16">
                                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-facebook-2038470-1718513.png"
                                        alt="Facebook" class="" />
                                </div>
                                <div class="p-3 border rounded bg-[#FFFFFF] cursor-pointer hover:bg-blue-300 w-16">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                                        alt="Apple" />
                                </div>
                                <div class="p-3 border rounded bg-[#FFFFFF] cursor-pointer hover:bg-blue-300 w-16">
                                    <img src="https://cdn-icons-png.flaticon.com/256/2991/2991148.png" alt="Google" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import AuthService from "../services/auth.service";
export default {
    data() {
        return {
            majorings: [],
            email: '',
            password: '',
            majoring_id: '',
            fullname: '',
            birthday: '',
            gender: 'male',
            phone: '',
            avata: '',

        };
    },

    created() {
        this.getMajoring();
    },

    methods: {
        async getMajoring() {
            try {
                const resultGet = await AuthService.getMajoring();
                this.majorings = resultGet.data;
                console.log(this.majorings);
            } catch (error) {
                console.log(error);
            }
        },


        async submitRegister() {
            try {
                const data = {
                    email: this.email,
                    password: this.password,
                    majoring_id: this.majoring_id,
                    fullname: this.fullname,
                    birthday: this.birthday,
                    gender: this.gender,
                    phone: this.phone,
                    avata: this.avata,
                }
                console.log(data);
                const resultRegister = await AuthService.register(data);
                resultRegister.status == 200 ? alert(resultRegister.data) : alert("Have Error");
                this.email= ''
                this.password= ''
                this.majoring_id= ''
                this.fullname= ''
                this.birthday= ''
                this.gender= 'male'
                this.phone= ''
                this.avata= ''

            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
<style></style>