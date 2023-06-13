<template>
<div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
    <AsideApp />
    <div class="flex-lg-1 h-screen overflow-y-lg-auto">
      <TopApp />
      <main class="py-6 bg-surface-secondary" >
            <div class="container-fluid max-w-screen-md vstack gap-6">

                <div class="d-flex flex-column flex-md-row gap-3 justify-content-between">
                    <div class="d-flex gap-3">
                        <div class="input-group input-group-sm input-group-inline">
                          <span class="input-group-text pe-2">
                            <i class="bi bi-search"></i> 
                            </span>
                            <input type="text" class="form-control" v-model="str_filter" placeholder="Buscar" aria-label="Search">
                        </div>
                        <div>
                          <button type="button" class="btn btn-sm px-3 btn-neutral d-flex align-items-center" v-on:click="filtrar()">
                            <i class="bi bi-funnel me-2"></i> 
                            <span>Filtrar</span> 
                            <span class="vr opacity-20 mx-3"></span> 
                            <span class="text-xs text-primary">{{usuarios.length}}</span>
                          </button>
                        </div>
                    </div>
                 
                </div>
                
                <div class="card">
                    <div class="card-header border-bottom d-flex align-items-center">
                        <h5 class="me-auto">Colaboradores</h5>
                        <router-link to="/usuarios/create" class="btn btn-sm btn-dark">
                            Nuevo usuario
                        </router-link>
             
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover table-nowrap">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Colaborador</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Cargo</th>
                                    <th scope="col">Estado</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody v-if="!load_data">
                                <tr v-for="item in usuarios">
                                    <td>
                                      <img alt="..." v-bind:src="image_user" class="avatar avatar-sm rounded-circle me-2" /> 
                                      <a class="text-heading font-semibold" href="#">{{item.nombres}} {{item.apellidos}}</a>
                                    </td>
                                    <td>{{item.email}}</td>
                                    <td>
                                       {{item.rol}}
                                    </td>
                                    <td>
                                      <span class="badge bg-success" v-if="item.estado">Activo</span>
                                      <span class="badge bg-danger" v-if="!item.estado">Desactivado</span>
                                    </td>
                                
                                    <td class="text-end">
                     
                                        <router-link :to="{name:'usuario-edit',params:{id: item._id}}" class="btn btn-sm btn-neutral" style="margin-right: 0.5rem;">
                                            Editar  
                                        </router-link>
                                        <button v-b-modal="'delete-'+item._id" type="button" class="btn btn-sm btn-square btn-neutral text-danger-hover" v-b-tooltip.hover.left title="Cambiar estado" >
                                          <i class="bi bi-arrow-repeat"></i>
                                        </button>

                                   
                                        <b-modal :id="'delete-'+item._id" centered title="Cambio de estado" @ok="eliminar(item._id,item.estado)" >
                                          <p class="my-4">Desea cambiar el estado del usuario?</p>
                                        </b-modal>

                                       
                                    </td>
                                </tr>
                               
                            </tbody>
                            <tbody v-if="load_data">
                              <tr>
                                <td colspan="5" class="text-center">
                                  <div class="spinner-border" role="status">
                                    <span class="sr-only"></span>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="card-footer border-0 py-5"><span class="text-muted text-sm">Showing 10 items out of 250 results found</span></div>

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
import axios from 'axios';


export default {
  name: 'IndexUserApp',
 
  data() {
    return {
      image_user: '/assets/media/user.png',
      usuarios:[],
      usuarios_const:[],
      load_data: false,
      str_filter: '',
    }
  },

  methods: {
    filtrar(){
      var term = new RegExp(this.str_filter,'i');
        this.usuarios = this.usuarios_const.filter(item=>term.test(item.nombres));
    },

    init_data(){
      this.load_data = true;
      axios.get(this.$url+'/listar_users_admin',{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$token
        }}).then((result)=>{
          this.usuarios = result.data.data;
          this.usuarios_const = this.usuarios;
          this.load_data = false;
      });
    },

    eliminar(id,estado){
      axios.put(this.$url+'/cambiar_estado_user_admin/'+id,{estado:estado},{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$token
        }
      }).then((result)=>{
        this.init_data();
      })
    }
  },

  created() {
    this.init_data();
  },
 components: {
    AsideApp,
    TopApp
  }
  
}
</script>
