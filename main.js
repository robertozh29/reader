
Vue.component('usuarios',{
    data(){
        return{
            usuarios:[
                {
                    id:1,
                    nombre: "Roberto"
                },
                {
                    id:2,
                    nombre: "Alex"
                },
                {
                    id:3,
                    nombre: "Felipe"
                },
                {
                    id:4,
                    nombre: "Andrea"
                },
                {
                    id:5,
                    nombre: "Ana"
                }
            ]
        }
    },
    template:
    `<table class="table table-dark table-striped align-middle">
        <thead>
            <tr>
                <th scope="col">#ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad</th>
                <th scope="col">Celular</th>
                <th scope="col">Correo</th>
                <th scope="col" >Estado Civil</th>
                <th scope="col">Hijos</th>
                <th>Mas</th>
            </tr>
        </thead>
        <tbody v-for="usuario in usuarios" :key="usuario.id">
            <usuario :usuario="usuario" :id="genId(usuario)" />
            <secciones :id="genId(usuario)" />
        </tbody>
    </table>`,
    methods:{  
        genId(usuario){
            var id = usuario.nombre + usuario.id 
            return id;
        }
    }
    
})

Vue.component('usuario',{
    props:{
        usuario: Object,
        id: String
    },
    template: 
    `<tr>
        <th>{{this.usuario.nombre}}</th>
        <td>{{this.usuario.nombre}}</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>
            <button class="btn btn-primary" data-bs-toggle="collapse" :href="'#'+id" role="button" aria-expanded="false" aria-controls="collapseExample">
                <i class="bi bi-plus-square"></i>
            </button>
        </td>
    </tr>`
})

Vue.component('secciones',{
    props:{
        id: String
    },
    data(){
        return{
            secciones: ["Hogar", "EstiloDeVida", "Finanzas", "Ingresos"]
        }
    },
    template:
    `<tr>
        <td colspan="8">
            <div class="collapse" :id="id">
                <table class="table table-secondary">
                    <thead>
                        <tr>
                            <th scope="col">Seccion</th>
                            <th scope="col">Total</th>
                            <th scope="col">Datos</th>
                        </tr>
                    </thead>
                    <tbody v-for="seccion,index in secciones" :key="index">
                        <seccion :nombre="nombre(index)" :idDatos="genId(nombre(index))"/> 
                        <datos :id="genId(nombre(index))" />
                    </tbody>
                </table>
            </div>
        </td>
    </tr>`,
    methods:{
        nombre(index){
            return this.secciones[index];
        },
        genId(nombre){
            return nombre + this.id
        }
    }

})

Vue.component('seccion',{
    props:{
        datos: Object,
        nombre: String,
        idDatos: String
    },
    template:
    `<tr>
        <th>{{nombre}}</th>
        <td>$00.00</td>
        <td>
            <a class="btn btn-secondary" data-bs-toggle="collapse" :href="'#'+idDatos" role="button" aria-expanded="false" aria-controls="collapseExample">
                Mostrar
            </a>
        </td>
    </tr>`
})

Vue.component('datos',{
    props:{
        id: String
    },
    template:
    `<tr>
        <td colspan="5">
            <div class="collapse" :id="id">
                <table class="table table-light">
                    <thead>
                    <tr>
                        <th scope="col">Entretenimiento</th>
                        <th scope="col">Gimnasio</th>
                        <th scope="col">Viajes</th>
                        <th scope="col">Ropa</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>$00.00</td>
                        <td>$00.00</td>
                        <td>$00.00</td>
                        <td>$00.00</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </td>
    </tr>`
})

Vue.component('pagination',{
    template:
    `<nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>`
})


var app = new Vue({
    el: '#app',
    data:{

    }
})
