<template>
  <div class="timer">
    <progress-bar :options="options" :value="value"/>
  </div>    
</template>
<script>
export default {
  name: 'Timer',
  props: ['stopTime'],
  data() {
      return {
          
          options: {
            text: {
              color: '#FFFFFF',
              shadowEnable: false,
              shadowColor: '#000000',
              fontSize: 14,
              fontFamily: 'Helvetica',
              dynamicPosition: false,
              hideText: true
            },
            progress: {
              color: '#2dbd2d',
              backgroundColor: '#333333'
            },
            layout: {
              height: 35,
              width: 1000,
              verticalTextAlign: 61,
              horizontalTextAlign: 43,
              zeroOffset: 0,
              strokeWidth: 30,
              progressPadding: 0,
              type: 'line'
            }
          },
          value: 0,
          time: 0,
          startTimer: setInterval(this.upTime, 250),
          restart: false
      }
    },

    mounted() {
        
    },

    

    methods: {
        upTime() {
          if(this.stopTime) {
            this.$emit('timeForResponse', this.time)
            this.restart = true
          }else{
            if(this.restart){
                this.startTime()
              }
              if(this.time < 20) {
                 this.time += 0.25
                 this.value += 1.25 
                }
            }
        },
        startTime() {
          clearInterval(this.startTimer)
          this.time = 0
          this.value = 0
          this.restart = false
          this.startTimer = setInterval(this.upTime, 250)
        }
    },
}
</script>
<style>
    .timer {
        margin-left: 5%;
        padding: 0.5%;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

