<template>
<div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary"  >
    <AsideApp />
    <div class="flex-lg-1 h-screen overflow-y-lg-auto"  >
        <TopApp />
     
        <main class="py-6 bg-surface-secondary" >
            <div class="container-fluid max-w-screen-md vstack gap-6">
               
                <div class="card pt-10 pb-10">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-2"></div>
                        
                            <div class="col-xl-7 my-2">
                                <div class="mb-5"><h4>Datos generales</h4></div>
                                <div class="row mb-5">
                                    <div class="col-md-12">
                                        <div class="alert alert-danger mb-5" role="alert" v-if="msm_error">
                                            {{msm_error}}
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-5">
                                    <label class="col-xl-3 col-lg-3 form-label">Nombres (*)</label>
                                    <div class="col-lg-9 col-xl-9">
                                        <input class="form-control form-control-solid" placeholder="Nombres" v-model="user.nombres" type="text" value="">
                                    </div>
                                </div>
                                <div class="row mb-5">
                                    <label class="col-xl-3 col-lg-3 form-label">Apellidos (*)</label>
                                    <div class="col-lg-9 col-xl-9">
                                        <input class="form-control form-control-solid" placeholder="Apellidos" v-model="user.apellidos" type="text" value="">
                                    </div>
                                </div>
                                <div class="row mb-5">
                                    <label class="col-xl-3 col-lg-3 form-label">Correo electrónico (*)</label>
                                    <div class="col-lg-9 col-xl-9">
                                        <input class="form-control form-control-solid" placeholder="Correo electrónico" v-model="user.email" type="text" value="">
                                    </div>
                                </div>
                                <div class="row mb-5">
                                    <label class="col-xl-3 col-lg-3 form-label">Genero (*)</label>
                                    <div class="col-lg-9 col-xl-9">
                                        <select class="form-select" v-model="user.genero">
                                                <option value="" selected disabled>Seleccionar</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-5">
                                    <label class="col-xl-3 col-lg-3 form-label">Telefono (*)</label>
                                    <div class="col-lg-9 col-xl-9">
                                        <input class="form-control form-control-solid" placeholder="Telefono" v-model="user.telefono" type="text" value="">
                                    </div>
                                </div>
                                <div class="row mb-5">
                                    <label class="col-xl-3 col-lg-3 form-label">Cargo (*)</label>
                                    <div class="col-lg-9 col-xl-9">
                                        <select class="form-select" v-model="user.rol">
                                                <option value="" selected disabled>Seleccionar</option>
                                                <option value="Administrador">Administrador</option>
                                                <option value="Redactor">Redactor</option>
                                                <option value="Vendedor">Vendedor</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 text-end">
                                        <button type="button" class="btn btn-primary" v-on:click="validar()">Actualizar</button>
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                
                    </div>
                </div>

            </div>
        </main>


    </div>
</div>
  
</template>

<script>
// @ is an alias to /src
import AsideApp from "@/components/AsideApp.vue";
import TopApp from '@/components/TopApp.vue';
import axios from "axios";


export default {
  name: 'EditUserApp',
  components: {
    AsideApp,
    TopApp
  }, 
  data() {
      return {
          user : {
              genero: '',
              rol: ''
          },
          msm_error : '',
          token: localStorage.getItem('token'),
          id: this.$route.params.id,
        
      }
  },

  created() {
      this.init_data();
  },
   
  methods: {
      validar(){
          if(!this.user.nombres){
            this.$notify({
                group: 'foo',
                title: 'Validación',
                text: 'Ingrese los nombres del usuario!',
                type: 'error'
            });
          }else if(!this.user.apellidos){
            this.$notify({
                group: 'foo',
                title: 'Validación',
                text: 'Ingrese los apellidos del usuario!',
                type: 'error'
            });
          }else if(!this.user.email){
              this.$notify({
                group: 'foo',
                title: 'Validación',
                text: 'Ingrese el email del usuario!',
                type: 'error'
              });
          }else if(!this.user.genero){
              this.$notify({
                group: 'foo',
                title: 'Validación',
                text: 'Seleccione el genero del usuario!',
                type: 'error'
              });
          }else if(!this.user.rol){
              this.$notify({
                group: 'foo',
                title: 'Validación',
                text: 'Seleccione el cargo del usuario!',
                type: 'error'
              });
          }else{
              this.create();
          }
      },

      init_data(){
          axios.get(this.$url+'/obtener_user_admin/'+this.id,{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': this.token
              }
          }).then((result)=>{
              this.user = result.data;
              console.log(this.user);
          });
      },

      create(){
     
          axios.put(this.$url+'/actualizar_admin_admin/'+this.id,this.user,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.token
                }
            }).then((result)=>{
                if(result.data.data == undefined){
                    this.msm_error = result.data.message;
                }else{
                    this.$notify({
                        group: 'foo',
                        title: 'Correcto',
                        text: 'Se actualizó el usuario!',
                        type: 'success'
                    });

                }
            });
      }
  },
}
</script>
