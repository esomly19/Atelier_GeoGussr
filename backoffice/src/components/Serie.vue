<template>
  <div class="app">
    <h1>Serie</h1>

    <div class="conatiner flex">
      <div class="wrap">
      <div v-for=" so in Series" v-bind:key="so.id">
        <SerieItem :soro="so" />
  </div>


        <div class="box two">
          <div class="poster p2">
            <h4 v-on:click="modifier">📝</h4>
          </div>
        </div>
      </div>
  <nav>
  <Button  v-on:click="previousPage()">previous</Button>
  <Button v-on:click="nextPage()">next</Button>
</nav>
    </div>

    <modal :width="500" :height="500" name="add">
      <button id="x" v-on:click="hide">X</button><AddPhoto></AddPhoto>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import SerieItem from "./SerieItem";
import AddPhoto from "./AddPhoto";
export default {
  components: { AddPhoto , SerieItem },
data() {
    return {
     Series: "",      
    page:1,
      size:10,
      numberofpages:0,
      count:0};},
  methods: {
    show() {
      this.$modal.show("add");
    },
    hide() {
      this.$modal.hide("add");
    },
    modifier() {
      this.$router.push({ path: '/configurerSerie'})
    },
     nextPage(){
if((this.page+1) >this.numberofpages){
this.page=this.numberofpages;}else{
  this.page++;}
  this.searchSeries();
},
  previousPage(){
  if((this.page-1) <1){
  this.page=1;}else{this.page--;}
   this.searchSeries();
}, searchSeries(){
  axios.get("http://docketu.iutnc.univ-lorraine.fr:19502/serie?page="+this.page+"&size=9").then(res => {
                this.Series = res.data.series
                 this.count=res.data.count;
              this.numberofpages =res.data.nbpage;
                console.log(res.data.series)
            }).catch(err => {
              alert('une err survenu : '+err)
            })
}
  },
  created() {
      
    },
mounted(){
this.searchSeries();
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font-family: "Roboto", sans-serif;
  background: #fff;
}

.conatiner {
  width: 100%;
  height: 500px;
}
.wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}

.box {
  margin: 10px;
  width: 300px;
  height: 490px;
  text-align: center;
  border-radius: 3px;
  -webkit-transition: 200ms ease-in-out;
  -o-transition: 200ms ease-in-out;
  transition: 200ms ease-in-out;
  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  background: rgba(126, 214, 192, 0.6);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
.box:hover {
  margin-bottom: -10px;
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
}
.box h1 {
  color: black;
  padding: 30px;
  margin-top: 100px;
  text-align: center;
  font-weight: 100;
  font-size: 25px;
  background: rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
}

.poster {
  width: 130px;
  height: 130px;
  margin: 120px auto;
  position: relative;
  border-radius: 100px;
}
.poster h4 {
  top: 16px;
  color: black;
  position: relative;
  font-size: 150px;
  text-align: center;
  font-weight: 900;
}
</style>
