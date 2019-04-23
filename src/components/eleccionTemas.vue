<template>
    <div>
      <h2>Temas</h2>
      <div class="botones">
        <div class="boton" v-for="tema in temas">
          <button class="btn btn-info" v-on:click="elegir(tema.theme)">{{tema.theme}}</button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "eleccionTemas",
        data: function(){
          return{
            temas: null
          }
        },
        methods:{
          elegir: function(tema){
            this.$store.commit('cambiarTema', tema);
            this.$router.push('/juego')
          }
        },
        created: function(){
          this.$http.get('temas').then(response => {
            this.temas = response.body;
          }, response => {
            console.log("error")
          });
        }
    }
</script>

<style scoped>
  .botones{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .boton{
    margin: 10px;
  }
</style>
