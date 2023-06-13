<template>
  <div>
    <div class="px-5 py-5 p-lg-0 h-screen bg-surface-secondary d-flex flex-column justify-content-center">
        <div class="d-flex justify-content-center">
            <div class="col-12 col-md-9 col-lg-6 min-h-lg-screen d-flex flex-column justify-content-center py-lg-16 px-lg-20 position-relative">
                <div class="row">
                    <div class="col-lg-10 col-md-9 col-xl-7 mx-auto">
                        <div class="text-center mb-12">
                            <h3 class="display-5">👋</h3>
                            <h1 class="ls-tight font-bolder mt-6">Panel administrador</h1>
                            <p class="mt-2">Gestiona tu tienda online</p>
                        </div>
                       <form>
                            <div class="alert alert-danger mb-5" role="alert" v-if="msm_auth">
                                {{msm_auth}}
                            </div>
                            <div class="mb-5">
                                <label class="form-label" for="email">Correo electrónico</label> 
                                <input type="email" class="form-control" id="email" v-on:keyup.enter="validate()" placeholder="Correo electrónico" v-model="auth.email"/>
                            </div>
                            <div class="mb-5">
                                <label class="form-label" for="password">Contraseña</label>
                                <input type="password" class="form-control" id="password" v-on:keyup.enter="validate()" placeholder="Contraseña" autocomplete="current-password" v-model="auth.password"/>
                            </div>
                           
                            <div>
                                <a style="cursor:pointer" class="btn btn-primary w-full" v-on:click="validate()">Ingresar</a>
                            </div>
                        </form>


                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
// @ is an alias to /src
import axios from "axios";
import $ from 'jquery';
export default {
  name: 'LoginView',
  data() {
      return {
          auth : {},
          msm_auth: ''
      }
  },

  created(){
      
  },

  mounted() {
      if(localStorage.getItem('user')){
          this.$router.push({ name: "dashboard"});
      }
  },


  methods: {
      validate(){
          if(!this.auth.email){
                this.msm_auth = 'Ingresa el correo electrónico';
          }else if(!this.auth.password){
                this.msm_auth = 'Ingresa la contraseña';
          }else{
              this.msm_auth = '';
              this.login();
          }
      },

      login(){
            axios.post(this.$url+"/login_admin",this.auth, {
                headers: {
                'Content-Type': 'application/json'
                }
            }).then((result) => {
                console.log(result.data);
                if(result.data.data == undefined){
                    this.msm_auth = result.data.message;
                }else{
                     this.msm_auth = '';
                    localStorage.setItem('token',result.data.token);
                    localStorage.setItem('user',JSON.stringify(result.data.data));
                    this.$router.push({ name: "dashboard"})
                   
                }
            })
      }


  },

  created() {
      
        
  },
}
</script>
