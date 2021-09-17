
Vue.component('usuarios',{
    props:{
        usuarios:{
            type: Object,
            required: true
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
            <secciones :usuario="usuario" :id="genId(usuario)" />
        </tbody>
    </table>`,
    methods:{  
        genId(usuario){
            if(Number.isInteger(usuario.nombre)){
                var id = "default" + usuario.id
            }else{
                var id = usuario.nombre + usuario.id 
            } 
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
        <th>{{this.usuario.id}}</th>
        <td>{{this.usuario.nombre}}</td>
        <td>{{this.usuario.nacimiento}}</td>
        <td>{{this.usuario.telefono}}</td>
        <td>{{this.usuario.correo}}</td>
        <td>{{this.usuario.estadocivil}}</td>
        <td>{{this.usuario.hijos}}</td>
        <td>
            <button class="btn btn-primary" data-bs-toggle="collapse" :href="'#'+id" role="button" aria-expanded="false" aria-controls="collapseExample">
                <i class="bi bi-plus-square"></i>
            </button>
        </td>
    </tr>`
})

Vue.component('secciones',{
    props:{
        id: String,
        usuario: Object
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
                    <tbody v-for="seccion,index in getSecciones" :key="index">
                        <seccion :nombre="nombre(index)" :idDatos="genId(secciones[index])" :total="total(seccion[0])"/> 
                        <datos :id="genId(secciones[index])"  :seccion="seccion"/>
                    </tbody>
                </table>
            </div>
        </td>
    </tr>`,
    computed:{
        getSecciones: function(){
            return [this.usuario.hogar, this.usuario.estilodevida, this.usuario.finanzas, this.usuario.ingresos]
        }
    },
    methods:{
        nombre(index){     
            return this.secciones[index];
        },
        genId(nombre){
            return nombre + this.id
        },
        total(seccion){
            var total = 0;
            seccion = Object.values(seccion);
            seccion.splice(0, 2);
            seccion.forEach(dato => {
                total += parseInt(dato) ? parseInt(dato) : 0;
                
            });
            return total;
        }
    }

})

Vue.component('seccion',{
    props:{
        datos: Object,
        nombre: String,
        idDatos: String,
        total: String
    },
    template:
    `<tr>
        <th>{{nombre}}</th>
        <td>{{'$' + total}}</td>
        <td>
            <a class="btn btn-secondary" data-bs-toggle="collapse" :href="'#'+idDatos" role="button" aria-expanded="false" aria-controls="collapseExample">
                Mostrar
            </a>
        </td>
    </tr>`
})

Vue.component('datos',{
    props:{
        id: String,
        seccion: Object
    },
    template:
    `<tr>
        <td colspan="5">
            <div class="collapse" :id="id">
                <table class="table table-light">
                    <thead>
                    <tr>
                        <th scope="col" v-for="index in getIndex">
                            {{index}}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td v-for="value in getValues">
                            {{'$'+value}}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </td>
    </tr>`,
    computed:{
        getIndex: function(){
            if(this.seccion[0]){
                keys = Object.keys(this.seccion[0]);
                return keys.splice(2)
            }else{
                return null;
            }
        },
        getValues: function(){
            if(this.seccion[0]){
                keys = Object.values(this.seccion[0]);
                return keys.splice(2)
            }else{
                return null;
            }
            
        }
    }
})

Vue.component('Pagination',{
    props:{
        'actualizar': Function,
        rows: Number
    },  
    template:
    `<nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li v-for="(page,index) in calcPages" class="page-item">
                <a class="page-link" href="#" @click="actualizar(index)">1</a>
            </li>
            
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>`,
    computed:{
        calcPages: function(){
            const pages = this.rows/10;
            return Math.round(pages);
        }
    },  
    methods:{
        actualizar(position){
            this.actualizar(position)
        }
    }
})


var app = new Vue({
    el: '#app',
    data:{
        usuarios: [],
        rows: 0,
        currentRows: 0
    },
    methods:{
        async setUsuarios(rows) {
            const datos = { "table": 'usuarios', "rows" : rows};
            // GET request using fetch with async/await
            const response = await fetch('http://perfilador.telescopiomx.com/API_Perfilador/api/read.php',{
            // const response = await fetch("http://localhost/API_Perfilador/api/read.php",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            const data = await response.json();
            this.rows = data.rows
            delete data["rows"];
            this.usuarios = data;
        },
        actualizar(position){
            this.currentRows = (5*position);
            this.setUsuarios(this.currentRows);
        }
    },
    beforeMount(){
        this.setUsuarios(0)
    }
})
