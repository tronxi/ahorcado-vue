<template>
    <div class="juego">
      <h1>{{this.getTema}}</h1>
      <h2>{{this.datosPartida.guessWord}}</h2>
      <h3>Intentos: {{this.datosPartida.tries}}</h3>
      <div>
        <input  class="entrada" v-model="palabra" placeholder="Escribe la palabra" :disabled="this.isDisabledButton" v-on:keypress.enter="comprobarPalabra">
        <button class="btn btn-info" v-on:click="comprobarPalabra" :disabled="this.isDisabledButton">Enviar</button>
      </div>
      <div v-if="this.datosPartida.lost">
        <h2>Has Ganado</h2>
        <button class="btn btn-success" v-on:click="volverJugar">Volver a Jugar</button>
      </div>
      <div v-if="this.datosPartida.tries <=0">
        <h2>Has Perdido</h2>
        <button class="btn btn-danger" v-on:click="volverJugar">Volver a Jugar</button>
      </div>
    </div>
</template>

<script>
  export default {
        name: "juego",
        data: function(){
          return{
            tema: null,
            datosPartida: {},
            palabra: null
          }
        },
        computed: {
          getTema(){
            return this.$store.state.tema;
          },
          isDisabledButton(){
            return this.datosPartida.tries <= 0 || this.datosPartida.lost;
          }
        },
        methods:{
          comprobarPalabra: function(){
            if(this.palabra != null) {
              this.$http.put('partida/' + this.datosPartida.gameId + '?letter=' + this.palabra).then(
                response => {
                  this.datosPartida = response.body;
                },
                error => {
                  console.log(error);
                }
              );
              this.palabra = null;
            }
          },
          volverJugar: function(){
            this.$router.push('/temas');
          }
        },
        created: function () {
          console.log(this.getTema);
          this.$http.post('partida?themeName=' + this.getTema).then(
            response =>{
              console.log(response.body);
              this.datosPartida = response.body;
            },
            error => {
              console.log(error);
            }
          );
        }
  }
</script>

<style scoped>
  .juego{
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }
  .entrada{
    border-radius: 5px;
    height: 35px;
  }
</style>
